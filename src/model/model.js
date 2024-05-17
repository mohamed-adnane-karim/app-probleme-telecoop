// Import des bases de données
import smartphones from "@/data/database_on_id.json";
import smartphonesOS from "@/data/OS.json";
import villes from "@/data/villes.json";

export {
    OSs,
    cpVilles,
    marques,
    getModelsForMarque,
}


// Liste des IDs compris dans la base de donnée
const ids = Object.keys(smartphones[0]);
// Liste des OSs compris dans la base de donnés
const OSs = Object.keys(smartphonesOS);

// Liste des marques de téléphones 
let marquesSet = new Set([]);
for (const id of ids) {
    const marque = smartphones[0][id][0].General.oem
    marquesSet.add(marque)
}

const marques = Array.from(marquesSet).sort();
marques.unshift('Indifférent');

// Convertissez les codes postaux en chaînes de caractères
const cpVilles = villes.map(cp => ({
    codePostal: cp.codePostal.toString(),
    ville: cp.ville
}));

const getModelsForMarque = (selectedMarque) => {
    const ModelsForMarque = [];
    for (const id of ids) {
        const smartphone = smartphones[0][id][0];
        const el_id = smartphone.General.identifiant;
        const el_modele = smartphone.General.modele;
        const marque = smartphone.General.oem;

        if (selectedMarque === 'Indifférent' || marque === selectedMarque) {
            ModelsForMarque.push([el_id, el_modele]);
        }
    }
    // Trier les modèles par ordre alphabétique des el_modele
    ModelsForMarque.sort((a, b) => a[1].localeCompare(b[1]));
    return ModelsForMarque;
};



