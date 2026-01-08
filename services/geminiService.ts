
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, GEMINI_MODEL } from "../constants";

export async function generateWPBakeryBlock(prompt: string): Promise<string> {
  // Criamos a instância aqui para garantir que pegamos a chave atualizada do process.env
  // após o usuário usar o seletor de chaves do AI Studio, se necessário.
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

    const code = response.text || "";
    return code.replace(/```[a-z]*\n/g, '').replace(/\n```/g, '').trim();
  } catch (error: any) {
    console.error("Erro na API Gemini:", error);
    
    // Tratamento de erro conforme as diretrizes (Requested entity was not found ou falta de chave)
    if (error.message?.includes('not found') || error.message?.includes('API_KEY') || error.message?.includes('401')) {
      throw new Error("KEY_REQUIRED");
    }
    
    throw error;
  }
}
