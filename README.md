# Brand Builder App

A professional-grade creative tool that lets you describe a product and imagine it across different mediums (Billboard, Newspaper, Social Media) while maintaining product consistency.

## Features
- **AI-Powered Branding**: Generates consistent visual assets using Gemini models.
- **Multi-Medium Support**: Visualizes products for Billboards, Newspapers, and Social Media.
- **No-People Policy**: Ensures images focus purely on the product.
- **Modern UI**: Built with React, Tailwind CSS, and shadcn/ui.

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

## Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd brand-builder-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add your Gemini API key:
```env
GEMINI_API_KEY=your_api_key_here
```
*(Note: You can use `.env.example` as a template)*

### 4. Run the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## Building for Production
To create a production-ready build:
```bash
npm run build
```
The output will be in the `dist/` directory.

## Tech Stack
- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Node.js + Express (Proxy for OpenAI/Anthropic)
- **AI Providers**: 
  - **Gemini**: Client-side (Native AI Studio support)
  - **OpenAI**: Server-side proxy (GPT-4o + DALL-E 3)
  - **Anthropic**: Server-side proxy (Claude 3.5 Sonnet)
- **Animations**: Motion
- **Icons**: Lucide React
