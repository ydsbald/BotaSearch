import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Menu, Search, Sparkles, Sun, Moon, Settings } from 'lucide-react';
import { search, getSuggestions, tokenize } from './search';
import { ResultCard } from './components/ResultCard';
import { Chatbot } from './components/Chatbot';
import { SettingsModal } from './components/SettingsModal';
import { cn } from './lib/utils';

const FILTERS = [
  { id: 'all', label: 'Toutes' },
  { id: 'monocot', label: 'Monocot' },
  { id: 'dicot', label: 'Dicot' },
  { id: 'arbre', label: 'Arbres' },
  { id: 'liane', label: 'Lianes' },
  { id: 'herbacée', label: 'Herbacées' },
  { id: 'forêt humide', label: 'Forêt humide' },
  { id: 'forêt sèche', label: 'Forêt sèche' },
  { id: 'littoral', label: 'Littoral' },
  { id: 'montagne', label: 'Montagne' },
];

const QUICK_SEARCHES = [
  { q: 'latex capsule', label: 'Latex + capsule' },
  { q: 'gousse légumineuse', label: 'Légumineuses' },
  { q: 'spadice spathe', label: 'Aracées' },
  { q: 'tige quadrangulaire feuilles opposées', label: 'Labiées/Acanthes' },
  { q: 'mangrove racines échasses', label: 'Mangrove' },
  { q: 'ravinala éventail', label: 'Ravinala' },
  { q: 'capitule akène pappus', label: 'Composées' },
  { q: 'épiphyte labelle orchidée', label: 'Orchidées' },
  { q: 'palmier stipe drupe', label: 'Palmiers' },
  { q: 'carnivore vésicules', label: 'Plantes carnivores' },
  { q: 'succulent aréoles épines', label: 'Cactacées' },
  { q: 'stipules interpétiolaires', label: 'Stipules interpétiol.' },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dbVersion, setDbVersion] = useState(0);
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem('botasearch_theme') === 'light';
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem('botasearch_model') || 'gemini-3-flash-preview';
  });

  useEffect(() => {
    localStorage.setItem('botasearch_model', selectedModel);
  }, [selectedModel]);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
      localStorage.setItem('botasearch_theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('botasearch_theme', 'dark');
    }
  }, [isLightMode]);

  useEffect(() => {
    const handleDbUpdate = () => setDbVersion(v => v + 1);
    window.addEventListener('db_updated', handleDbUpdate);
    return () => window.removeEventListener('db_updated', handleDbUpdate);
  }, []);

  const results = useMemo(() => search(query, activeFilter), [query, activeFilter, dbVersion]);
  const tokens = useMemo(() => tokenize(query), [query]);
  const suggestions = useMemo(() => getSuggestions(results, tokens), [results, tokens]);

  const maxScore = results[0]?.score || 1;

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const addToken = (token: string) => {
    const current = query.trim();
    setQuery(current ? `${current} ${token}` : token);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg text-text font-mono text-[13px] relative">
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-green/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-amber/10 blur-[120px]" />
      </div>

      {/* HEADER */}
      <header className="flex items-baseline gap-5 px-6 pt-5 pb-4 border-b border-border glass-panel shrink-0 z-30 relative">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-green2 hover:text-green3 transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="font-mono font-bold text-xl text-green2 tracking-tight text-glow">
            Bota<span className="text-amber2 text-glow-amber">Search</span>
          </div>
        </div>
        <div className="hidden sm:block font-serif italic text-[15px] text-muted2 tracking-wide">
          Flore vasculaire de Madagascar
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="text-[10px] text-muted tracking-widest hidden sm:block uppercase">
            v1.0 · ≥80 familles · Schatz-inspired
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="text-muted hover:text-green2 transition-colors p-1.5 rounded-full hover:bg-green/10"
            title="Paramètres"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className="text-muted hover:text-green2 transition-colors p-1.5 rounded-full hover:bg-green/10"
            title="Basculer le thème"
          >
            {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* SEARCH ZONE */}
      <div className="glass-panel border-b border-border px-6 py-6 shrink-0 z-20 relative">
        <div className="flex items-center gap-4 bg-bg3/50 backdrop-blur-md border border-border2 px-5 py-3.5 rounded-lg transition-all duration-300 focus-within:border-green focus-within:shadow-[0_0_0_1px_rgba(126,179,86,1),0_0_30px_rgba(126,179,86,0.2)] group">
          <Search className="w-5 h-5 text-green group-focus-within:text-green2 transition-colors" />
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="ex: feuille composée latex, tige quadrangulaire feuilles opposées..."
            className="flex-1 bg-transparent border-none outline-none text-green3 font-mono text-base placeholder:text-muted/70 placeholder:italic placeholder:text-sm caret-green"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted hover:text-text transition-colors p-1 rounded-full hover:bg-text/5">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[11px] text-muted whitespace-nowrap hidden sm:inline font-medium tracking-wider uppercase">
            {results.length} famille{results.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex gap-2.5 mt-4 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={cn(
                "px-3.5 py-1.5 border rounded-full text-[10px] cursor-pointer font-mono tracking-wider transition-all duration-300 uppercase",
                activeFilter === f.id
                  ? "border-green text-green2 bg-green/10 shadow-[0_0_10px_rgba(126,179,86,0.2)]"
                  : "border-border2 text-muted2 hover:border-green/50 hover:text-green2 bg-bg3/50 hover:bg-green/5"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex gap-4 mt-4 text-[10px] text-muted tracking-wide hidden md:flex uppercase">
          <span className="text-amber/70">Traits prioritaires:</span>
          <span>fruit <span className="text-green2 font-bold">×4</span> · fleur <span className="text-green2 font-bold">×3</span> · feuille <span className="text-green2 font-bold">×2</span> · tige <span className="text-green2 font-bold">×1</span></span>
          <span className="mx-2 opacity-30">|</span>
          <span>Base: <span className="text-muted2">Schatz 2001 approx.</span> · Endémisme Madagascar</span>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        
        {/* SIDEBAR (Desktop) */}
        <div className={cn(
          "w-64 min-w-[256px] border-r border-border glass-panel overflow-y-auto shrink-0 transition-transform duration-500 absolute md:relative z-30 h-full",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
          <div className="p-5 border-b border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber/5 rounded-full blur-3xl -z-10"></div>
            <div className="text-[10px] tracking-[0.2em] text-amber uppercase mb-3 font-bold flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Traits discriminants
            </div>
            <div className="space-y-1">
              {!suggestions.length ? (
                <div className="text-muted text-[11px] italic py-2">
                  {tokens.length ? 'Pas de traits supplémentaires.' : 'Tapez une recherche…'}
                </div>
              ) : (
                suggestions.map((s, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={s.key} 
                    onClick={() => addToken(s.key)}
                    className="px-3 py-2 cursor-pointer rounded-md text-text2 text-[11px] flex items-center gap-2.5 transition-all duration-200 hover:bg-green/10 hover:text-green2 border border-transparent hover:border-green/20 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green/40 group-hover:bg-green group-hover:shadow-[0_0_5px_rgba(126,179,86,0.8)] transition-all"></span>
                    <span className="tracking-wide">{s.label}</span>
                    <span className="ml-auto text-[9px] text-muted group-hover:text-green2/70 font-bold">{s.count}</span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
          <div className="p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green/5 rounded-full blur-3xl -z-10"></div>
            <div className="text-[10px] tracking-[0.2em] text-green uppercase mb-3 font-bold flex items-center gap-2">
               Recherches rapides
            </div>
            <div className="space-y-1">
              {QUICK_SEARCHES.map(qs => (
                <div 
                  key={qs.q}
                  onClick={() => { setQuery(qs.q); setIsSidebarOpen(false); }}
                  className="px-3 py-2 cursor-pointer rounded-md text-text2 text-[11px] flex items-center gap-2.5 transition-all duration-200 hover:bg-green/10 hover:text-green2 border border-transparent hover:border-green/20 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green/40 group-hover:bg-green group-hover:shadow-[0_0_5px_rgba(126,179,86,0.8)] transition-all"></span>
                  <span className="tracking-wide">{qs.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg/60 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* RESULTS AREA */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {(query.trim() || activeFilter !== 'all') && (
            <div className="px-6 py-3 text-[10px] text-muted border-b border-border/50 flex gap-6 shrink-0 glass-panel uppercase tracking-wider">
              <span>Résultats: <strong className="text-green2 font-bold text-[11px]">{results.length}</strong></span>
              <span>Score max: <strong className="text-green2 font-bold text-[11px]">{maxScore.toFixed(0)}</strong></span>
              {activeFilter !== 'all' && (
                <span>Filtre: <strong className="text-green2 font-bold text-[11px]">{activeFilter}</strong></span>
              )}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            {!query.trim() && activeFilter === 'all' ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 px-6 text-muted max-w-3xl mx-auto relative"
              >
                <div className="absolute inset-0 bg-green/5 blur-[100px] rounded-full -z-10"></div>
                <div className="font-serif text-6xl italic font-light text-muted2 mb-4 tracking-tight">
                  Bota<em className="text-green2 not-italic text-glow">Search</em>
                </div>
                <p className="text-base font-serif italic text-text2 mb-6 tracking-wide">
                  Identification botanique par recherche libre
                </p>
                <p className="text-[13px] my-2 leading-relaxed max-w-xl mx-auto text-muted2">
                  Tapez des caractères morphologiques dans le champ de recherche. Le système classe les familles par pertinence pondérée.
                </p>
                <p className="text-[10px] text-muted mt-6 uppercase tracking-widest">
                  Base: ~85 familles · Flore vasculaire malgache · Données approx. Schatz (2001)
                </p>
                
                <div className="mt-12 flex flex-wrap gap-3 justify-center">
                  {[
                    'feuille composée pennée', 'latex blanc baie', 'tige quadrangulaire aromatique',
                    'fruit capsule explosive', 'ovaire infère ombelle', 'feuilles opposées stipules drupe',
                    'nervation parallèle monocot', 'rhizome aromatique forêt humide'
                  ].map((q, i) => (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 + 0.2 }}
                      key={q}
                      onClick={() => setQuery(q)}
                      className="px-4 py-2 border border-border2 rounded-full text-[11px] text-text2 transition-all duration-300 hover:border-green hover:text-green2 hover:bg-green/10 hover:shadow-[0_0_15px_rgba(126,179,86,0.15)]"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : results.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 px-6 text-muted"
              >
                <strong className="text-amber text-glow-amber block text-lg mb-3 uppercase tracking-widest">Aucune famille trouvée</strong>
                <span className="text-[13px]">Essayez d'autres termes ou modifiez les filtres actifs.</span>
              </motion.div>
            ) : (
              <div className="max-w-4xl mx-auto pb-20">
                {results.map((r, i) => (
                  <ResultCard key={r.family.id} result={r} rank={i} maxScore={maxScore} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Chatbot selectedModel={selectedModel} />

      {/* SETTINGS MODAL */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />
    </div>
  );
}
