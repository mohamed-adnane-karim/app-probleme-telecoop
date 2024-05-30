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

// Convertissez les codes postaux en chaînes de caractères
const cpVilles = villes.map(cp => ({
    codePostal: cp.codePostal.toString(),
    ville: cp.ville,
    lat: cp.lat,
    lon: cp.lon,
}));

/**
 * Obtient la liste des noms des modèles de téléphones pour une marque donnée
 * @param {str} selectedMarque Marque séletionné
 * @returns {[[id,modele]]} Liste de liste de type [id,modele] correspondant aux modèles de la marque sélectionnée
 */
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

/**
 * Donne l'ID d'un modèle de téléphone
 * @param {str} selectedModele Modèle de téléphone sélectionné
 * @returns {int} ID du modèle sélectionné en paramètre
 */
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

/**
 * Pour un modèle et un composant donné, donne le prix du composant. Si modèle choist = autre, alors sort le prix du téléphone type de la marque choisie
 * @param {str} selectedModele Modèle de téléphone sélectionné
 * @param {str} selectedMarque Marque sélectionné
 * @param {str} typeComponent  Type de composant sélectionné
 * @returns {[int]} Retourné une liste d'un élément avec le prix du composant pour le modèle sélectionné, si le modèle sélectionné vaut autre, sort le prix du composant pour le téléphone type de la marqie sémlectionnéee
 */
const getPriceComponentForModel = (selectedModele, selectedMarque, typeComponent) => {
    const priceComponentForModel = [];
    if (selectedModele !== 'autre') {
        const idforModele = getIdForModel(selectedModele);
        const id = idforModele[0];
        if (typeComponent === 'ecran') {
            const p = smartphones[0][id][2].Ecran.prix_ecran;
            priceComponentForModel.push(p);
            return priceComponentForModel;
        } if (typeComponent === 'batterie') {
            const p = smartphones[0][id][1].Batterie.prix_batterie;
            priceComponentForModel.push(p);
            return priceComponentForModel;
        } if (typeComponent === 'divers') {
            const p = smartphones[0][id][3].Composants_divers.prix_composant;
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
        } if (typeComponent === 'batterie') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const id_type = id;
                    const p = smartphones[0][id_type][1].Batterie.prix_batterie;
                    priceComponentForModel.push(p);
                    return priceComponentForModel;
                }
            }
        } if (typeComponent === 'divers') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const id_type = id;
                    const p = smartphones[0][id_type][3].Composants_divers.prix_composant;
                    priceComponentForModel.push(p);
                    return priceComponentForModel;
                }
            }
        }
    }
};

/**
 *  Pour un modèle et un composant donné, donne le prix de la main d'oeuvre de réparation. Si modèle choist = autre, alors sort le prix du téléphone type de la marque choisie
 * @param {str} selectedModele Modèle de téléphone sélectionné
 * @param {str} selectedMarque Marque sélectionné
 * @param {str} typeComponent  Type de composant sélectionné
 * @returns {[int]} Retourné une liste d'un élément avec le prix de la main d'oeuvre de réparation pour le modèle sélectionné, si le modèle sélectionné vaut autre, sort le prix de la main d'oeuvre pour le téléphone type de la marqie sémlectionnéee
 */
const getPriceMOForModel = (selectedModele, selectedMarque, typeComponent) => {
    const priceMOForModel = [];
    if (selectedModele !== 'autre') {
        const idforModele = getIdForModel(selectedModele);
        const id = idforModele[0];
        if (typeComponent === 'ecran') {
            const p = smartphones[0][id][2].Ecran.prix_mo_ecran;
            priceMOForModel.push(p);
            return priceMOForModel;
        } if (typeComponent === 'batterie') {
            const p = smartphones[0][id][1].Batterie.prix_mo_batterie;
            priceMOForModel.push(p);
            return priceMOForModel;
        } if (typeComponent === 'divers') {
            const p = smartphones[0][id][3].Composants_divers.prix_mo_composant;
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
        } if (typeComponent === 'batterie') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const p = smartphones[0][id][1].Batterie.prix_mo_batterie;
                    priceMOForModel.push(p);
                    return priceMOForModel;
                }
            }
        } if (typeComponent === 'divers') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const p = smartphones[0][id][3].Composants_divers.prix_mo_composant;
                    priceMOForModel.push(p);
                    return priceMOForModel;
                }
            }
        }
    }
};

/**
 * Pour un téléphone donné et un compoosant donné calcule le prix total d'un réparation
 * @param {str} selectedModele Modèle de téléphone sélectionné
 * @param {str} selectedMarque Marque sélectionné
 * @param {str} typeComponent  Type de composant sélectionné
 * @returns {[int]} Retourné une liste d'un élément avec le prix de la réparation totale du téléphone sous le composant sélection, si modèle=autre, retourne le prix du téléphone type pour la marque
 */
const getPriceRepa = (selectedModele, selectedMarque, typeComponent) => {
    const priceMO = getPriceMOForModel(selectedModele, selectedMarque, typeComponent);
    const p1 = priceMO[0];
    const priceComponent = getPriceComponentForModel(selectedModele, selectedMarque, typeComponent);
    const p2 = priceComponent[0];
    const priceRepa = p1 + p2;
    return priceRepa;
};

