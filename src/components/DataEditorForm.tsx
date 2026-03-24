import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, RotateCcw, Search, Database } from 'lucide-react';
import { DB, updateDB, resetDB, getDB } from '../data';
import { cn } from '../lib/utils';

const ArrayInput = ({ label, value, onChange }: { label: string, value: any, onChange: (v: string[]) => void }) => {
  const safeValue = Array.isArray(value) ? value : [];
  const [localValue, setLocalValue] = useState(safeValue.join(', '));

  useEffect(() => {
    const currentStr = safeValue.join(', ');
    const localArr = localValue.split(',').map(s => s.trim()).filter(Boolean);
    if (currentStr !== localArr.join(', ')) {
      setLocalValue(currentStr);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    onChange(localValue.split(',').map(s => s.trim()).filter(Boolean));
  };

  return (
    <div>
      <label className="block text-[11px] text-muted2 uppercase mb-1">{label}</label>
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Séparé par des virgules..."
        className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-[12px] text-text2 focus:border-amber/50 focus:outline-none"
      />
    </div>
  );
};

const TextInput = ({ label, value, onChange }: { label: string, value: any, onChange: (v: string) => void }) => (
  <div>
    <label className="block text-[11px] text-muted2 uppercase mb-1">{label}</label>
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-[12px] text-text2 focus:border-amber/50 focus:outline-none"
    />
  </div>
);

const BoolInput = ({ label, checked, onChange }: { label: string, checked: any, onChange: (v: boolean) => void }) => (
  <label className="flex items-center gap-2 text-[12px] text-text2 cursor-pointer mt-1">
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onChange(e.target.checked)}
      className="rounded border-white/10 bg-black/40 text-amber2 focus:ring-amber/50 w-4 h-4"
    />
    {label}
  </label>
);

export function DataEditorForm() {
  const [dbState, setDbState] = useState<any>(() => getDB());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync with external DB changes if any
  useEffect(() => {
    const handleDbUpdate = () => setDbState(getDB());
    window.addEventListener('db_updated', handleDbUpdate);
    return () => window.removeEventListener('db_updated', handleDbUpdate);
  }, []);

  const handleSave = () => {
    updateDB(dbState);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Voulez-vous vraiment réinitialiser les données à leur état par défaut ?")) {
      resetDB();
      setDbState(getDB());
      setSelectedIndex(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const addFamily = () => {
    const newFam = {
      id: "nouvelle_famille_" + Date.now(),
      name: "Nouvelle Famille",
      vernacular: "",
      classe: "dicot",
      port: [],
      habitat: [],
      endemic_genera: [],
      tige: { texture: "", latex: false, epines: false, forme: "" },
      feuilles: { type: [], disposition: [], nervation: "", marge: "", stipules: false },
      fleurs: { symetrie: "", pieces: "", ovaire: "", couleur: [] },
      fruits: { type: "", description: "" },
      score_traits: []
    };
    
    setDbState((prev: any) => {
      const safePrev = prev && typeof prev === 'object' && !Array.isArray(prev) ? prev : { version: "1.0", families: [] };
      return { ...safePrev, families: [newFam, ...(safePrev.families || [])] };
    });
    setSelectedIndex(0);
  };

  const deleteFamily = (index: number) => {
    if (window.confirm("Supprimer cette famille ?")) {
      setDbState((prev: any) => {
        const safePrev = prev && typeof prev === 'object' && !Array.isArray(prev) ? prev : { version: "1.0", families: [] };
        const newFamilies = [...(safePrev.families || [])];
        newFamilies.splice(index, 1);
        return { ...safePrev, families: newFamilies };
      });
      setSelectedIndex(null);
    }
  };

  const updateFamily = (index: number, fieldPath: string[], value: any) => {
    setDbState((prev: any) => {
      const safePrev = prev && typeof prev === 'object' && !Array.isArray(prev) ? prev : { version: "1.0", families: [] };
      const newFamilies = JSON.parse(JSON.stringify(safePrev.families || [])); // Deep copy
      let current: any = newFamilies[index];
      if (!current) return safePrev;
      
      for (let i = 0; i < fieldPath.length - 1; i++) {
        if (!current[fieldPath[i]]) current[fieldPath[i]] = {};
        current = current[fieldPath[i]];
      }
      current[fieldPath[fieldPath.length - 1]] = value;
      return { ...safePrev, families: newFamilies };
    });
  };

  const families = (dbState && dbState.families) ? dbState.families : [];
  const selectedFamily = selectedIndex !== null && families[selectedIndex] ? families[selectedIndex] : null;

  const filteredFamilies = families
    .map((f: any, i: number) => ({ f, i }))
    .filter(({ f }: any) => 
      (f.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (f.vernacular || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

  const tige = selectedFamily?.tige || {};
  const feuilles = selectedFamily?.feuilles || {};
  const fleurs = selectedFamily?.fleurs || {};
  const fruits = selectedFamily?.fruits || {};

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-white/10 flex flex-col bg-black/20">
        <div className="p-3 border-b border-white/10 flex flex-col gap-3">
          <div className="flex gap-2">
            <button onClick={handleReset} className="flex-1 px-2 py-1.5 rounded text-[11px] border border-red/30 text-red hover:bg-red/10 flex items-center justify-center gap-1 transition-colors">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <button onClick={handleSave} className="flex-1 px-2 py-1.5 rounded text-[11px] border border-green/30 text-green2 bg-green/10 hover:bg-green/20 flex items-center justify-center gap-1 transition-colors">
              <Save className="w-3 h-3" /> Sauver
            </button>
          </div>
          {saveSuccess && <div className="text-[10px] text-green2 text-center bg-green/10 py-1 rounded border border-green/20">Sauvegardé avec succès !</div>}
          <button onClick={addFamily} className="w-full px-2 py-1.5 rounded text-[11px] border border-amber/30 text-amber2 hover:bg-amber/10 flex items-center justify-center gap-1 transition-colors">
            <Plus className="w-3 h-3" /> Ajouter Famille
          </button>
          <div className="relative">
            <Search className="w-3 h-3 absolute left-2 top-2.5 text-muted" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="w-full bg-black/40 border border-white/10 rounded p-1.5 pl-7 text-[12px] text-text2 focus:outline-none focus:border-amber/50" 
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filteredFamilies.map(({ f, i }: any) => (
            <button 
              key={f.id || i} 
              onClick={() => setSelectedIndex(i)} 
              className={cn(
                "w-full text-left px-3 py-2 rounded text-[12px] truncate transition-colors", 
                selectedIndex === i ? "bg-amber/20 text-amber2 border border-amber/20" : "hover:bg-white/5 text-text2 border border-transparent"
              )}
            >
              {f.name || 'Nouvelle Famille'}
              {f.vernacular && <span className="text-muted block text-[10px] truncate">{f.vernacular}</span>}
            </button>
          ))}
          {filteredFamilies.length === 0 && (
            <div className="text-center text-muted text-[11px] mt-4">Aucun résultat</div>
          )}
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-black/10">
        {selectedFamily ? (
          <div className="space-y-6 max-w-2xl mx-auto pb-10">
            <div className="flex justify-between items-center border-b border-white/10 pb-3 sticky top-0 bg-bg2/90 backdrop-blur-md z-10 pt-2">
              <h3 className="text-amber2 font-bold text-[16px] flex items-center gap-2">
                Éditer : {selectedFamily.name || 'Nouvelle Famille'}
              </h3>
              <button onClick={() => deleteFamily(selectedIndex!)} className="text-red hover:bg-red/10 px-2 py-1.5 rounded transition-colors flex items-center gap-1 text-[11px] border border-red/20">
                <Trash2 className="w-3 h-3" /> Supprimer
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextInput label="ID" value={selectedFamily.id} onChange={(v) => updateFamily(selectedIndex!, ['id'], v)} />
              <TextInput label="Nom (Latin)" value={selectedFamily.name} onChange={(v) => updateFamily(selectedIndex!, ['name'], v)} />
              <TextInput label="Nom Vernaculaire" value={selectedFamily.vernacular} onChange={(v) => updateFamily(selectedIndex!, ['vernacular'], v)} />
              <div>
                <label className="block text-[11px] text-muted2 uppercase mb-1">Classe</label>
                <select 
                  value={selectedFamily.classe || 'dicot'} 
                  onChange={(e) => updateFamily(selectedIndex!, ['classe'], e.target.value)} 
                  className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-[12px] text-text2 focus:border-amber/50 focus:outline-none"
                >
                  <option value="dicot">Dicotylédone</option>
                  <option value="monocot">Monocotylédone</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
              <h4 className="text-[13px] font-bold text-green2 border-b border-white/10 pb-2">Général</h4>
              <ArrayInput label="Port (ex: arbre, liane)" value={selectedFamily.port} onChange={(v) => updateFamily(selectedIndex!, ['port'], v)} />
              <ArrayInput label="Habitat" value={selectedFamily.habitat} onChange={(v) => updateFamily(selectedIndex!, ['habitat'], v)} />
              <ArrayInput label="Genres Endémiques" value={selectedFamily.endemic_genera} onChange={(v) => updateFamily(selectedIndex!, ['endemic_genera'], v)} />
              <ArrayInput label="Mots-clés (Score Traits)" value={selectedFamily.score_traits} onChange={(v) => updateFamily(selectedIndex!, ['score_traits'], v)} />
            </div>

            <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
              <h4 className="text-[13px] font-bold text-green2 border-b border-white/10 pb-2">Tige</h4>
              <div className="grid grid-cols-2 gap-4">
                <TextInput label="Texture" value={tige.texture} onChange={(v) => updateFamily(selectedIndex!, ['tige', 'texture'], v)} />
                <TextInput label="Forme" value={tige.forme} onChange={(v) => updateFamily(selectedIndex!, ['tige', 'forme'], v)} />
                <div className="col-span-2">
                  <TextInput label="Note" value={tige.note} onChange={(v) => updateFamily(selectedIndex!, ['tige', 'note'], v)} />
                </div>
                <div className="flex gap-6 col-span-2">
                  <BoolInput label="Présence de Latex" checked={tige.latex} onChange={(v) => updateFamily(selectedIndex!, ['tige', 'latex'], v)} />
                  <BoolInput label="Présence d'Épines" checked={tige.epines} onChange={(v) => updateFamily(selectedIndex!, ['tige', 'epines'], v)} />
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
              <h4 className="text-[13px] font-bold text-green2 border-b border-white/10 pb-2">Feuilles</h4>
              <div className="grid grid-cols-2 gap-4">
                <ArrayInput label="Type" value={feuilles.type} onChange={(v) => updateFamily(selectedIndex!, ['feuilles', 'type'], v)} />
                <ArrayInput label="Disposition" value={feuilles.disposition} onChange={(v) => updateFamily(selectedIndex!, ['feuilles', 'disposition'], v)} />
                <TextInput label="Nervation" value={feuilles.nervation} onChange={(v) => updateFamily(selectedIndex!, ['feuilles', 'nervation'], v)} />
                <TextInput label="Marge" value={feuilles.marge} onChange={(v) => updateFamily(selectedIndex!, ['feuilles', 'marge'], v)} />
                <div className="col-span-2">
                  <TextInput label="Note" value={feuilles.note} onChange={(v) => updateFamily(selectedIndex!, ['feuilles', 'note'], v)} />
                </div>
                <div className="col-span-2">
                  <BoolInput label="Présence de Stipules" checked={feuilles.stipules} onChange={(v) => updateFamily(selectedIndex!, ['feuilles', 'stipules'], v)} />
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
              <h4 className="text-[13px] font-bold text-green2 border-b border-white/10 pb-2">Fleurs</h4>
              <div className="grid grid-cols-2 gap-4">
                <TextInput label="Symétrie" value={fleurs.symetrie} onChange={(v) => updateFamily(selectedIndex!, ['fleurs', 'symetrie'], v)} />
                <TextInput label="Pièces" value={fleurs.pieces} onChange={(v) => updateFamily(selectedIndex!, ['fleurs', 'pieces'], v)} />
                <TextInput label="Ovaire" value={fleurs.ovaire} onChange={(v) => updateFamily(selectedIndex!, ['fleurs', 'ovaire'], v)} />
                <ArrayInput label="Couleurs" value={fleurs.couleur} onChange={(v) => updateFamily(selectedIndex!, ['fleurs', 'couleur'], v)} />
              </div>
            </div>

            <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
              <h4 className="text-[13px] font-bold text-green2 border-b border-white/10 pb-2">Fruits</h4>
              <div className="grid grid-cols-2 gap-4">
                <TextInput label="Type" value={fruits.type} onChange={(v) => updateFamily(selectedIndex!, ['fruits', 'type'], v)} />
                <TextInput label="Description" value={fruits.description} onChange={(v) => updateFamily(selectedIndex!, ['fruits', 'description'], v)} />
              </div>
            </div>

            <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
              <h4 className="text-[13px] font-bold text-green2 border-b border-white/10 pb-2">Photos (URLs)</h4>
              <div className="grid grid-cols-1 gap-4">
                <TextInput label="URL Photo Feuille" value={selectedFamily.images?.feuille || ''} onChange={(v) => updateFamily(selectedIndex!, ['images', 'feuille'], v)} />
                <TextInput label="URL Photo Fleur" value={selectedFamily.images?.fleur || ''} onChange={(v) => updateFamily(selectedIndex!, ['images', 'fleur'], v)} />
                <TextInput label="URL Photo Fruit" value={selectedFamily.images?.fruit || ''} onChange={(v) => updateFamily(selectedIndex!, ['images', 'fruit'], v)} />
              </div>
            </div>

          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-muted2 text-[13px] gap-4">
            <Database className="w-12 h-12 text-white/5" />
            <p>Sélectionnez une famille dans la liste pour l'éditer,<br/>ou ajoutez-en une nouvelle.</p>
          </div>
        )}
      </div>
    </div>
  );
}
