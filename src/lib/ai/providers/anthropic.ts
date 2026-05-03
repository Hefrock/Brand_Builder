import { AIService, BrandPrompt } from "../types";

export class AnthropicProvider implements AIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  getName() {
    return "Anthropic (Claude)";
  }

  async generatePrompts(productDescription: string): Promise<BrandPrompt[]> {
    const response = await fetch("/api/anthropic/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey: this.apiKey, productDescription })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Anthropic Prompt Generation Failed");
    }
    return response.json();
  }

  async generateImage(_prompt: string): Promise<string> {
    throw new Error("Anthropic does not support native image generation. Please use Gemini or OpenAI for images.");
  }
}
