# ✨ Brand Builder

**Transform your product concepts into professional-grade creative assets.**  
Imagine your product across Billboards, Newspapers, and Social Media while maintaining perfect visual consistency.

[![Live Demo](https://img.shields.io/badge/Live-Demo-orange?style=for-the-badge&logo=google-cloud)](https://ais-pre-nq4qm2n2a5akuqsedgrkam-174871162112.us-east5.run.app)

---

## 🎨 Visual Showcase

> [!TIP]
> Click the sections below to see how Brand Builder transforms a simple description into high-impact marketing assets.

<details>
<summary><b>📸 Hero Section & Input Interface</b></summary>
<br>
<img src="./screenshots/hero_section.PNG" alt="Hero Section" width="800" style="border-radius: 12px; border: 1px solid #eaeaea;">
</details>

<details>
<summary><b>🏙️ Billboard Visualization (High Impact)</b></summary>
<br>
<img src="./screenshots/billboard_view.PNG" alt="Billboard" width="800" style="border-radius: 12px; border: 1px solid #eaeaea;">
</details>

<details>
<summary><b>📰 Newspaper & Social Media Integration</b></summary>
<br>
<img src="./screenshots/newspaper_social_view.PNG" alt="Newspaper and Social" width="800" style="border-radius: 12px; border: 1px solid #eaeaea;">
</details>

---

## 🚀 Core Features

- **🎯 AI Creative Director**: Intelligent prompt engineering that maintains your product's DNA across different formats.
- **🖼️ Multi-Medium Support**: Specialized generation for high-impact Billboards, elegant Newspapers, and lifestyle Social Posts.
- **🛡️ Safety Guardrails**: Built-in "No People" policy ensures your product remains the absolute star of every shot.
- **⚡ Enterprise Scale**: Full-stack architecture with secure proxies for Gemini, Claude 3.5, and GPT-4o.

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Motion |
| **Backend** | Node.js, Express (API Proxy) |
| **Intelligence** | Gemini 2.0, Claude 3.5 Sonnet, GPT-4o, DALL-E 3 |
| **Styling** | shadcn/ui, Lucide Icons, Geist Sans |

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
