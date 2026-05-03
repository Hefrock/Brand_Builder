import { AIService, BrandPrompt } from "../types";

export class OpenAIProvider implements AIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  getName() {
    return "OpenAI";
  }

  async generatePrompts(productDescription: string): Promise<BrandPrompt[]> {
    const response = await fetch("/api/openai/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey: this.apiKey, productDescription })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "OpenAI Prompt Generation Failed");
    }
    return response.json();
  }

  async generateImage(prompt: string): Promise<string> {
    const response = await fetch("/api/openai/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey: this.apiKey, prompt })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "OpenAI Image Generation Failed");
    }
    const data = await response.json();
    return data.imageUrl;
  }
}
