import fs from 'fs';

const families = [
  "Fabaceae", "Euphorbiaceae", "Rubiaceae", "Apocynaceae", "Poaceae",
  "Orchidaceae", "Arecaceae", "Moraceae", "Acanthaceae", "Lamiaceae",
  "Asteraceae", "Malvaceae", "Anacardiaceae", "Sapindaceae", "Myrtaceae",
  "Convolvulaceae", "Solanaceae", "Cyperaceae", "Zingiberaceae", "Piperaceae",
  "Verbenaceae", "Capparaceae", "Combretaceae", "Rhizophoraceae", "Meliaceae",
  "Bignoniaceae", "Araliaceae", "Apiaceae", "Crassulaceae", "Clusiaceae",
  "Sapotaceae", "Ebenaceae"
];

async function fetchImage(query) {
  try {
    const res = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&titles=${query}&prop=pageimages&format=json&pithumbsize=800`);
    const data = await res.json();
    const pages = data.query?.pages;
    if (pages) {
      const pageId = Object.keys(pages)[0];
      if (pages[pageId]?.thumbnail?.source) {
        return pages[pageId].thumbnail.source;
      }
    }
    
    const resEn = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${query}&prop=pageimages&format=json&pithumbsize=800`);
    const dataEn = await resEn.json();
    const pagesEn = dataEn.query?.pages;
    if (pagesEn) {
      const pageIdEn = Object.keys(pagesEn)[0];
      if (pagesEn[pageIdEn]?.thumbnail?.source) {
        return pagesEn[pageIdEn].thumbnail.source;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

async function run() {
  let dataFile = fs.readFileSync('src/data.ts', 'utf-8');
  
  for (const family of families) {
    console.log(`Fetching for ${family}...`);
    // Try to get specific images, if not fallback to general family image
    const main = await fetchImage(family);
    const feuille = await fetchImage(`${family} leaf`) || main;
    const fleur = await fetchImage(`${family} flower`) || main;
    const fruit = await fetchImage(`${family} fruit`) || main;
    
    const imagesObj = {
      feuille: feuille || "",
      fleur: fleur || "",
      fruit: fruit || ""
    };
    
    // Find the family object in dataFile and replace its images object
    const regex = new RegExp(`(name:\\s*"${family}"[\\s\\S]*?images:\\s*\\{)[\\s\\S]*?(\\})`, 'g');
    dataFile = dataFile.replace(regex, `$1\n        feuille: "${imagesObj.feuille}",\n        fleur: "${imagesObj.fleur}",\n        fruit: "${imagesObj.fruit}"\n      $2`);
  }
  
  fs.writeFileSync('src/data.ts', dataFile);
  console.log('Done updating images!');
}

run();
