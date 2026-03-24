import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Leaf, Flower, Cherry, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export function ResultCard({ result, rank, maxScore }: { result: any, rank: number, maxScore: number, key?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  
  const { family: f, score, matchedTraits } = result;
  const pct = Math.round((score / maxScore) * 100);
  const isTop = rank === 0;
  
  const scoreColor = pct > 70 ? 'text-green2' : pct > 40 ? 'text-amber2' : 'text-muted2';
  const scoreBg = pct > 70 ? 'from-green to-green2' : pct > 40 ? 'from-amber to-amber2' : 'from-muted to-muted2';

  useEffect(() => {
    if (isOpen && !imageUrl && !imageLoading) {
      setImageLoading(true);
      // Try French Wikipedia first, then fallback to English if needed
      fetch(`https://fr.wikipedia.org/w/api.php?action=query&titles=${f.name}&prop=pageimages&format=json&pithumbsize=400&origin=*`)
        .then(res => res.json())
        .then(data => {
          const pages = data.query?.pages;
          if (pages) {
            const pageId = Object.keys(pages)[0];
            if (pages[pageId]?.thumbnail?.source) {
              setImageUrl(pages[pageId].thumbnail.source);
              setImageLoading(false);
              return;
            }
          }
          // Fallback to English Wikipedia
          return fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${f.name}&prop=pageimages&format=json&pithumbsize=400&origin=*`)
            .then(res => res.json())
            .then(dataEn => {
              const pagesEn = dataEn.query?.pages;
              if (pagesEn) {
                const pageIdEn = Object.keys(pagesEn)[0];
                if (pagesEn[pageIdEn]?.thumbnail?.source) {
                  setImageUrl(pagesEn[pageIdEn].thumbnail.source);
                }
              }
              setImageLoading(false);
            });
        })
        .catch(err => {
          console.error("Error fetching image:", err);
          setImageLoading(false);
        });
    }
  }, [isOpen, f.name, imageUrl, imageLoading]);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.05, duration: 0.4, ease: "easeOut" }}
      className={cn(
        "mb-4 glass-panel rounded-xl overflow-hidden transition-all duration-300 group",
        isTop ? "border-green/40 shadow-[0_0_30px_rgba(126,179,86,0.1)]" : "hover:border-border2 hover:shadow-lg"
      )}
    >
      <div 
        className="flex items-center gap-4 p-5 cursor-pointer select-none relative overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isTop && (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green/5 to-transparent pointer-events-none" />
        )}
        
        <div className={cn(
          "text-[11px] w-6 text-right font-bold tracking-widest", 
          isTop ? "text-green2 text-glow" : "text-muted"
        )}>
          {rank + 1 < 10 ? `0${rank + 1}` : rank + 1}
        </div>
        
        <div className="flex-1">
          <div className="flex items-baseline gap-3">
            <div className={cn(
              "font-serif italic text-2xl leading-none font-light tracking-wide", 
              isTop ? "text-green3 text-glow" : "text-text group-hover:text-green2 transition-colors"
            )}>
              {f.name}
            </div>
            <div className="text-xs text-muted2 tracking-wider uppercase">{f.vernacular}</div>
          </div>
        </div>
        
        <div className="hidden md:flex gap-2 items-center flex-wrap justify-end">
          <span className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] tracking-widest border uppercase font-bold",
            f.classe === 'monocot' ? "text-green3 border-green3/30 bg-green3/10" : "text-amber2 border-amber2/30 bg-amber2/10"
          )}>
            {f.classe}
          </span>
          {f.port.slice(0, 2).map((p: string) => (
            <span key={p} className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest border text-muted2 border-border uppercase">
              {p}
            </span>
          ))}
          <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest border text-green2 border-green2/30 bg-green2/10 uppercase">
            {f.habitat[0]}
          </span>
        </div>
        
        <div className={cn("p-1.5 rounded-full transition-colors duration-300", isOpen ? "bg-text/10" : "bg-transparent group-hover:bg-text/5")}>
          <ChevronRight className={cn("w-5 h-5 text-muted transition-transform duration-300", isOpen && "rotate-90 text-text")} />
        </div>
      </div>

      {matchedTraits.length > 0 && (
        <div className="px-5 pb-3 flex gap-2 flex-wrap">
          {matchedTraits.slice(0, 6).map((t: string) => (
            <span key={t} className="px-2.5 py-1 bg-green/10 border border-green/30 rounded-md text-[10px] text-green2 tracking-wide flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-green2 animate-pulse" /> {t}
            </span>
          ))}
        </div>
      )}

      <div className="px-5 pb-4">
        <div className="flex justify-between text-[10px] text-muted mb-2 tracking-widest uppercase font-bold">
          <span className={scoreColor}>Score [{score.toFixed(0)}]</span>
          <span>{pct}% Match</span>
        </div>
        <div className="h-1 bg-bg/50 rounded-full overflow-hidden border border-border/50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: rank * 0.1 }}
            className={cn("h-full rounded-full bg-gradient-to-r relative", scoreBg)}
          >
            <div className="absolute inset-0 bg-text/20 w-full h-full animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/50 bg-bg3/50"
          >
            <div className="p-5">
              {/* Mobile Badges (only show if hidden on desktop) */}
              <div className="flex md:hidden gap-2 items-center flex-wrap mb-4">
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] tracking-widest border uppercase font-bold",
                  f.classe === 'monocot' ? "text-green3 border-green3/30 bg-green3/10" : "text-amber2 border-amber2/30 bg-amber2/10"
                )}>
                  {f.classe}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest border text-green2 border-green2/30 bg-green2/10 uppercase">
                  {f.habitat[0]}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TraitGroup title="Tige" icon={<Leaf className="w-3 h-3" />} traits={[
                  { key: "texture", val: f.tige.texture },
                  { key: "forme", val: f.tige.forme },
                  { key: "latex", val: f.tige.latex ? 'OUI' : 'non', highlight: f.tige.latex },
                  { key: "épines", val: f.tige.epines ? 'OUI' : 'non' },
                  f.tige.note && { key: "note", val: f.tige.note, italic: true }
                ].filter(Boolean)} />
                
                <TraitGroup title="Feuilles" icon={<Leaf className="w-3 h-3" />} traits={[
                  { key: "type", val: f.feuilles.type.join(", ") },
                  { key: "disposition", val: f.feuilles.disposition.join(", ") },
                  { key: "nervation", val: f.feuilles.nervation },
                  { key: "marge", val: f.feuilles.marge },
                  { key: "stipules", val: f.feuilles.stipules ? 'OUI' : 'non' }
                ]} />
                
                <TraitGroup title="Fleurs" icon={<Flower className="w-3 h-3" />} traits={[
                  { key: "symétrie", val: f.fleurs.symetrie },
                  { key: "pièces", val: f.fleurs.pieces },
                  { key: "ovaire", val: f.fleurs.ovaire, highlight: true },
                  { key: "couleurs", val: f.fleurs.couleur.join(", ") }
                ]} />
                
                <TraitGroup title="Fruits" icon={<Cherry className="w-3 h-3" />} traits={[
                  { key: "type", val: f.fruits.type, highlight: true },
                  { key: "descr.", val: f.fruits.description, italic: true }
                ]} />
              </div>

              <div className="flex gap-3 py-4 mt-4 border-t border-border/50">
                {imageUrl ? (
                  <div className="relative w-32 h-32 shrink-0 rounded-lg overflow-hidden border border-border group">
                    <img 
                      src={imageUrl} 
                      alt={`Photo de ${f.name}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                      <span className="text-[10px] text-white font-mono tracking-widest uppercase truncate">{f.name}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {imageLoading ? (
                      <div className="w-32 h-32 shrink-0 bg-bg/50 border border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-[10px] text-muted">
                        <div className="w-5 h-5 border-2 border-green2/30 border-t-green2 rounded-full animate-spin" />
                        <span className="tracking-widest uppercase">Recherche...</span>
                      </div>
                    ) : (
                      <div className="w-32 shrink-0 flex">
                        <ImagePlaceholder icon={<ImageIcon className="w-5 h-5" />} label="Photo" />
                      </div>
                    )}
                  </>
                )}
                <div className="flex gap-3 flex-1">
                  {f.images?.feuille ? (
                    <TraitImage url={f.images.feuille} icon={<Leaf className="w-4 h-4" />} label="Feuille" />
                  ) : (
                    <ImagePlaceholder icon={<Leaf className="w-5 h-5" />} label="Feuille" />
                  )}
                  {f.images?.fleur ? (
                    <TraitImage url={f.images.fleur} icon={<Flower className="w-4 h-4" />} label="Fleur" />
                  ) : (
                    <ImagePlaceholder icon={<Flower className="w-5 h-5" />} label="Fleur" />
                  )}
                  {f.images?.fruit ? (
                    <TraitImage url={f.images.fruit} icon={<Cherry className="w-4 h-4" />} label="Fruit" />
                  ) : (
                    <ImagePlaceholder icon={<Cherry className="w-5 h-5" />} label="Fruit" />
                  )}
                </div>
              </div>

              <div className="pt-4 pb-2 border-t border-border/50">
                <span className="text-muted2 text-[10px] tracking-[0.2em] uppercase block mb-2">Genres endémiques majeurs</span>
                <span className="text-text2 italic font-serif text-lg tracking-wide">{f.endemic_genera.join(", ")}</span>
              </div>

              <div className="flex gap-2 flex-wrap pt-4">
                {f.habitat.map((h: string) => (
                  <span key={h} className="text-[10px] text-muted2 border border-border/50 bg-bg3/50 px-3 py-1 rounded-full uppercase tracking-widest">
                    📍 {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TraitGroup({ title, icon, traits }: { title: string, icon: React.ReactNode, traits: any[] }) {
  return (
    <div className="bg-bg/50 border border-border/50 p-4 rounded-lg hover:border-border transition-colors">
      <div className="text-[10px] tracking-[0.2em] text-amber uppercase mb-3 flex items-center gap-2 font-bold">
        {icon} {title}
      </div>
      <div className="space-y-1.5">
        {traits.map((t, i) => (
          <div key={i} className="flex gap-3 items-start text-[11px] text-text2 leading-relaxed">
            <span className="text-muted2 min-w-[80px] tracking-wide">{t.key}</span>
            <span className={cn("text-text", t.highlight && "text-green2 font-bold text-glow", t.italic && "text-muted2 italic")}>
              {t.val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImagePlaceholder({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex-1 h-32 bg-bg/50 border border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-[10px] text-muted cursor-pointer hover:border-green/50 hover:text-green2 hover:bg-green/5 transition-all duration-300 group">
      <div className="group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <span className="tracking-widest uppercase">{label}</span>
    </div>
  );
}

function TraitImage({ url, icon, label }: { url: string, icon: React.ReactNode, label: string }) {
  const [error, setError] = useState(false);
  
  if (error || !url) {
    return <ImagePlaceholder icon={icon} label={label} />;
  }

  return (
    <div className="flex-1 h-32 relative rounded-lg overflow-hidden border border-border group bg-bg/50">
      <img 
        src={url} 
        alt={label} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
        <span className="text-[10px] text-white font-mono tracking-widest uppercase flex items-center gap-1">
          {icon} {label}
        </span>
      </div>
    </div>
  );
}
