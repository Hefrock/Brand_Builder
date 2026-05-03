# ✨ Brand Builder

**Transform your product concepts into professional-grade creative assets.**  
Imagine your product across Billboards, Newspapers, and Social Media while maintaining perfect visual consistency.

---

## 🎨 Visual Showcase

<table style="width: 100%; border-collapse: collapse; border: none;">
  <tr>
    <td style="width: 50%; padding: 10px; vertical-align: top; border: none;">
      <h3 align="center">🎯 Input & Strategy</h3>
      <img src="./screenshots/hero_section.PNG" alt="Hero Section" style="border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
      <p align="center" style="font-size: 0.9em; color: #666;">High-fidelity prompt engineering interface for consistent branding.</p>
    </td>
    <td style="width: 50%; padding: 10px; vertical-align: top; border: none;">
      <h3 align="center">🏙️ Out-of-Home</h3>
      <img src="./screenshots/billboard_view.PNG" alt="Billboard View" style="border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
      <p align="center" style="font-size: 0.9em; color: #666;">Urban-scale visualization maintaining product geometry and vibe.</p>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 10px; border: none;">
      <h3 align="center">📰 Multi-Channel Integration</h3>
      <img src="./screenshots/newspaper_social_view.PNG" alt="Social Media and News" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
      <p align="center" style="font-size: 0.9em; color: #666;">Seamless asset generation across Digital and Print media.</p>
    </td>
  </tr>
</table>

---

## 🏗️ Technical Highlights

- **🔒 Secure Proxy Architecture**: Implemented an Express backend to safely handle LLM API keys, preventing client-side exposure.
- **🎨 Dynamic Component Injection**: Uses `motion/react` for fluid layout transitions between different medium views.
- **👁️ Prompt Orchestration**: Custom system instructions to ensure OOD (Out-of-Distribution) consistency across DALL-E 3 and Gemini vision models.
- **📐 Responsive Realism**: CSS grid systems designed to mimic real-world aspect ratios for Billboards and Print media.

---

## 🚀 Core Features

- **🎯 AI Creative Director**: Intelligent prompt engineering that maintains your product's DNA across different formats.
- **🖼️ Multi-Medium Support**: Specialized generation for high-impact Billboards, elegant Newspapers, and lifestyle Social Posts.
- **🛡️ Safety Guardrails**: Built-in "No People" policy ensures your product remains the absolute star of every shot.
- **⚡ Performance First**: Full-stack architecture with secure, high-speed proxies for Gemini 2.0, Claude 3.5, and GPT-4o.

---

## 🛠️ Tech Stack

- **Core**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS, Motion, shadcn/ui
- **Backend**: Node.js, Express (Internal API Proxy)
- **Intelligence**: Google Gemini 2.0, OpenAI DALL-E 3, Anthropic

---

## 🚦 Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **npm** or **pnpm**
- [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### 2. Quick Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd brand-builder-app

# Install dependencies
npm install
```

### 3. Environment Config
Create a `.env` file in the root:
```env
GEMINI_API_KEY=your_key_here
# Optional for additional models:
# OPENAI_API_KEY=...
# ANTHROPIC_API_KEY=...
```

### 4. Fire it up
```bash
npm run dev
```
Explore at **[http://localhost:3000](http://localhost:3000)**

---

## 📦 Production Deployment
```bash
npm run build
npm start
```
