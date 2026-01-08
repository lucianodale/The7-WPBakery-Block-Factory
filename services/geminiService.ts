
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, GEMINI_MODEL } from "../constants";

export async function generateWPBakeryBlock(prompt: string): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
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
    // Sanitize in case Gemini includes markdown code blocks
    return code.replace(/```[a-z]*\n/g, '').replace(/\n```/g, '').trim();
  } catch (error) {
    console.error("Error generating block:", error);
    throw error;
  }
}