/**
 * Pour un modèle donné et un composant donné, sort le lien des tutos
 * @param {str} selectedModele Modèle de téléphone sélectionné
 * @param {str} typeComponent  Type de composant sélectionné
 * @returns {[str]||[0]} s'il le modèle sélectionné à un lien de tuto pour réparer le composant sélectionnés, le retour sous forme de liste, sinon renvoie une liste contenant la valeur 0
 */
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
        } if (typeComponent === 'batterie') {
            if (smartphones[0][id][1].Batterie.tutoriel_batterie === 0) {
                linkTuto.push(0);
                return linkTuto;
            } else {
                const tuto = smartphones[0][id][1].Batterie.lien_tutoriel_batterie;
                linkTuto.push(tuto);
                return linkTuto;
            }
        } if (typeComponent === 'divers') {
            if (smartphones[0][id][3].Composants_divers.tutoriel_composant === 0) {
                linkTuto.push(0);
                return linkTuto;
            } else {
                const tuto = smartphones[0][id][3].Composants_divers.lien_tutoriel_composant;
                linkTuto.push(tuto);
                return linkTuto;
            }
        }
    } else {
        linkTuto.push(0);
        return linkTuto
    }
};

/**
 * Pour un modèle donné et un composant, donne la liste des outils nécessaire pour une réparation maison
 * @param {str} selectedModele Modèle de téléphone sélectionné
 * @param {str} typeComponent  Type de composant sélectionné
 * @returns {[str]||[0]} s'il le modèle sélectionné a une liste d'outils nécessaires pour réparer le composant sélectionnés, le retour sous forme de liste, sinon renvoie une liste contenant la valeur 0
 */
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
        } if (typeComponent === 'batterie') {
            if (smartphones[0][id][1].Batterie.besoin_outils_batterie == 0) {
                listOutils.push(0);
                return listOutils;
            } if (smartphones[0][id][1].Batterie.besoin_outils_batterie == -1) {
                listOutils.push(-1);
                return listOutils;
            } else {
                const list = smartphones[0][id][1].Batterie.liste_outils_batterie;
                listOutils.push(list);
                return listOutils;
            }
        } if (typeComponent === 'divers') {
            if (smartphones[0][id][3].Composants_divers.besoin_outils_composant == 0) {
                listOutils.push(0);
                return listOutils;
            } if (smartphones[0][id][3].Composants_divers.besoin_outils_composant == -1) {
                listOutils.push(-1);
                return listOutils;
            } else {
                const list = smartphones[0][id][3].Composants_divers.liste_outils_composant;
                listOutils.push(list);
                return listOutils;
            }
        }
    } else {
        listOutils.push(-1);
        return listOutils
    }
};

/**
 * Pour un modèle de téléphone donné, sort les liens des images de score de classification du téléphone
 * @param {*} selectedModele  Modèle de téléphone sélectionné
 * @returns {[link_pic_ind_repa,link_pic_scr_ifixit,link_pic_ethique,link_pic_prive]} pour un modèle donnée ressort la liste des liens des images de score 
 */
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

/**
 * Pour un modèle donné et un composant donné, sort le prix de la réduction de l'état (bonus réparation)
 * @param {str} selectedModele Modèle de téléphone sélectionné
 * @param {str} selectedMarque Marque sélectionné
 * @param {str} typeComponent  Type de composant sélectionné
 * @returns {int} retour le montant de la réduction du bonus de réparabilité pour un téléphone donné pour un composant
 */
const getReducEtat = (selectedModele, selectedMarque, typeComponent) => {
    if (selectedModele !== 'autre') {
        if (typeComponent === 'ecran') {
            const idforModele = getIdForModel(selectedModele);
            const id = idforModele[0];
            const reduc = smartphones[0][id][2].Ecran.reduction_etat_ecran;
            return reduc;
        } if (typeComponent === 'batterie') {
            const idforModele = getIdForModel(selectedModele);
            const id = idforModele[0];
            const reduc = smartphones[0][id][1].Batterie.reduction_etat_batterie;
            return reduc;
        } if (typeComponent === 'divers') {
            const idforModele = getIdForModel(selectedModele);
            const id = idforModele[0];
            const reduc = smartphones[0][id][3].Composants_divers.reduction_etat_composant;
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
        } if (typeComponent === 'batterie') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const reduc = smartphones[0][id][1].Batterie.reduction_etat_batterie;
                    return reduc;
                }
            }
        } if (typeComponent === 'divers') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const reduc = smartphones[0][id][3].Composants_divers.reduction_etat_composant;
                    return reduc;
                }
            }
        }
    }
};

/**
 * Pour un modèle donné et un composant donné, sort le prix de la réduction de télécoop (bonus réparation client télécoop)
 * @param {str} selectedMarque Marque sélectionné
 * @param {str} typeComponent  Type de composant sélectionné
 * @returns {int} retour le montant de la réduction réparabilité des clients telecoop pour un téléphone donné pour un composant
 */
const getReducTeleCoop = (selectedModele, selectedMarque, typeComponent) => {
    if (selectedModele !== 'autre') {
        if (typeComponent === 'ecran') {
            const idforModele = getIdForModel(selectedModele);
            const id = idforModele[0];
            const reduc = smartphones[0][id][2].Ecran.reduction_telecoop_ecran;
            return reduc;
        } if (typeComponent === 'batterie') {
            const idforModele = getIdForModel(selectedModele);
            const id = idforModele[0];
            const reduc = smartphones[0][id][1].Batterie.reduction_telecoop_batterie;
            return reduc;
        } if (typeComponent === 'divers') {
            const idforModele = getIdForModel(selectedModele);
            const id = idforModele[0];
            const reduc = smartphones[0][id][3].Composants_divers.reduction_telecoop_composant;
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
        } if (typeComponent === 'batterie') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const reduc = smartphones[0][id][1].Batterie.reduction_telecoop_batterie;
                    return reduc;
                }
            }
        } if (typeComponent === 'divers') {
            for (const id of ids) {
                if (smartphones[0][id][0].General.oem === selectedMarque && smartphones[0][id][0].General.telephone_type === 1) {
                    const reduc = smartphones[0][id][3].Composants_divers.reduction_telecoop_composant;
                    return reduc;
                }
            }
        }
    }
};



