import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy init for Google GenAI
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Specialist AI analysis endpoint (ensuring zero PII is required)
app.post("/api/specialist/analyze", async (req, res) => {
  try {
    const {
      educationStage,
      studentAge,
      observedSigns = [],
      drawingNotes,
      playBehaviorNotes,
      somatizations = [],
      verbalizations = [],
      selfHarmSigns = [],
      immediateRiskTriggers = [],
      protectiveFactors = [],
      additionalNotes
    } = req.body;

    const ai = getAI();

    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY não configurada no ambiente. O sistema utilizará o motor offline especializado de protocolos."
      });
    }

    const systemInstruction = `Você é um renomado especialista em Psicologia Clínica Infantojuvenil e Pedagogia Escolar, com mais de 20 anos de experiência em saúde mental na Educação Básica, especialista em depressão infantil, automutilação/autolesão, ideação e comportamento suicida na escola, com foco principal nos ANOS INICIAIS DO ENSINO FUNDAMENTAL (1º ao 5º ano, 6 a 10 anos) e domínio completo de Educação Infantil, Anos Finais (6º ao 9º ano) e Ensino Médio.
Sua postura é profundamente empática, técnica, baseada em evidências científicas (OMS, Ministério da Saúde, Associação Brasileira de Psiquiatria, Conselho Federal de Psicologia e BNCC socioemocional).
Você compreende que:
- Crianças nos Anos Iniciais raramente expressam "desejo de morrer" com palavras adultas; manifestam sofrimento através de equivalentes depressivos (alteração do brincar, desenhos mórbidos/desamparados, somatizações frequentes como dores abdominais e cefaleia, falas como "queria virar estrelinha" ou "dormir para sempre", irritabilidade atípica, desapego de brinquedos prediletos, autolesão infantil como arranhões e mordidas).
- Nas outras etapas (Anos Finais e Ensino Médio), o sofrimento costuma envolver autolesão cortante, isolamento digital, cyberbullying, desesperança existencial e declínio cognitivo súbito.
- A escola NÃO diagnostica e NÃO trata terapeuticamente, mas tem o dever legal e humanitário de IDENTIFICAR, ACOLHER, PROTEGER e ENCAMINHAR à Rede de Atenção Psicossocial (CAPSi/UBS) e articular com a família.

Analise os dados comportamentais (anonimizados) fornecidos e retorne uma resposta estritamente em formato JSON com o seguinte schema:
{
  "riskLevel": "baixo" | "moderado" | "alto" | "critico_imediato",
  "technicalSynthesis": "Síntese psicológica e pedagógica minuciosa do caso sob a perspectiva do desenvolvimento infantojuvenil",
  "pedagogicalStrategies": [
    "Ação pedagógica concreta e sensível para o professor em sala de aula (rotinas, adaptações, manejo de frustração)",
    ...
  ],
  "psychologicalWelcomingPlan": [
    "Estratégia de acolhimento seguro pela orientação educacional/psicologia escolar (escuta qualificada, contrato de proteção)",
    ...
  ],
  "safetySchoolProtocol": [
    "Medida prática de segurança e monitoramento discreto e sem estigmatização no ambiente escolar",
    ...
  ],
  "familyApproachGuide": {
    "recommendedTone": "Como abordar os responsáveis com empatia, sem culpar e sem minimizar",
    "talkingPoints": ["Ponto a ser abordado 1", "Ponto 2"],
    "homeSafetyRecommendations": ["Remoção de objetos cortantes e remédios ao alcance", "Supervisão afetuosa"]
  },
  "intersectoralReferral": {
    "priorityService": "CAPSi / UBS / UPA / SAMU 192",
    "urgencyTiming": "Imediato / Em até 24h / Em até 5 dias úteis",
    "technicalReportGuidelines": "O que destacar no relatório confidencial de encaminhamento"
  },
  "doList": ["O que os educadores DEVEM fazer"],
  "dontList": ["O que os educadores NUNCA devem fazer (ex: não jurar sigilo em risco de morte, não expor aos colegas)"]
}`;

    const prompt = `Por favor, analise a seguinte situação escolar com rigor técnico e sensibilidade:
- Etapa de Ensino: ${educationStage || "Anos Iniciais do Ensino Fundamental"}
- Idade Aproximada: ${studentAge || "7 a 9 anos"}
- Sinais Comportamentais e Emocionais Observados: ${observedSigns.join(", ") || "Mudança de humor e isolamento"}
- Aspectos Lúdicos / Brincar: ${playBehaviorNotes || "Não informado"}
- Produções Gráficas / Desenhos / Escritas: ${drawingNotes || "Não informado"}
- Queixas Somáticas (Dores, náuseas): ${somatizations.join(", ") || "Nenhuma registrada"}
- Falas de Alerta / Ideação Verbalizada: ${verbalizations.join(", ") || "Nenhuma verbalização direta registrada"}
- Indícios ou Histórico de Autolesão: ${selfHarmSigns.join(", ") || "Não observados"}
- Fatores de Estresse Imediato / Gatilhos: ${immediateRiskTriggers.join(", ") || "Não identificados"}
- Fatores Protetivos Existentes: ${protectiveFactors.join(", ") || "Vínculo com um professor ou familiar"}
- Observações Adicionais do Caso: ${additionalNotes || "Nenhuma"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.3
      }
    });

    const responseText = response.text || "{}";
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // Clean possible markdown fences
      const cleaned = responseText.replace(/```json\n?|\n?```/g, "").trim();
      parsedData = JSON.parse(cleaned);
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error("Erro na análise especializada:", error);
    res.status(500).json({
      error: "Falha na geração do parecer técnico. O sistema local disponibiliza protocolos padrão para aplicação imediata.",
      details: error.message
    });
  }
});

// Vite middleware and static serving setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Guardião da Vida] Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();
