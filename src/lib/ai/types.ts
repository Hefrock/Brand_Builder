export interface BrandPrompt {
  medium: string;
  prompt: string;
}

export interface BrandImage {
  medium: string;
  imageUrl: string;
  prompt: string;
}

export interface AIService {
  generatePrompts(productDescription: string): Promise<BrandPrompt[]>;
  generateImage(prompt: string): Promise<string>;
  getName(): string;
}

export type ProviderType = 'gemini' | 'openai' | 'anthropic';
