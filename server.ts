import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes for OpenAI and Anthropic
  app.post("/api/openai/prompts", async (req, res) => {
    const { apiKey, productDescription } = req.body;
    if (!apiKey) return res.status(400).json({ error: "OpenAI API Key missing" });

    try {
      const openai = new OpenAI({ apiKey });
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a creative director. Return a JSON array of 3 objects with 'medium' and 'prompt' fields for a Billboard, Newspaper, and Social Post. No people in images. Maintain product consistency."
          },
          {
            role: "user",
            content: `Product: ${productDescription}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("No content from OpenAI");
      const parsed = JSON.parse(content);
      const prompts = Array.isArray(parsed) ? parsed : (parsed.prompts || parsed.assets || Object.values(parsed)[0]);
      res.json(prompts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/openai/image", async (req, res) => {
    const { apiKey, prompt } = req.body;
    if (!apiKey) return res.status(400).json({ error: "OpenAI API Key missing" });

    try {
      const openai = new OpenAI({ apiKey });
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt + " Ensure there are no people in the image. High quality, professional photography.",
        n: 1,
        size: "1024x1024",
        response_format: "b64_json"
      });
      res.json({ imageUrl: `data:image/png;base64,${response.data[0].b64_json}` });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/anthropic/prompts", async (req, res) => {
    const { apiKey, productDescription } = req.body;
    if (!apiKey) return res.status(400).json({ error: "Anthropic API Key missing" });

    try {
      const anthropic = new Anthropic({ apiKey });
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-latest",
        max_tokens: 1024,
        system: "You are a creative director. Return ONLY a JSON array of 3 objects with 'medium' and 'prompt' fields for a Billboard, Newspaper, and Social Post. No people in images. Maintain product consistency.",
        messages: [{ role: "user", content: `Product: ${productDescription}` }]
      });
      const content = response.content[0];
      if (content.type !== 'text') throw new Error("Unexpected response from Anthropic");
      res.json(JSON.parse(content.text));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
