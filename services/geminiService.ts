
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, GEMINI_MODEL } from "../constants";

export async function generateWPBakeryBlock(prompt: string): Promise<string> {
  // Acesso seguro para evitar ReferenceError no browser
  const env = (typeof process !== 'undefined' && process.env) ? process.env : (window as any).process?.env;
  const apiKey = env?.API_KEY;
  
  if (!apiKey) {
    throw new Error("API_KEY não configurada no ambiente. Verifique as configurações da Vercel.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
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
    // Limpeza de blocos de código Markdown que o modelo possa retornar por engano
    return code.replace(/```[a-z]*\n/g, '').replace(/\n```/g, '').trim();
  } catch (error) {
    console.error("Error generating block:", error);
    throw error;
  }
}
