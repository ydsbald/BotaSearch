import { DB } from './data';

export const WEIGHT = {
  fruit: 4,
  fleur: 3,
  feuille: 2,
  tige: 1,
  general: 1.5
};

export const KEYWORD_MAP: Record<string, { field: string, match: (f: any) => boolean }> = {
  // Fruits
  "capsule": { field: "fruit", match: (f) => f.fruits.type === "capsule" },
  "baie": { field: "fruit", match: (f) => f.fruits.type === "baie" },
  "drupe": { field: "fruit", match: (f) => f.fruits.type === "drupe" },
  "gousse": { field: "fruit", match: (f) => f.fruits.type === "gousse" },
  "follicule": { field: "fruit", match: (f) => f.fruits.type === "follicule" },
  "akène": { field: "fruit", match: (f) => f.fruits.type === "akène" },
  "silique": { field: "fruit", match: (f) => f.fruits.type === "silique" },
  "caryopse": { field: "fruit", match: (f) => f.fruits.type === "caryopse" },
  "sycone": { field: "fruit", match: (f) => f.fruits.type === "sycone" },
  "péponide": { field: "fruit", match: (f) => f.fruits.type === "péponide" },
  "hespéride": { field: "fruit", match: (f) => f.fruits.type === "hespéride" },
  // Flowers
  "zygomorphe": { field: "fleur", match: (f) => f.fleurs.symetrie.includes("zygomorphe") },
  "actinomorphe": { field: "fleur", match: (f) => f.fleurs.symetrie.includes("actinomorphe") },
  "bilabiée": { field: "fleur", match: (f) => f.fleurs.pieces.includes("bilabiée") || f.score_traits.some((t: string) => t.includes("bilabiée")) },
  "infère": { field: "fleur", match: (f) => f.fleurs.ovaire === "infère" },
  "supère": { field: "fleur", match: (f) => f.fleurs.ovaire === "supère" },
  "ovaire infère": { field: "fleur", match: (f) => f.fleurs.ovaire === "infère" },
  "ovaire supère": { field: "fleur", match: (f) => f.fleurs.ovaire === "supère" },
  "ombelle": { field: "fleur", match: (f) => f.score_traits.some((t: string) => t.includes("ombelle")) },
  "capitule": { field: "fleur", match: (f) => f.score_traits.some((t: string) => t.includes("capitule")) },
  "spadice": { field: "fleur", match: (f) => f.score_traits.some((t: string) => t.includes("spadice")) },
  "spathe": { field: "fleur", match: (f) => f.score_traits.some((t: string) => t.includes("spathe")) },
  "labelle": { field: "fleur", match: (f) => f.score_traits.some((t: string) => t.includes("labelle")) },
  "éperon": { field: "fleur", match: (f) => f.score_traits.some((t: string) => t.includes("éperon")) },
  // Leaves
  "composée": { field: "feuille", match: (f) => f.feuilles.type.some((t: string) => t.includes("composée")) },
  "composée pennée": { field: "feuille", match: (f) => f.feuilles.type.some((t: string) => t.includes("composée pennée")) },
  "composée palmée": { field: "feuille", match: (f) => f.feuilles.type.some((t: string) => t.includes("composée palmée")) },
  "composée bipennée": { field: "feuille", match: (f) => f.feuilles.type.some((t: string) => t.includes("bipennée")) },
  "simple": { field: "feuille", match: (f) => f.feuilles.type.includes("simple") },
  "opposée": { field: "feuille", match: (f) => f.feuilles.disposition.some((d: string) => d.includes("opposée")) },
  "alterne": { field: "feuille", match: (f) => f.feuilles.disposition.some((d: string) => d.includes("alterne")) },
  "verticillée": { field: "feuille", match: (f) => f.feuilles.disposition.some((d: string) => d.includes("verticillée")) },
  "parallèle": { field: "feuille", match: (f) => f.feuilles.nervation === "parallèle" },
  "nervation parallèle": { field: "feuille", match: (f) => f.feuilles.nervation === "parallèle" },
  "pennée": { field: "feuille", match: (f) => f.feuilles.nervation === "pennée" },
  "palmée": { field: "feuille", match: (f) => f.feuilles.nervation === "palmée" },
  "nervation palmée": { field: "feuille", match: (f) => f.feuilles.nervation === "palmée" },
  "stipules": { field: "feuille", match: (f) => f.feuilles.stipules === true },
  "feuilles opposées": { field: "feuille", match: (f) => f.feuilles.disposition.some((d: string) => d.includes("opposée")) },
  "feuilles composées": { field: "feuille", match: (f) => f.feuilles.type.some((t: string) => t.includes("composée")) },
  // Stem
  "latex": { field: "tige", match: (f) => f.tige.latex === true },
  "quadrangulaire": { field: "tige", match: (f) => f.tige.forme === "quadrangulaire" },
  "tige quadrangulaire": { field: "tige", match: (f) => f.tige.forme === "quadrangulaire" },
  "triangulaire": { field: "tige", match: (f) => f.tige.forme === "triangulaire" },
  "tige triangulaire": { field: "tige", match: (f) => f.tige.forme === "triangulaire" },
  "épines": { field: "tige", match: (f) => f.tige.epines === true },
  "ligneuse": { field: "tige", match: (f) => f.tige.texture === "ligneuse" },
  "herbacée": { field: "general", match: (f) => f.tige.texture === "herbacée" },
  "aromatique": { field: "tige", match: (f) => f.score_traits.some((t: string) => t.includes("aromatique")) },
  // Habit/habitat
  "arbre": { field: "general", match: (f) => f.port.includes("arbre") },
  "arbuste": { field: "general", match: (f) => f.port.includes("arbuste") },
  "liane": { field: "general", match: (f) => f.port.includes("liane") },
  "épiphyte": { field: "general", match: (f) => f.port.includes("épiphyte") },
  "monocot": { field: "general", match: (f) => f.classe === "monocot" },
  "dicot": { field: "general", match: (f) => f.classe === "dicot" },
  "forêt humide": { field: "general", match: (f) => f.habitat.some((h: string) => h.includes("forêt humide")) },
  "forêt sèche": { field: "general", match: (f) => f.habitat.some((h: string) => h.includes("forêt sèche")) },
  "littoral": { field: "general", match: (f) => f.habitat.some((h: string) => h.includes("littoral")) },
  "montagne": { field: "general", match: (f) => f.habitat.some((h: string) => h.includes("montagne")) },
  "mangrove": { field: "general", match: (f) => f.habitat.some((h: string) => h.includes("mangrove")) },
  "marais": { field: "general", match: (f) => f.habitat.some((h: string) => h.includes("marais")) },
  "savane": { field: "general", match: (f) => f.habitat.some((h: string) => h.includes("savane")) },
  "succulente": { field: "general", match: (f) => f.port.includes("succulent") || f.score_traits.some((t: string) => t.includes("succulente")) },
  "carnivore": { field: "general", match: (f) => f.score_traits.some((t: string) => t.includes("carnivore")) },
  "parasite": { field: "general", match: (f) => f.port.includes("parasite") || f.score_traits.some((t: string) => t.includes("parasite")) },
  "vrilles": { field: "general", match: (f) => f.score_traits.some((t: string) => t.includes("vrilles")) },
  "aquatique": { field: "general", match: (f) => f.score_traits.some((t: string) => t.includes("aquatique") || t.includes("flottant")) },
};

