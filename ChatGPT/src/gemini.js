import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// Override with VITE_GEMINI_MODEL in .env if Google retires this model again.
const MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.8-flash";

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// prompt: string, history: [{ role: 'user' | 'ai', text }]
async function main(prompt, history = []) {
  if (!ai) {
    throw new Error(
      "Missing API key. Add VITE_GEMINI_API_KEY to your .env file and restart the dev server."
    );
  }

  const contents = [
    ...history.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: prompt }] },
  ];

  try {
    const response = await ai.models.generateContent({ model: MODEL, contents });
    return response.text || "No response received. Please try again.";
  } catch (error) {
    console.error("Gemini API error:", error);
    const msg = String(error?.message || error);
    if (/429|quota|RESOURCE_EXHAUSTED/i.test(msg)) {
      throw new Error("Free-tier limit reached. Wait a minute and try again.", { cause: error });
    }
    if (/API key|401|403|PERMISSION_DENIED|API_KEY_INVALID/i.test(msg)) {
      throw new Error(
        "Your API key looks invalid. Create a new free key in Google AI Studio and update .env.",
        { cause: error }
      );
    }
    if (/404|NOT_FOUND|no longer available/i.test(msg)) {
      throw new Error(
        `The model "${MODEL}" is not available. Set VITE_GEMINI_MODEL in .env to a current model from Google AI Studio and restart the dev server.`,
        { cause: error }
      );
    }
    throw new Error("Something went wrong while contacting the AI. Please try again.", { cause: error });
  }
}

export default main;
