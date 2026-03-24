import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Key, Cpu, Save, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function SettingsModal({ isOpen, onClose, selectedModel, onModelChange }: SettingsModalProps) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState('');

  const handleApiKeyChange = async () => {
    const w = window as any;
    if (w.aistudio && w.aistudio.openSelectKey) {
      await w.aistudio.openSelectKey();
    } else {
      setTempKey(localStorage.getItem('botasearch_api_key') || '');
      setShowKeyModal(true);
    }
  };

  const saveApiKey = () => {
    if (tempKey.trim() === '') {
      localStorage.removeItem('botasearch_api_key');
    } else {
      localStorage.setItem('botasearch_api_key', tempKey.trim());
    }
    setShowKeyModal(false);
  };

  const clearApiKey = () => {
    localStorage.removeItem('botasearch_api_key');
    setTempKey('');
    setShowKeyModal(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-bg2 border border-border2 rounded-xl shadow-2xl z-50 overflow-hidden glass-panel"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-bg3/50">
              <h2 className="font-mono font-bold text-lg text-green2 tracking-wide">Paramètres</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-green/10 text-muted hover:text-green2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Model Selection */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-text2 uppercase tracking-wider">
                  <Cpu className="w-4 h-4 text-amber2" />
                  Modèle d'IA
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => onModelChange(e.target.value)}
                  className="w-full bg-bg3/50 border border-border2 rounded-lg px-4 py-2.5 text-text focus:border-green focus:outline-none focus:ring-1 focus:ring-green transition-colors font-mono text-sm"
                >
                  <option value="gemini-3-flash-preview">Gemini 3 Flash (Rapide)</option>
                  <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Avancé)</option>
                  <option value="gemini-3.1-flash-lite-preview">Gemini 3.1 Flash Lite</option>
                </select>
                <p className="text-xs text-muted">
                  Choisissez le modèle utilisé par BotaBot pour répondre à vos questions.
                </p>
              </div>

              {/* API Key */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-text2 uppercase tracking-wider">
                  <Key className="w-4 h-4 text-amber2" />
                  Clé API Gemini
                </label>
                <button
                  onClick={handleApiKeyChange}
                  className="w-full flex items-center justify-center gap-2 bg-bg3/50 hover:bg-green/10 border border-border2 hover:border-green/50 text-text rounded-lg px-4 py-2.5 transition-colors font-mono text-sm"
                >
                  <Key className="w-4 h-4" />
                  Changer la clé API
                </button>
                <p className="text-xs text-muted">
                  Nécessaire pour utiliser les modèles payants comme Gemini 3.1 Pro.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* API Key Modal */}
      {showKeyModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={() => setShowKeyModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-bg2 border border-border2 rounded-xl shadow-2xl z-[60] overflow-hidden glass-panel"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-bg3/50">
              <h2 className="font-mono font-bold text-lg text-green2 tracking-wide">Clé API Locale</h2>
              <button
                onClick={() => setShowKeyModal(false)}
                className="p-1.5 rounded-full hover:bg-green/10 text-muted hover:text-green2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-muted">
                Entrez votre clé API Gemini. Laissez vide pour utiliser la clé du fichier <code className="text-amber2 bg-bg3 px-1.5 py-0.5 rounded border border-border2">.env</code>.
              </p>
              <input
                type="password"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-bg3/50 border border-border2 rounded-lg px-4 py-2.5 text-text focus:border-green focus:outline-none focus:ring-1 focus:ring-green transition-colors font-mono text-sm"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={clearApiKey}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Effacer la clé locale"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2 text-sm text-muted hover:text-text transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={saveApiKey}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-green2 text-bg rounded-lg hover:bg-green transition-colors font-bold"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