export function tokenize(query: string) {
  const q = query.toLowerCase().trim();
  const tokens: string[] = [];
  const words = q.split(/\s+/);
  let i = 0;
  while (i < words.length) {
    let matched = false;
    if (i + 2 < words.length) {
      const tri = words.slice(i, i + 3).join(" ");
      if (KEYWORD_MAP[tri]) { tokens.push(tri); i += 3; matched = true; }
    }
    if (!matched && i + 1 < words.length) {
      const bi = words[i] + " " + words[i + 1];
      if (KEYWORD_MAP[bi]) { tokens.push(bi); i += 2; matched = true; }
    }
    if (!matched) {
      tokens.push(words[i]);
      i++;
    }
  }
  return [...new Set(tokens)];
}

export function scoreFamily(family: any, tokens: string[]) {
  let score = 0;
  const matchedTraits: string[] = [];

  for (const token of tokens) {
    if (KEYWORD_MAP[token]) {
      if (KEYWORD_MAP[token].match(family)) {
        const w = (WEIGHT as any)[KEYWORD_MAP[token].field] || 1;
        score += w * 10;
        matchedTraits.push(token);
      }
    }
    for (const trait of family.score_traits) {
      if (trait.toLowerCase().includes(token) && !matchedTraits.includes(trait)) {
        const w = WEIGHT.general;
        score += w * 6;
        matchedTraits.push(trait);
      }
    }
    if (family.name.toLowerCase().includes(token) || family.vernacular.toLowerCase().includes(token)) {
      score += 8;
      if (!matchedTraits.includes(family.name)) matchedTraits.push(family.name);
    }
    for (const g of family.endemic_genera) {
      if (g.toLowerCase().includes(token)) {
        score += 7;
        if (!matchedTraits.includes(g)) matchedTraits.push(g);
      }
    }
  }
  return { score, matchedTraits: [...new Set(matchedTraits)] };
}

