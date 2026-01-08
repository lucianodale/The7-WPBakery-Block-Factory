
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, GEMINI_MODEL } from "../constants";

export async function generateWPBakeryBlock(prompt: string): Promise<string> {
  // Inicialização direta conforme as diretrizes da SDK
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    // O texto é extraído via propriedade .text
    const code = response.text || "";
    
    // Remove delimitadores de markdown se o modelo os incluir
    return code.replace(/```[a-z]*\n/g, '').replace(/\n```/g, '').trim();
  } catch (error: any) {
    console.error("Erro na API Gemini:", error);
    // Erros específicos de autenticação são comuns se a chave não estiver no environment
    if (error.message?.includes('API_KEY')) {
      throw new Error("Erro de Autenticação: Verifique se a API_KEY foi configurada corretamente nas variáveis de ambiente da Vercel.");
    }
    throw error;
  }
}
