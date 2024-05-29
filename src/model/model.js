import smartphones from "@/data/database_on_id.json";
import smartphonesOS from "@/data/OS.json";
import villes from "@/data/villes.json";
import pictures from "@/data/pictures.json";

export {
    OSs,
    cpVilles,
    marques,
    getModelsForMarque,
    getIdForModel,
    getPriceComponentForModel,
    getLinkTuto,
    getListOutils,
    getScoresRepa,
    getPriceMOForModel,
    getPriceRepa,
    getReducEtat,
    getReducTeleCoop
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
    ville: cp.ville,
    lat: cp.lat,
    lon: cp.lon,
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

const getIdForModel = (selectedModele) => {
    if (selectedModele !== "") {
        const idforModele = [];
        for (const id of ids) {
            if (smartphones[0][id][0].General.modele === selectedModele) {
                idforModele.push(id);
            }
        }
        return idforModele
    }
};

const getPriceComponentForModel = (selectedModele, selectedMarque, typeComponent) => {
    const priceComponentForModel = [];
    if (selectedModele !== 'autre') {
        const idforModele = getIdForModel(selectedModele);
        const id = idforModele[0];
        if (typeComponent === 'ecran') {
            const p = smartphones[0][id][2].Ecran.prix_ecran;
            priceComponentForModel.push(p);
            return priceComponentForModel;
        }
    } else {
        if (typeComponent === 'ecran') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const id_type = id;
                    const p = smartphones[0][id_type][2].Ecran.prix_ecran;
                    priceComponentForModel.push(p);
                    return priceComponentForModel;
                }
            }
        }
    }
};

const getPriceMOForModel = (selectedModele, selectedMarque, typeComponent) => {
    const priceMOForModel = [];
    if (selectedModele !== 'autre') {
        const idforModele = getIdForModel(selectedModele);
        const id = idforModele[0];
        if (typeComponent === 'ecran') {
            const p = smartphones[0][id][2].Ecran.prix_mo_ecran;
            priceMOForModel.push(p);
            return priceMOForModel;
        }
    } else {
        if (typeComponent === 'ecran') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const p = smartphones[0][id][2].Ecran.prix_mo_ecran;
                    priceMOForModel.push(p);
                    return priceMOForModel;
                }
            }
        }
    }
};

const getPriceRepa = (selectedModele, selectedMarque, typeComponent) => {
    const priceMO = getPriceMOForModel(selectedModele, selectedMarque, typeComponent);
    const p1 = priceMO[0];
    const priceComponent = getPriceComponentForModel(selectedModele, selectedMarque, typeComponent);
    const p2 = priceComponent[0];
    const priceRepa = p1 + p2;
    return priceRepa;
};

const getLinkTuto = (selectedModele, typeComponent) => {
    const linkTuto = [];
    if (selectedModele !== 'autre') {
        const idforModele = getIdForModel(selectedModele);
        const id = idforModele[0];
        if (typeComponent === 'ecran') {
            if (smartphones[0][id][2].Ecran.tutoriel_ecran === 0) {
                linkTuto.push(0);
                return linkTuto;
            } else {
                const tuto = smartphones[0][id][2].Ecran.lien_tutoriel_ecran;
                linkTuto.push(tuto);
                return linkTuto;
            }
        }
    } else {
        linkTuto.push(0);
        return linkTuto
    }
};

const getListOutils = (selectedModele, typeComponent) => {
    const listOutils = [];
    if (selectedModele !== 'autre') {
        const idforModele = getIdForModel(selectedModele);
        const id = idforModele[0];
        if (typeComponent === 'ecran') {
            if (smartphones[0][id][2].Ecran.besoin_outils_ecran == 0) {
                listOutils.push(0);
                return listOutils;
            } if (smartphones[0][id][2].Ecran.besoin_outils_ecran == -1) {
                listOutils.push(-1);
                return listOutils;
            } else {
                const list = smartphones[0][id][2].Ecran.liste_outils_ecran;
                listOutils.push(list);
                return listOutils;
            }
        }
    } else {
        listOutils.push(-1);
        return listOutils
    }
};

const getScoresRepa = (selectedModele) => {
    const scores = [];
    if (selectedModele !== 'autre') {
        const idforModele = getIdForModel(selectedModele);
        const id = idforModele[0];
        const score_repa_picture_link = pictures[0][id][1].Recommandation.indice_reparabilite;
        const score_ifixit_picture_link = pictures[0][id][1].Recommandation.score_ifixit;
        const score_moralscore_picture_link = pictures[0][id][1].Recommandation.score_ethique;
        const score_prive_picture_link = pictures[0][id][1].Recommandation.score_vie_prive;
        if (score_repa_picture_link !== "") {
            scores.push(score_repa_picture_link)
        } if (score_ifixit_picture_link !== "") {
            scores.push(score_ifixit_picture_link)
        } if (score_moralscore_picture_link !== "") {
            scores.push(score_moralscore_picture_link)
        } if (score_prive_picture_link !== "") {
            scores.push(score_prive_picture_link)
        }
        return scores;
    } else {
        scores.push(0);
        return scores;
    }
};

const getReducEtat = (selectedModele, selectedMarque, typeComponent) => {
    if (selectedModele !== 'autre') {
        if (typeComponent === 'ecran') {
            const idforModele = getIdForModel(selectedModele);
            const id = idforModele[0];
            const reduc = smartphones[0][id][2].Ecran.reduction_etat_ecran;
            return reduc;
        }
    } else {
        if (typeComponent === 'ecran') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const reduc = smartphones[0][id][2].Ecran.reduction_etat_ecran;
                    return reduc;
                }
            }
        }
    }
};

const getReducTeleCoop = (selectedModele, selectedMarque, typeComponent) => {
    if (selectedModele !== 'autre') {
        if (typeComponent === 'ecran') {
            const idforModele = getIdForModel(selectedModele);
            const id = idforModele[0];
            const reduc = smartphones[0][id][2].Ecran.reduction_telecoop_ecran;
            return reduc;
        }
    } else {
        if (typeComponent === 'ecran') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const reduc = smartphones[0][id][2].Ecran.reduction_telecoop_ecran;
                    return reduc;
                }
            }
        }
    }
};