export function applyFilter(family: any, activeFilter: string) {
  if (activeFilter === "all") return true;
  if (activeFilter === "monocot") return family.classe === "monocot";
  if (activeFilter === "dicot") return family.classe === "dicot";
  if (["arbre", "arbuste", "liane", "herbacée"].includes(activeFilter)) return family.port.includes(activeFilter);
  return family.habitat.some((h: string) => h.includes(activeFilter));
}

export function search(query: string, activeFilter: string) {
  const tokens = tokenize(query);
  if (!tokens.length && query.trim()) return [];

  let results = DB.families
    .filter(f => applyFilter(f, activeFilter))
    .map(f => {
      const { score, matchedTraits } = scoreFamily(f, tokens);
      return { family: f, score, matchedTraits };
    });

  if (query.trim()) {
    results = results.filter(r => r.score > 0);
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

export function getSuggestions(results: any[], tokens: string[]) {
  if (!results.length) return [];
  
  const topFamilies = results.slice(0, 10).map(r => r.family);
  
  const discriminants = [
    { label: "fruit capsule", key: "capsule" },
    { label: "fruit baie", key: "baie" },
    { label: "fruit drupe", key: "drupe" },
    { label: "fruit gousse", key: "gousse" },
    { label: "fruit follicule", key: "follicule" },
    { label: "ovaire infère", key: "infère" },
    { label: "ovaire supère", key: "supère" },
    { label: "latex", key: "latex" },
    { label: "feuilles opposées", key: "opposée" },
    { label: "tige quadrangulaire", key: "quadrangulaire" },
    { label: "stipules", key: "stipules" },
    { label: "composée pennée", key: "composée pennée" },
    { label: "nervation parallèle", key: "parallèle" },
    { label: "zygomorphe", key: "zygomorphe" },
    { label: "bilabiée", key: "bilabiée" },
    { label: "aromatique", key: "aromatique" },
  ];
  
  return discriminants
    .filter(d => !tokens.includes(d.key))
    .map(d => {
      const count = topFamilies.filter(f => KEYWORD_MAP[d.key]?.match(f)).length;
      return { label: d.label, count, key: d.key };
    })
    .filter(d => d.count > 0 && d.count < topFamilies.length)
    .sort((a, b) => {
      const mid = topFamilies.length / 2;
      return Math.abs(a.count - mid) - Math.abs(b.count - mid);
    })
    .slice(0, 8);
}
