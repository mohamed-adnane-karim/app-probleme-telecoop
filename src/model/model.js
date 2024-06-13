import villes from "@/data/villes.json";
import problemes from "@/data/bonnes_pratiques.json";

export {
    cpVilles,
    bugs,
    getBps,
    getIdForBug
}


// Liste des IDs compris dans la base de donnée
const new_ids = Object.keys(problemes[0]);


// Liste des bugs de téléphones 
let bugsSet = new Set([]);
for (const id of new_ids) {
    const bug = problemes[0][id][0].probleme.nom
    bugsSet.add(bug)
}

const bugs = Array.from(bugsSet).sort();


// Convertissez les codes postaux en chaînes de caractères
const cpVilles = villes.map(cp => ({
    codePostal: cp.codePostal.toString(),
    ville: cp.ville,
    lat: cp.lat,
    lon: cp.lon,
}));


/**
 * Donne l'ID d'un bug 
 * @param {str} selectedBugs bug sélectionné
 * @returns {int} ID du bug sélectionné en paramètre
 */
const getIdForBug = (selectedBugs) => {
    if (selectedBugs !== "") {
        const idforBug = [];
        for (const id of new_ids) {
            if (problemes[0][id][0].probleme.nom === selectedBugs) {
                idforBug.push(id);
            }
        }
        return idforBug
    }
};

/**
 * Pour un bug donné sort toutes les solutions/ bonnes pratiques
 * @param {*} selectedBugs  Bug de téléphone sélectionné
 * @returns {[bp1,bp2,bp3]} pour un bug donnée ressort la liste des bonnes pratiques
 */
const getBps = (selectedBugs) => {
    const bps = [];
    if (selectedBugs !== 'autre') {
        const idforBugs = getIdForBug(selectedBugs);
        const id = idforBugs[0];
        const bp1 = problemes[0][id][0].probleme.bonnes_pratiques.bonnes_pratiques_1;
        const bp2 = problemes[0][id][0].probleme.bonnes_pratiques.bonnes_pratiques_2;
        const bp3 = problemes[0][id][0].probleme.bonnes_pratiques.bonnes_pratiques_3;

        if (bp1 !== "") {
            bps.push(bp1)
        } if (bp2 !== "") {
            bps.push(bp2)
        } if (bp3 !== "") {
            bps.push(bp3)
            return bps;
        } else {
            bps.push(0);
            return bps;
        }
    }
};