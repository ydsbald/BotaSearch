import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Database } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';
import { DataEditorForm } from './DataEditorForm';

export function Chatbot({ selectedModel = 'gemini-3-flash-preview' }: { selectedModel?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'data'>('chat');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Bonjour ! Je suis votre assistant botanique. Posez-moi des questions sur les plantes de Madagascar ou demandez-moi de chercher des informations sur le web.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current && activeTab === 'chat') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const getApiKey = () => {
        if (typeof process !== 'undefined' && process.env) {
          if (process.env.API_KEY) return process.env.API_KEY;
          if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
        }
        if (typeof import.meta !== 'undefined' && import.meta.env) {
          if (import.meta.env.VITE_GEMINI_API_KEY) return import.meta.env.VITE_GEMINI_API_KEY;
        }
        return '';
      };

      const apiKey = getApiKey();
      if (!apiKey) {
        throw new Error("Clé API introuvable. Veuillez configurer VITE_GEMINI_API_KEY dans votre fichier .env local.");
      }

      const currentAi = new GoogleGenAI({ apiKey });
      
      const contents = messages
        .filter((m, i) => !(i === 0 && m.role === 'model')) // Remove initial greeting
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));
      contents.push({ role: 'user', parts: [{ text: userMsg }] });

      const response = await currentAi.models.generateContent({
        model: selectedModel,
        contents: contents,
        config: {
          systemInstruction: 'Vous êtes un expert en botanique spécialisé dans la flore de Madagascar. Vous aidez les utilisateurs à identifier des plantes, comprendre des termes botaniques, et vous pouvez chercher sur le web pour fournir des informations à jour ou des descriptions détaillées.',
          tools: [{ googleSearch: {} }],
          toolConfig: { includeServerSideToolInvocations: true }
        }
      });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text || '' }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorMessage = error?.message?.includes("Clé API introuvable") 
        ? error.message 
        : "Désolé, une erreur s'est produite lors de la communication avec l'assistant.";
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green2 text-bg flex items-center justify-center shadow-[0_0_20px_rgba(126,179,86,0.4)] z-50 transition-all",
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Augmented Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[850px] h-[650px] max-w-[90vw] max-h-[90vh] bg-bg2 border border-border2 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden glass-panel"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/50 bg-bg3/50 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-green2" />
                  <span className="font-mono font-bold text-sm text-green2 tracking-wide text-glow">BotaBot & Outils</span>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-[11px] font-mono tracking-wider uppercase transition-colors flex items-center gap-2",
                      activeTab === 'chat' ? "bg-green/20 text-green2 border border-green/30" : "text-muted hover:text-text hover:bg-text/5"
                    )}
                  >
                    <MessageSquare className="w-3 h-3" /> Chat
                  </button>
                  <button
                    onClick={() => setActiveTab('data')}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-[11px] font-mono tracking-wider uppercase transition-colors flex items-center gap-2",
                      activeTab === 'data' ? "bg-amber/20 text-amber2 border border-amber/30" : "text-muted hover:text-text hover:bg-text/5"
                    )}
                  >
                    <Database className="w-3 h-3" /> Éditeur de Données
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-text transition-colors p-1 rounded-md hover:bg-text/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
              {/* Chat Tab */}
              {activeTab === 'chat' && (
                <div className="absolute inset-0 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map((msg, i) => (
                      <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                          msg.role === 'user' ? "bg-amber/20 text-amber2" : "bg-green/20 text-green2"
                        )}>
                          {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={cn(
                          "px-3 py-2 rounded-xl text-[13px] leading-relaxed max-w-[80%] markdown-body",
                          msg.role === 'user' 
                            ? "bg-amber/10 border border-amber/20 text-text rounded-tr-none" 
                            : "bg-bg3/50 border border-border text-text2 rounded-tl-none"
                        )}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 flex-row">
                        <div className="w-8 h-8 rounded-full bg-green/20 text-green2 flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="px-4 py-3 rounded-xl bg-bg3/50 border border-border rounded-tl-none flex items-center gap-2">
                          <Loader2 className="w-4 h-4 text-green2 animate-spin" />
                          <span className="text-[11px] text-muted italic">Recherche en cours...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t border-border/50 bg-bg3/50">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Posez une question..."
                        className="w-full bg-bg3/50 border border-border2 rounded-full pl-4 pr-10 py-2 text-[13px] text-text focus:outline-none focus:border-green/50 transition-colors placeholder:text-muted"
                      />
                      <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-1.5 w-7 h-7 flex items-center justify-center rounded-full bg-green2 text-bg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                      >
                        <Send className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Editor Tab */}
              {activeTab === 'data' && (
                <div className="absolute inset-0">
                  <DataEditorForm />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
