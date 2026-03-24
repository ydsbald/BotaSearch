import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Key, Cpu } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function SettingsModal({ isOpen, onClose, selectedModel, onModelChange }: SettingsModalProps) {
  const handleApiKeyChange = async () => {
    const w = window as any;
    if (w.aistudio && w.aistudio.openSelectKey) {
      await w.aistudio.openSelectKey();
    } else {
      alert("La sélection de clé API via l'interface n'est pas disponible en local.\n\nPour utiliser l'application localement, veuillez créer un fichier .env à la racine du projet et y ajouter votre clé :\nVITE_GEMINI_API_KEY=votre_cle_api");
    }
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
    </AnimatePresence>
  );
}
