
import { GoogleGenAI } from "@google/genai";

const MOCK_RESPONSE = `
Based on the provided claims data, here's a brief analysis:

**D&O Patterns:**
*   **Rising Litigation:** There's a 15% increase in litigation frequency in the New York jurisdiction, primarily linked to securities class actions.
*   **Common Allegations:** Key allegations involve misrepresentation in financial statements and inadequate disclosure during M&A activities.
*   **Severity:** Claims originating from Texas show a higher average settlement value, approximately 22% above the mean.

**New York Litigation Cases (Open):**
*   There are currently 42 open litigation cases in New York.
*   **Primary Drivers:** The majority (65%) are related to shareholder derivative lawsuits.
*   **Emerging Trend:** A notable uptick in claims related to ESG (Environmental, Social, and Governance) disclosures not being met.

For a more detailed breakdown, I can generate a report. Would you like me to proceed?
`;

export const getAnalyticsResponse = async (prompt: string): Promise<string> => {
  // In a real application, the API key would be securely managed.
  // We're using a placeholder here. If it's not set, we return a mock response.
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("API_KEY environment variable not set. Returning mock data.");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(MOCK_RESPONSE);
      }, 1500);
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert claims analysis AI. Based on internal claims data, answer the following user query concisely and professionally. Query: "${prompt}"`,
      config: {
        temperature: 0.5,
        topP: 1,
        topK: 32,
        maxOutputTokens: 1024,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return "Sorry, I encountered an error while processing your request. Please check the console for details.";
  }
};
