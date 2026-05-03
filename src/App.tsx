/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Layout, 
  Newspaper, 
  Share2, 
  ArrowRight, 
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  Settings2,
  Key,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  createProvider, 
  getAvailableProviders, 
} from "@/src/lib/ai/factory";
import { AIService, BrandImage, ProviderType } from "@/src/lib/ai/types";

export default function App() {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<BrandImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>('gemini');
  const [showSettings, setShowSettings] = useState(false);
  
  // User-provided keys
  const [userKeys, setUserKeys] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("brandbuilder_keys");
    return saved ? JSON.parse(saved) : { openai: "", anthropic: "" };
  });

  const availableProviders = useMemo(() => getAvailableProviders(userKeys), [userKeys]);

  useEffect(() => {
    localStorage.setItem("brandbuilder_keys", JSON.stringify(userKeys));
  }, [userKeys]);

  useEffect(() => {
    const current = availableProviders.find(p => p.type === selectedProvider);
    if (!current?.hasKey) {
      const firstAvailable = availableProviders.find(p => p.hasKey);
      if (firstAvailable) setSelectedProvider(firstAvailable.type);
    }
  }, [availableProviders, selectedProvider]);

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);
    setError(null);
    setResults([]);

    try {
      const provider: AIService = createProvider(selectedProvider, userKeys);
      
      // Step 1: Generate Prompts
      const prompts = await provider.generatePrompts(description);
      
      // Step 2: Generate Images in parallel
      const imagePromises = prompts.map(async (p) => {
        const imageUrl = await provider.generateImage(p.prompt);
        return {
          medium: p.medium,
          imageUrl,
          prompt: p.prompt
        };
      });

      const generatedImages = await Promise.all(imagePromises);
      setResults(generatedImages);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate brand assets. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] font-sans selection:bg-orange-100">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">BrandBuilder</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              <Settings2 className="w-4 h-4 text-gray-400" />
              <select 
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value as ProviderType)}
                className="bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer"
              >
                {availableProviders.map(p => (
                  <option key={p.type} value={p.type} disabled={!p.hasKey}>
                    {p.name} {!p.hasKey ? "(Key Required)" : ""}
                  </option>
                ))}
              </select>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full gap-2"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Key className="w-4 h-4" />
              API Keys
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">Sign In</Button>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowSettings(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">API Configuration</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)}>
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex gap-3">
                    <Sparkles className="text-orange-500 w-5 h-5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-orange-900">Gemini (Default)</p>
                      <p className="text-xs text-orange-700">Automatically configured in AI Studio. No key needed.</p>
                    </div>
                    <CheckCircle2 className="text-orange-500 w-5 h-5 ml-auto shrink-0" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400">OpenAI API Key</Label>
                    <div className="relative">
                      <Input 
                        type="password"
                        placeholder="sk-..."
                        value={userKeys.openai}
                        onChange={(e) => setUserKeys(prev => ({ ...prev, openai: e.target.value }))}
                        className="rounded-xl pr-10"
                      />
                      {userKeys.openai ? <CheckCircle2 className="absolute right-3 top-2.5 w-5 h-5 text-green-500" /> : <Key className="absolute right-3 top-2.5 w-5 h-5 text-gray-300" />}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400">Anthropic API Key</Label>
                    <div className="relative">
                      <Input 
                        type="password"
                        placeholder="sk-ant-..."
                        value={userKeys.anthropic}
                        onChange={(e) => setUserKeys(prev => ({ ...prev, anthropic: e.target.value }))}
                        className="rounded-xl pr-10"
                      />
                      {userKeys.anthropic ? <CheckCircle2 className="absolute right-3 top-2.5 w-5 h-5 text-green-500" /> : <Key className="absolute right-3 top-2.5 w-5 h-5 text-gray-300" />}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full bg-black text-white rounded-xl h-12 font-bold"
                    onClick={() => setShowSettings(false)}
                  >
                    Save Configuration
                  </Button>
                  <p className="text-[10px] text-center text-gray-400 mt-4 leading-relaxed">
                    Keys are stored locally in your browser and used securely via backend proxy.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center space-y-12">
          {/* Hero Section: Input */}
          <div className="w-full max-w-3xl space-y-8 text-center">
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold tracking-tight leading-tight"
              >
                Imagine your product <span className="text-orange-500">everywhere.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
              >
                Describe your product and we'll generate consistent brand assets across billboards, newspapers, and social media.
              </motion.p>
            </div>

            <Card className="border-gray-100 shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-3 text-left">
                  <Label htmlFor="product-desc" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">
                    Product Description
                  </Label>
                  <Textarea
                    id="product-desc"
                    placeholder="e.g. A sleek, minimalist glass water bottle with a bamboo lid... (Note: No people will be included in images to ensure product focus)"
                    className="min-h-[160px] text-lg resize-none border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-orange-500 focus:border-orange-500 transition-all rounded-2xl p-6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white h-14 rounded-2xl text-xl font-bold group transition-all shadow-lg shadow-orange-200"
                  onClick={handleGenerate}
                  disabled={isGenerating || !description.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Crafting your brand...
                    </>
                  ) : (
                    <>
                      Generate Brand Assets
                      <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </div>

          {/* Results Section */}
          <div className="w-full min-h-[400px] pt-12 border-t border-gray-100">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-64" />
                  </div>
                  <div className="grid grid-cols-1 gap-8">
                    <Skeleton className="aspect-video w-full rounded-2xl" />
                    <div className="grid grid-cols-2 gap-8">
                      <Skeleton className="aspect-square w-full rounded-2xl" />
                      <Skeleton className="aspect-square w-full rounded-2xl" />
                    </div>
                  </div>
                </motion.div>
              ) : results.length > 0 ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <Tabs defaultValue="all" className="w-full">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Brand Assets</h2>
                      <TabsList className="bg-gray-100/50 p-1 rounded-full">
                        <TabsTrigger value="all" className="rounded-full px-6">All</TabsTrigger>
                        <TabsTrigger value="billboard" className="rounded-full px-6">Billboard</TabsTrigger>
                        <TabsTrigger value="newspaper" className="rounded-full px-6">Newspaper</TabsTrigger>
                        <TabsTrigger value="social" className="rounded-full px-6">Social</TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="all" className="space-y-8">
                      <div className="grid grid-cols-1 gap-8">
                        {/* Featured Billboard */}
                        {results.find(r => r.medium.toLowerCase().includes('billboard')) && (
                          <AssetCard asset={results.find(r => r.medium.toLowerCase().includes('billboard'))!} featured />
                        )}
                        
                        <div className="grid md:grid-cols-2 gap-8">
                          {results.filter(r => !r.medium.toLowerCase().includes('billboard')).map((asset) => (
                            <AssetCard key={asset.medium} asset={asset} />
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    {results.map((asset, i) => (
                      <TabsContent key={i} value={asset.medium.toLowerCase().split(' ')[0]} className="mt-0">
                        <AssetCard asset={asset} featured />
                      </TabsContent>
                    ))}
                  </Tabs>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/30"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-2">
                    <ImageIcon className="text-gray-300 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">No assets generated yet</h3>
                  <p className="text-gray-500 max-w-xs">
                    Enter a product description above to start building your brand identity.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">BrandBuilder AI</span>
          </div>
          <p className="text-sm text-gray-400">© 2026 BrandBuilder. Powered by Nano-Banana.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacy</a>
            <a href="#" className="hover:text-gray-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface AssetCardProps {
  asset: BrandImage;
  featured?: boolean;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, featured = false }) => {
  const Icon = asset.medium.toLowerCase().includes('billboard') ? Layout : 
               asset.medium.toLowerCase().includes('newspaper') ? Newspaper : Share2;

  return (
    <Card className={`group overflow-hidden border-none shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 bg-white rounded-3xl ${featured ? 'col-span-full' : ''}`}>
      <div className={`relative overflow-hidden bg-gray-50 ${featured ? 'aspect-[21/9]' : 'aspect-square'}`}>
        <img 
          src={asset.imageUrl} 
          alt={asset.medium}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-6 left-6">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl border border-white/20">
            <Icon className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-black uppercase tracking-widest">{asset.medium}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-8">
        <div className="flex items-start gap-4">
          <div className="bg-orange-50 p-3 rounded-2xl shrink-0">
            <Sparkles className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            {asset.prompt}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
