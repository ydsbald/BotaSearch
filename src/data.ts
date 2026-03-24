export const DEFAULT_DB = {
  version: "1.0",
  families: [
    {
      id: "fabaceae",
      name: "Fabaceae",
      vernacular: "Légumineuses",
      classe: "dicot",
      port: ["arbre", "arbuste", "liane", "herbacée"],
      habitat: ["forêt humide", "forêt sèche", "savane"],
      endemic_genera: ["Dalbergia", "Crotalaria", "Mimosa", "Acacia"],
      tige: { texture: "ligneuse", latex: false, epines: true, forme: "cylindrique" },
      feuilles: { type: ["composée pennée", "composée bipennée", "composée palmée"], disposition: ["alterne"], nervation: "pennée", marge: "entière", stipules: true },
      fleurs: { symetrie: "zygomorphe", pieces: "5 pétales (papilionacée)", ovaire: "supère", couleur: ["jaune", "violet", "blanc", "rose"] },
      fruits: { type: "gousse", description: "légume déhiscent" },
      images: {
        feuille: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Mimosa_pudica_leaves.jpg/400px-Mimosa_pudica_leaves.jpg",
        fleur: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Lathyrus_odoratus_flower.jpg/400px-Lathyrus_odoratus_flower.jpg",
        fruit: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Peas_in_pods_-_Studio.jpg/400px-Peas_in_pods_-_Studio.jpg"
      },
      score_traits: ["gousse", "légumineuse", "papilionacée", "stipules", "composée", "légume", "dalbergia"]
    },
    {
      id: "euphorbiaceae",
      name: "Euphorbiaceae",
      vernacular: "Euphorbiacées",
      classe: "dicot",
      port: ["arbre", "arbuste", "herbacée", "succulent"],
      habitat: ["forêt sèche", "forêt humide", "bush épineux"],
      endemic_genera: ["Euphorbia", "Croton", "Macaranga", "Uapaca"],
      tige: { texture: "ligneuse", latex: true, epines: true, forme: "cylindrique" },
      feuilles: { type: ["simple"], disposition: ["alterne", "opposée"], nervation: "pennée", marge: "dentée", stipules: true },
      fleurs: { symetrie: "actinomorphe", pieces: "réduites (cyathe chez Euphorbia)", ovaire: "supère", couleur: ["vert", "jaune"] },
      fruits: { type: "capsule", description: "schizocarpique, 3-loges" },
      images: {
        feuille: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Hevea_brasiliensis_leaves.jpg/400px-Hevea_brasiliensis_leaves.jpg",
        fleur: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Euphorbia_milii_flowers.jpg/400px-Euphorbia_milii_flowers.jpg",
        fruit: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ricinus_communis_fruit.jpg/400px-Ricinus_communis_fruit.jpg"
      },
      score_traits: ["latex", "capsule", "cyathe", "euphorbe", "latex blanc", "croton", "macaranga"]
    },
    {
      id: "rubiaceae",
      name: "Rubiaceae",
      vernacular: "Rubiacées",
      classe: "dicot",
      port: ["arbre", "arbuste", "liane", "herbacée"],
      habitat: ["forêt humide", "forêt sèche"],
      endemic_genera: ["Coffea", "Gardenia", "Ixora", "Psychotria"],
      tige: { texture: "ligneuse", latex: false, epines: false, forme: "cylindrique" },
      feuilles: { type: ["simple"], disposition: ["opposée", "verticillée"], nervation: "pennée", marge: "entière", stipules: true, stipules_note: "stipules interpétiolaires caractéristiques" },
      fleurs: { symetrie: "actinomorphe", pieces: "4-5 pétales soudés", ovaire: "infère", couleur: ["blanc", "rouge", "jaune", "rose"] },
      fruits: { type: "baie", description: "drupe ou capsule" },
      images: {
        feuille: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Coffea_arabica_leaves.jpg/400px-Coffea_arabica_leaves.jpg",
        fleur: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Coffea_arabica_flower.jpg/400px-Coffea_arabica_flower.jpg",
        fruit: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Coffea_arabica_fruits.jpg/400px-Coffea_arabica_fruits.jpg"
      },
      score_traits: ["stipules interpétiolaires", "ovaire infère", "feuilles opposées", "baie", "café", "coffea", "gardenia"]
    },
    {
      id: "apocynaceae",
      name: "Apocynaceae",
      vernacular: "Apocynacées",
      classe: "dicot",
      port: ["arbre", "arbuste", "liane", "herbacée"],
      habitat: ["forêt humide", "forêt sèche", "littoral"],
      endemic_genera: ["Pachypodium", "Catharanthus", "Cerbera", "Allamanda"],
      tige: { texture: "ligneuse", latex: true, epines: true, forme: "cylindrique" },
      feuilles: { type: ["simple"], disposition: ["opposée", "verticillée", "alterne"], nervation: "pennée", marge: "entière", stipules: false },
      fleurs: { symetrie: "actinomorphe", pieces: "5 pétales soudés (corolle tubulaire)", ovaire: "supère", couleur: ["blanc", "rose", "jaune", "rouge"] },
      fruits: { type: "follicule", description: "2 follicules ou drupe" },
      score_traits: ["latex", "follicule", "feuilles opposées", "corolle tubulaire", "pachypodium", "catharanthus", "cerbera"]
    },
    {
      id: "poaceae",
      name: "Poaceae",
      vernacular: "Graminées",
      classe: "monocot",
      port: ["herbacée"],
      habitat: ["savane", "prairie", "zone humide", "littoral"],
      endemic_genera: ["Panicum", "Aristida", "Cymbopogon", "Bambusa"],
      tige: { texture: "herbacée", latex: false, epines: false, forme: "cylindrique", note: "chaume creux, noeuds" },
      feuilles: { type: ["simple"], disposition: ["alterne"], nervation: "parallèle", marge: "entière", stipules: false, note: "ligule présente" },
      fleurs: { symetrie: "non applicable", pieces: "glumelles, glumelles, glumes", ovaire: "supère", couleur: ["vert", "brun"] },
      fruits: { type: "caryopse", description: "grain" },
      score_traits: ["nervation parallèle", "chaume", "ligule", "graminée", "caryopse", "noeuds", "glumelles", "bambou"]
    },
    {
      id: "orchidaceae",
      name: "Orchidaceae",
      vernacular: "Orchidées",
      classe: "monocot",
      port: ["herbacée", "épiphyte"],
      habitat: ["forêt humide", "forêt sèche", "montagne"],
      endemic_genera: ["Angraecum", "Bulbophyllum", "Cynorkis", "Vanilla"],
      tige: { texture: "herbacée", latex: false, epines: false, forme: "cylindrique", note: "pseudobulbe souvent présent" },
      feuilles: { type: ["simple"], disposition: ["alterne"], nervation: "parallèle", marge: "entière", stipules: false },
      fleurs: { symetrie: "zygomorphe", pieces: "3+3 tépales, labelle, gynostème", ovaire: "infère", couleur: ["blanc", "vert", "jaune", "rose", "violet"] },
      fruits: { type: "capsule", description: "capsule à graines très nombreuses" },
      score_traits: ["labelle", "gynostème", "pseudobulbe", "épiphyte", "orchidée", "tépales", "angraecum", "vanille"]
    },
    {
      id: "arecaceae",
      name: "Arecaceae",
      vernacular: "Palmiers",
      classe: "monocot",
      port: ["arbre"],
      habitat: ["forêt humide", "forêt sèche", "littoral", "montagne"],
      endemic_genera: ["Ravenea", "Dypsis", "Bismarckia", "Satranala"],
      tige: { texture: "ligneuse", latex: false, epines: true, forme: "cylindrique", note: "stipe non ramifié" },
      feuilles: { type: ["composée pennée", "composée palmée"], disposition: ["terminale en couronne"], nervation: "parallèle", marge: "entière", stipules: false },
      fleurs: { symetrie: "actinomorphe", pieces: "3+3 tépales", ovaire: "supère", couleur: ["crème", "jaune", "blanc"] },
      fruits: { type: "drupe", description: "drupe ou baie" },
      score_traits: ["palmier", "stipe", "drupe", "nervation parallèle", "couronne terminale", "dypsis", "ravenea"]
    },
    {
      id: "moraceae",
      name: "Moraceae",
      vernacular: "Moracées",
      classe: "dicot",
      port: ["arbre", "arbuste", "liane"],
      habitat: ["forêt humide", "forêt sèche"],
      endemic_genera: ["Ficus", "Dorstenia", "Antiaris"],
      tige: { texture: "ligneuse", latex: true, epines: false, forme: "cylindrique" },
      feuilles: { type: ["simple"], disposition: ["alterne"], nervation: "pennée", marge: "entière", stipules: true },
      fleurs: { symetrie: "actinomorphe", pieces: "réduites, unisexuées", ovaire: "supère", couleur: ["vert"] },
      fruits: { type: "sycone", description: "figue ou syncarpe charnu" },
      score_traits: ["latex", "figue", "sycone", "stipules", "ficus", "mûre"]
    },
    {
      id: "acanthaceae",
      name: "Acanthaceae",
      vernacular: "Acanthacées",
      classe: "dicot",
      port: ["herbacée", "arbuste"],
      habitat: ["forêt humide", "forêt sèche", "zone rudérale"],
      endemic_genera: ["Justicia", "Ruellia", "Thunbergia", "Barleria"],
      tige: { texture: "herbacée", latex: false, epines: true, forme: "quadrangulaire" },
      feuilles: { type: ["simple"], disposition: ["opposée"], nervation: "pennée", marge: "entière", stipules: false, note: "cystolithes souvent visibles" },
      fleurs: { symetrie: "zygomorphe", pieces: "5 pétales soudés, bilabiée", ovaire: "supère", couleur: ["violet", "blanc", "rose", "jaune"] },
      fruits: { type: "capsule", description: "capsule élastique à déhiscence explosive" },
      score_traits: ["tige quadrangulaire", "feuilles opposées", "capsule explosive", "bilabiée", "cystolithes", "justicia", "thunbergia"]
    },
    {
      id: "lamiaceae",
      name: "Lamiaceae",
      vernacular: "Lamiacées",
      classe: "dicot",
      port: ["herbacée", "arbuste"],
      habitat: ["forêt sèche", "montagne", "zone rudérale"],
      endemic_genera: ["Plectranthus", "Salvia", "Ocimum", "Lavandula"],
      tige: { texture: "herbacée", latex: false, epines: false, forme: "quadrangulaire" },
      feuilles: { type: ["simple"], disposition: ["opposée"], nervation: "pennée", marge: "dentée", stipules: false, note: "souvent aromatiques" },
      fleurs: { symetrie: "zygomorphe", pieces: "5 pétales bilabiée", ovaire: "supère", couleur: ["violet", "bleu", "blanc", "rose"] },
      fruits: { type: "tétrakène", description: "4 nucules" },
      score_traits: ["tige quadrangulaire", "feuilles opposées", "aromatique", "bilabiée", "tétrakène", "basilic", "menthe", "ocimum"]
    },
    {
      id: "asteraceae",
      name: "Asteraceae",
      vernacular: "Composées",
      classe: "dicot",
      port: ["herbacée", "arbuste"],
      habitat: ["savane", "montagne", "zone rudérale", "forêt humide"],
      endemic_genera: ["Vernonia", "Senecio", "Helichrysum", "Chrysanthemum"],
      tige: { texture: "herbacée", latex: false, epines: true, forme: "cylindrique" },
      feuilles: { type: ["simple", "composée pennée"], disposition: ["alterne", "opposée"], nervation: "pennée", marge: "dentée", stipules: false },
      fleurs: { symetrie: "actinomorphe (capitule)", pieces: "fleurons + ligules, ovaire infère", ovaire: "infère", couleur: ["jaune", "blanc", "violet", "rose"] },
      fruits: { type: "akène", description: "akène à aigrette (pappus)" },
      score_traits: ["capitule", "akène", "pappus", "ligule", "fleuron", "composée", "vernonia"]
    },
    {
      id: "malvaceae",
      name: "Malvaceae",
      vernacular: "Malvacées",
      classe: "dicot",
      port: ["arbre", "arbuste", "herbacée"],
      habitat: ["forêt humide", "forêt sèche", "zone rudérale"],
      endemic_genera: ["Adansonia", "Grewia", "Hibiscus", "Cola"],
      tige: { texture: "ligneuse", latex: false, epines: false, forme: "cylindrique", note: "fibres corticales" },
      feuilles: { type: ["simple", "composée palmée"], disposition: ["alterne"], nervation: "palmée", marge: "dentée", stipules: true },
      fleurs: { symetrie: "actinomorphe", pieces: "5 pétales, étamines nombreuses soudées", ovaire: "supère", couleur: ["rose", "jaune", "blanc", "rouge"] },
      fruits: { type: "capsule", description: "capsule loculicide ou schizocarpique" },
      score_traits: ["étamines soudées", "colonne staminale", "nervation palmée", "capsule", "baobab", "hibiscus", "adansonia"]
    },
    {
      id: "anacardiaceae",
      name: "Anacardiaceae",
      vernacular: "Anacardiacées",
      classe: "dicot",
      port: ["arbre", "arbuste"],
      habitat: ["forêt sèche", "forêt humide"],
      endemic_genera: ["Anacardia", "Rhus", "Poupartia", "Sorindeia"],
      tige: { texture: "ligneuse", latex: true, epines: false, forme: "cylindrique", note: "résine irritante" },
      feuilles: { type: ["composée pennée", "simple"], disposition: ["alterne"], nervation: "pennée", marge: "entière", stipules: false },
      fleurs: { symetrie: "actinomorphe", pieces: "5 pétales", ovaire: "supère", couleur: ["blanc", "jaune", "rouge"] },
      fruits: { type: "drupe", description: "drupe avec résine" },
      score_traits: ["résine", "drupe", "latex irritant", "composée pennée", "anacarde", "mangue", "poupartia"]
    },
    {
      id: "sapindaceae",
      name: "Sapindaceae",
      vernacular: "Sapindacées",
      classe: "dicot",
      port: ["arbre", "arbuste", "liane"],
      habitat: ["forêt humide", "forêt sèche"],
      endemic_genera: ["Allophylus", "Dodonaea", "Litchi", "Filicium"],
      tige: { texture: "ligneuse", latex: false, epines: false, forme: "cylindrique" },
      feuilles: { type: ["composée pennée", "composée bipennée"], disposition: ["alterne"], nervation: "pennée", marge: "entière", stipules: false },
      fleurs: { symetrie: "actinomorphe", pieces: "4-5 pétales, disque nectarifère", ovaire: "supère", couleur: ["blanc", "crème"] },
      fruits: { type: "capsule", description: "capsule ou schizocarpe, parfois ailé" },
      score_traits: ["disque nectarifère", "capsule ailée", "composée", "litchi", "feuilles composées", "allophylus"]
    },
    {
      id: "myrtaceae",
      name: "Myrtaceae",
      vernacular: "Myrtacées",
      classe: "dicot",
      port: ["arbre", "arbuste"],
      habitat: ["forêt humide", "montagne"],
      endemic_genera: ["Syzygium", "Eucalyptus", "Pimenta", "Psidium"],
      tige: { texture: "ligneuse", latex: false, epines: false, forme: "cylindrique" },
      feuilles: { type: ["simple"], disposition: ["opposée"], nervation: "pennée", marge: "entière", stipules: false, note: "glandes à huile essentielle translucides" },
      fleurs: { symetrie: "actinomorphe", pieces: "4-5 pétales, étamines nombreuses", ovaire: "infère", couleur: ["blanc", "rouge", "rose"] },
      fruits: { type: "baie", description: "baie ou capsule" },
      score_traits: ["glandes translucides", "étamines nombreuses", "ovaire infère", "baie", "aromatique", "syzygium", "eucalyptus", "goyave"]
    },
    {
      id: "convolvulaceae",
      name: "Convolvulaceae",
      vernacular: "Convolvulacées",
      classe: "dicot",
      port: ["liane", "herbacée"],
      habitat: ["forêt sèche", "littoral", "zone rudérale"],
      endemic_genera: ["Ipomoea", "Calystegia", "Convolvulus", "Argyreia"],
      tige: { texture: "herbacée", latex: true, epines: false, forme: "cylindrique", note: "tige volubile" },
      feuilles: { type: ["simple"], disposition: ["alterne"], nervation: "palmée", marge: "entière", stipules: false },
      fleurs: { symetrie: "actinomorphe", pieces: "5 pétales soudés en entonnoir", ovaire: "supère", couleur: ["blanc", "rose", "violet", "jaune"] },
      fruits: { type: "capsule", description: "capsule septicide" },
      score_traits: ["corolle en entonnoir", "liane volubile", "latex", "capsule", "patate douce", "ipomoea", "volubile"]
    },
    {
      id: "solanaceae",
      name: "Solanaceae",
      vernacular: "Solanacées",
      classe: "dicot",
      port: ["herbacée", "arbuste"],
      habitat: ["zone rudérale", "forêt sèche", "savane"],
      endemic_genera: ["Solanum", "Physalis", "Withania", "Lycopersicon"],
      tige: { texture: "herbacée", latex: false, epines: true, forme: "cylindrique" },
      feuilles: { type: ["simple"], disposition: ["alterne"], nervation: "pennée", marge: "entière", stipules: false },
      fleurs: { symetrie: "actinomorphe", pieces: "5 pétales soudés, étamines soudées au tube", ovaire: "supère", couleur: ["blanc", "violet", "jaune"] },
      fruits: { type: "baie", description: "baie ou capsule" },
      score_traits: ["baie", "5 étamines soudées", "corolle étoilée", "solanum", "tomate", "physalis", "morelle"]
    },
    {
      id: "cyperaceae",
      name: "Cyperaceae",
      vernacular: "Cyperacées",
      classe: "monocot",
      port: ["herbacée"],
      habitat: ["zone humide", "marais", "bord de rivière"],
      endemic_genera: ["Cyperus", "Fimbristylis", "Bulbostylis", "Scleria"],
      tige: { texture: "herbacée", latex: false, epines: false, forme: "triangulaire", note: "tige pleine, triangulaire" },
      feuilles: { type: ["simple"], disposition: ["alterne"], nervation: "parallèle", marge: "entière", stipules: false, note: "gaine fermée" },
      fleurs: { symetrie: "non applicable", pieces: "glumes, bractées", ovaire: "supère", couleur: ["brun", "vert"] },
      fruits: { type: "akène", description: "akène trigone" },
      score_traits: ["tige triangulaire", "gaine fermée", "zone humide", "akène trigone", "marais", "cyperus", "papyrus"]
    },
    {
      id: "zingiberaceae",
      name: "Zingiberaceae",
      vernacular: "Zingibéracées",
      classe: "monocot",
      port: ["herbacée"],
      habitat: ["forêt humide", "zone humide"],
      endemic_genera: ["Aframomum", "Costus", "Hedychium", "Kaempferia"],
      tige: { texture: "herbacée", latex: false, epines: false, forme: "cylindrique", note: "rhizome aromatique" },
      feuilles: { type: ["simple"], disposition: ["alterne"], nervation: "pennée-parallèle", marge: "entière", stipules: false, note: "gaine ouverte, ligule" },
      fleurs: { symetrie: "zygomorphe", pieces: "3+3 tépales, labelle pétaloïde", ovaire: "infère", couleur: ["blanc", "jaune", "orange", "rouge"] },
      fruits: { type: "capsule", description: "capsule ou baie" },
      score_traits: ["rhizome aromatique", "labelle", "ovaire infère", "gingembre", "ligule", "aframomum", "hedychium"]
    },
    {
      id: "piperaceae",
      name: "Piperaceae",
      vernacular: "Pipéracées",
      classe: "dicot",
      port: ["arbuste", "liane", "herbacée"],
      habitat: ["forêt humide"],
      endemic_genera: ["Piper", "Peperomia"],
      tige: { texture: "herbacée", latex: false, epines: false, forme: "cylindrique", note: "noeuds renflés" },
      feuilles: { type: ["simple"], disposition: ["alterne", "opposée"], nervation: "palmée", marge: "entière", stipules: false, note: "aromatiques" },
      fleurs: { symetrie: "non applicable", pieces: "fleurs réduites en épi", ovaire: "supère", couleur: ["vert", "blanc"] },
      fruits: { type: "drupe", description: "petite drupe" },
      score_traits: ["noeuds renflés", "épi floral", "aromatique", "poivre", "nervation palmée", "piper", "peperomia"]
    },
    {
      id: "verbenaceae",
      name: "Verbenaceae",
      vernacular: "Verbénacées",
      classe: "dicot",
      port: ["arbuste", "arbre", "liane"],
      habitat: ["forêt sèche", "zone rudérale"],
      endemic_genera: ["Verbena", "Lantana", "Vitex", "Clerodendrum"],
      tige: { texture: "ligneuse", latex: false, epines: false, forme: "quadrangulaire" },
      feuilles: { type: ["simple"], disposition: ["opposée"], nervation: "pennée", marge: "dentée", stipules: false },
      fleurs: { symetrie: "zygomorphe", pieces: "5 pétales soudés", ovaire: "supère", couleur: ["violet", "blanc", "jaune", "rose"] },
      fruits: { type: "drupe", description: "drupe ou schizocarpe" },
      score_traits: ["tige quadrangulaire", "feuilles opposées", "drupe", "zygomorphe", "lantana", "vitex", "verbena"]
    },
    {
      id: "capparaceae",
      name: "Capparaceae",
      vernacular: "Capparacées",
      classe: "dicot",
      port: ["arbre", "arbuste", "liane"],
      habitat: ["forêt sèche", "bush épineux"],
      endemic_genera: ["Capparis", "Maerua", "Boscia"],
      tige: { texture: "ligneuse", latex: false, epines: true, forme: "cylindrique" },
      feuilles: { type: ["simple", "composée palmée"], disposition: ["alterne"], nervation: "palmée", marge: "entière", stipules: true },
      fleurs: { symetrie: "actinomorphe", pieces: "4 pétales libres, étamines nombreuses", ovaire: "supère", couleur: ["blanc", "jaune", "rose"] },
      fruits: { type: "baie", description: "baie ou silique" },
      score_traits: ["étamines longues", "gynophore", "baie", "forêt sèche", "câpre", "capparis", "maerua"]
    },
    {
      id: "combretaceae",
      name: "Combretaceae",
      vernacular: "Combrétacées",
      classe: "dicot",
      port: ["arbre", "arbuste", "liane"],
      habitat: ["forêt sèche", "littoral", "galerie forestière"],
      endemic_genera: ["Terminalia", "Combretum", "Quisqualis"],
      tige: { texture: "ligneuse", latex: false, epines: false, forme: "cylindrique" },
      feuilles: { type: ["simple"], disposition: ["alterne", "opposée"], nervation: "pennée", marge: "entière", stipules: false, note: "souvent groupées en pseudo-verticilles" },
      fleurs: { symetrie: "actinomorphe", pieces: "4-5 pétales ou absents", ovaire: "infère", couleur: ["blanc", "rouge", "jaune"] },
      fruits: { type: "drupe", description: "drupe ailée" },
      score_traits: ["ovaire infère", "drupe ailée", "feuilles groupées", "terminalia", "aile", "combretum", "quisqualis"]
    },
    {
      id: "rhizophoraceae",
      name: "Rhizophoraceae",
      vernacular: "Rhizophoracées",
      classe: "dicot",
      port: ["arbre", "arbuste"],
      habitat: ["mangrove", "littoral"],
      endemic_genera: ["Rhizophora", "Bruguiera", "Ceriops"],
      tige: { texture: "ligneuse", latex: false, epines: false, forme: "cylindrique", note: "racines échasses" },
      feuilles: { type: ["simple"], disposition: ["opposée"], nervation: "pennée", marge: "entière", stipules: true },
      fleurs: { symetrie: "actinomorphe", pieces: "4-5 pétales", ovaire: "infère", couleur: ["blanc", "crème"] },
      fruits: { type: "baie", description: "propagule viviparante" },
      score_traits: ["mangrove", "racines échasses", "propagule", "viviparité", "littoral", "rhizophora", "bruguiera"]
    },
    {
      id: "meliaceae",
      name: "Meliaceae",
      vernacular: "Méliacées",
      classe: "dicot",
      port: ["arbre", "arbuste"],
      habitat: ["forêt humide", "forêt sèche"],
      endemic_genera: ["Khaya", "Turraea", "Cedrelopsis", "Quivisia"],
      tige: { texture: "ligneuse", latex: false, epines: false, forme: "cylindrique" },
      feuilles: { type: ["composée pennée"], disposition: ["alterne"], nervation: "pennée", marge: "entière", stipules: false },
      fleurs: { symetrie: "actinomorphe", pieces: "4-5 pétales, tube staminal", ovaire: "supère", couleur: ["blanc", "crème", "jaune"] },
      fruits: { type: "capsule", description: "capsule ou drupe" },
      score_traits: ["tube staminal", "composée pennée", "capsule", "acajou", "bois précieux", "khaya", "cedrelopsis"]
    },
    {
      id: "bignoniaceae",
      name: "Bignoniaceae",
      vernacular: "Bignoniacées",
      classe: "dicot",
      port: ["arbre", "liane"],
      habitat: ["forêt humide", "forêt sèche"],
      endemic_genera: ["Jacaranda", "Crescentia", "Fernandoa", "Rhodocolea"],
      tige: { texture: "ligneuse", latex: false, epines: false, forme: "cylindrique" },
      feuilles: { type: ["composée pennée", "composée bipennée"], disposition: ["opposée"], nervation: "pennée", marge: "entière", stipules: false },
      fleurs: { symetrie: "zygomorphe", pieces: "5 pétales soudés en corolle bilabiée", ovaire: "supère", couleur: ["violet", "jaune", "blanc", "rose"] },
      fruits: { type: "capsule", description: "capsule ligneuse longue" },
      score_traits: ["capsule ligneuse longue", "composée opposée", "zygomorphe", "jacaranda", "fernandoa", "rhodocolea"]
    },
    {
      id: "araliaceae",
      name: "Araliaceae",
      vernacular: "Araliacées",
      classe: "dicot",
      port: ["arbre", "arbuste", "liane"],
      habitat: ["forêt humide", "montagne"],
      endemic_genera: ["Schefflera", "Polyscias", "Cussonia"],
      tige: { texture: "ligneuse", latex: false, epines: false, forme: "cylindrique" },
      feuilles: { type: ["composée pennée", "composée palmée", "simple"], disposition: ["alterne"], nervation: "palmée", marge: "entière", stipules: false, note: "grandes feuilles, pétiole engainant" },
      fleurs: { symetrie: "actinomorphe", pieces: "5 pétales, ombelle", ovaire: "infère", couleur: ["vert", "blanc", "crème"] },
      fruits: { type: "drupe", description: "petite drupe" },
      score_traits: ["ombelle", "ovaire infère", "pétiole engainant", "drupe", "schefflera", "polyscias"]
    },
    {
      id: "apiaceae",
      name: "Apiaceae",
      vernacular: "Apiacées",
      classe: "dicot",
      port: ["herbacée"],
      habitat: ["montagne", "zone humide"],
      endemic_genera: ["Daucus", "Apium", "Foeniculum"],
      tige: { texture: "herbacée", latex: false, epines: false, forme: "cylindrique", note: "tige creuse, noeuds" },
      feuilles: { type: ["composée pennée", "composée bipennée"], disposition: ["alterne"], nervation: "pennée", marge: "découpée", stipules: false, note: "gaine foliaire" },
      fleurs: { symetrie: "actinomorphe", pieces: "5 pétales, ombelle composée", ovaire: "infère", couleur: ["blanc", "jaune"] },
      fruits: { type: "diakène", description: "diakène aromatique" },
      score_traits: ["ombelle composée", "ovaire infère", "aromatique", "gaine foliaire", "carotte", "fenouil", "apiacée"]
    },
    {
      id: "crassulaceae",
      name: "Crassulaceae",
      vernacular: "Crassulacées",
      classe: "dicot",
      port: ["herbacée", "succulent"],
      habitat: ["montagne", "forêt sèche", "zone rocheuse"],
      endemic_genera: ["Kalanchoe", "Crassula", "Sedum"],
      tige: { texture: "herbacée", latex: false, epines: false, forme: "cylindrique", note: "charnue" },
      feuilles: { type: ["simple"], disposition: ["opposée", "alterne"], nervation: "pennée", marge: "entière", stipules: false, note: "charnues, succulentes" },
      fleurs: { symetrie: "actinomorphe", pieces: "4-5 pétales", ovaire: "supère", couleur: ["rouge", "orange", "jaune", "blanc"] },
      fruits: { type: "follicule", description: "follicules" },
      score_traits: ["succulente", "feuilles charnues", "kalanchoé", "follicule", "zone rocheuse", "crassula", "kalanchoe"]
    },
    {
      id: "clusiaceae",
      name: "Clusiaceae",
      vernacular: "Clusiée",
      classe: "dicot",
      port: ["arbre", "arbuste", "liane"],
      habitat: ["forêt humide"],
      endemic_genera: ["Garcinia", "Clusia", "Mammea"],
      tige: { texture: "ligneuse", latex: true, epines: false, forme: "cylindrique", note: "latex jaune ou blanc" },
      feuilles: { type: ["simple"], disposition: ["opposée"], nervation: "pennée", marge: "entière", stipules: false },
      fleurs: { symetrie: "actinomorphe", pieces: "4-5 pétales, étamines nombreuses", ovaire: "supère", couleur: ["blanc", "rose", "jaune"] },
      fruits: { type: "baie", description: "baie ou capsule" },
      score_traits: ["latex jaune", "feuilles opposées", "étamines nombreuses", "baie", "garcinia", "mammea", "latex coloré"]
    },
    {
      id: "sapotaceae",
      name: "Sapotaceae",
      vernacular: "Sapotacées",
      classe: "dicot",
      port: ["arbre"],
      habitat: ["forêt humide", "forêt sèche"],
      endemic_genera: ["Chrysophyllum", "Mimusops", "Labramia", "Faucherea"],
      tige: { texture: "ligneuse", latex: true, epines: false, forme: "cylindrique", note: "latex blanc abondant" },
      feuilles: { type: ["simple"], disposition: ["alterne", "spiralée"], nervation: "pennée", marge: "entière", stipules: false },
      fleurs: { symetrie: "actinomorphe", pieces: "5-8 pétales soudés", ovaire: "supère", couleur: ["blanc", "crème"] },
      fruits: { type: "baie", description: "baie charnue" },
      score_traits: ["latex blanc", "baie charnue", "feuilles spiralées", "sapote", "mimusops", "faucherea", "labramia"]
    },
    {
      id: "ebenaceae",
      name: "Ebenaceae",
      vernacular: "Ébénacées",
      classe: "dicot",
      port: ["arbre"],
      habitat: ["forêt humide", "forêt sèche"],
      endemic_genera: ["Diospyros"],
      tige: { texture: "ligneuse", latex: false, epines: false, forme: "cylindrique", note: "bois dur (ébène)" },
      feuilles: { type: ["simple"], disposition: ["alterne"], nervation: "pennée", marge: "entière", stipules: false },
      fleurs: { symetrie: "actinomorphe", pieces: "3-7 pétales soudés", ovaire: "supère", couleur: ["blanc", "crème"] },
      fruits: { type: "baie", description: "baie charnue persistante (kaki)" },
      score_traits: ["calice persistant", "bois ébène", "baie", "diospyros", "kaki", "ébène", "bois noir"]
    }
  ]
};

export const getDB = () => {
  try {
    const stored = localStorage.getItem('bota_db');
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse stored DB", e);
  }
  return DEFAULT_DB;
};

export let DB = getDB();

export const updateDB = (newDB: any) => {
  DB = newDB;
  localStorage.setItem('bota_db', JSON.stringify(newDB));
  window.dispatchEvent(new Event('db_updated'));
};

export const resetDB = () => {
  DB = DEFAULT_DB;
  localStorage.removeItem('bota_db');
  window.dispatchEvent(new Event('db_updated'));
};
