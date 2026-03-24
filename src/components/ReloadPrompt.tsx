import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, RefreshCw, X } from 'lucide-react';

export function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <AnimatePresence>
      {(offlineReady || needRefresh) && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-bg2 border border-border2 rounded-xl shadow-2xl p-4 flex items-center gap-4 max-w-sm w-[calc(100%-3rem)] glass-panel"
        >
          <div className="flex-1 text-sm">
            {offlineReady ? (
              <span className="flex items-center gap-2 text-green2">
                <Download className="w-4 h-4" />
                App prête pour une utilisation hors-ligne
              </span>
            ) : (
              <span className="flex items-center gap-2 text-amber2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Nouvelle version disponible
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {needRefresh && (
              <button
                onClick={() => updateServiceWorker(true)}
                className="px-3 py-1.5 bg-green2 text-bg rounded-lg text-xs font-bold hover:bg-green transition-colors"
              >
                Mettre à jour
              </button>
            )}
            <button
              onClick={close}
              className="p-1.5 text-muted hover:text-text rounded-lg hover:bg-bg3 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
