import { GeminiProvider } from "./providers/gemini";
import { OpenAIProvider } from "./providers/openai";
import { AnthropicProvider } from "./providers/anthropic";
import { AIService, ProviderType } from "./types";

export function getAvailableProviders(userKeys?: Record<string, string>) {
  const providers: { type: ProviderType; name: string; hasKey: boolean }[] = [
    { 
      type: 'gemini', 
      name: 'Gemini', 
      hasKey: !!process.env.GEMINI_API_KEY 
    },
    { 
      type: 'openai', 
      name: 'OpenAI', 
      hasKey: !!(userKeys?.openai || process.env.OPENAI_API_KEY) 
    },
    { 
      type: 'anthropic', 
      name: 'Anthropic', 
      hasKey: !!(userKeys?.anthropic || process.env.ANTHROPIC_API_KEY) 
    },
  ];
  return providers;
}

export function createProvider(type: ProviderType, userKeys?: Record<string, string>): AIService {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = userKeys?.openai || process.env.OPENAI_API_KEY;
  const anthropicKey = userKeys?.anthropic || process.env.ANTHROPIC_API_KEY;

  switch (type) {
    case 'gemini':
      if (!geminiKey) throw new Error("Gemini API Key missing");
      return new GeminiProvider(geminiKey);
    case 'openai':
      if (!openaiKey) throw new Error("OpenAI API Key missing");
      return new OpenAIProvider(openaiKey);
    case 'anthropic':
      if (!anthropicKey) throw new Error("Anthropic API Key missing");
      return new AnthropicProvider(anthropicKey);
    default:
      throw new Error(`Unknown provider type: ${type}`);
  }
}

export function getDefaultProvider(): AIService {
  const providers = getAvailableProviders();
  const available = providers.find(p => p.hasKey);
  
  if (!available) {
    // Fallback to Gemini even if key is missing, so the UI can handle the error gracefully
    // and because AI Studio might inject it in a way we can't see at compile time
    return createProvider('gemini');
  }
  
  return createProvider(available.type);
}
