// Ce fichier manipule la data de l'API i-Fixit

import phones_api from '@/data/phonesCategories.json'
import { fetchWikiDetails, fetchScore } from '@/api/getGuides';
import { fetchReparInfos } from '@/api/getReparIDetails';


export {
    os_api,
    getMarquesForOSAPI,
    getModelesForMarqueAndOSAPI,
    updateGuide,
    updateScore,
    updateDicId,
    updateInfosRepas,
    formatageParts,
    formatageTools,
    getLinkScorePictures
}

// Listes des OS répertoriés sur l'API d' i-Fixit
const os_api = Object.keys(phones_api);

/**
 * Fonction qui retourne toutes les marques de téléphones ayant un OS en particulier
 * @param {str} selectedOS os sélectionné
 * @returns {[marques]} Liste des marques ayant l'OS sélectionné
 */
const getMarquesForOSAPI = (selectedOS) => {
    const marquesForOS = []
    for (const marque in phones_api[selectedOS]) {
        marquesForOS.push(marque)
    }
    return marquesForOS
};

/**
 * Fonction qui retourne tous les modèles de téléphones d'une marque donnée ayant un OS en particulier
 * @param {str} selectedOS OS sélectionné
 * @param {str} selectedMarque Marque sélectionné (ayant l'OS sélectionné)
 * @returns {[modeles]} Liste des modèles de téléphone de la marque choisie avec l'OS sélectionné
 */
const getModelesForMarqueAndOSAPI = (selectedOS, selectedMarque) => {
    const modelesForMarque = []
    for (const model in phones_api[selectedOS][selectedMarque]) {
        modelesForMarque.push(model)
    }
    return modelesForMarque
};


/**
 * Fonction qui update la valeur de uiParams.guide avec tous les guides de réparations existant sur l'API d'i-Fixit pour un modèle donnée
 * @param {str} newModel Modèke sélectionné
 * @param {*} uiParams Localisation de la variable guide
 */
async function updateGuide(newModel, uiParams) {
    if (newModel) {
        const guides = await fetchWikiDetails('CATEGORY', newModel);
        uiParams.guide = guides;
    } else {
        uiParams.guide = null;
    }
};

/**
 * Fonction qui update la valeur de uiParams.score avecle score iFixit existant sur l'API d'i-Fixit pour un modèle donnée
 * @param {str} newModel Modèke sélectionné
 * @param {*} uiParams Localisation de la variable guide
 */
async function updateScore(newModel, uiParams) {
    if (newModel) {
        const scoreIfixit = await fetchScore('CATEGORY', newModel);
        uiParams.score = scoreIfixit;
    } else {
        uiParams.score = null;
    }
};

/**
 * Fonction qui update la valeur de uiParams.dicId avec l'ID du guide de réparation correspondant au composant sélectionné
 * @param {str} uiParams Localisation de la variable guide
 * @param {str} component Type de composant recherché
 */
function updateDicId(uiParams, component) {
    if (uiParams.guide != null) {
        const componentGuide = uiParams.guide.find(guide => guide.subject === component);
        uiParams.dicId = componentGuide ? componentGuide.guideid : null;
    } else {
        uiParams.dicId = null;
    }
};

/**
 * Fonction qui update la valeur de uiParams.reparinfos avec les infos de réparations liées au guideID storé dans uiParams.dicId
 * @param {str} uiParams Localisation de la variable guide
 */
async function updateInfosRepas(uiParams, newDicId) {
    if (newDicId) {
        const reparData = await fetchReparInfos(newDicId);
        uiParams.reparinfos = reparData;
    } else {
        uiParams.reparinfos = null;
    }
};

/**
 * Fonction qui parcourt la liste des pièces nécessaires pour la réparation d'un téléphone et renvoie une liste de liste avec nom de la pièce - url d'achat - 0
 * @param {str} uiParams Localisation de la variable reparinfos
 * @returns {[[parts.text,parts.url,0]]} Liste attendue
 */
const formatageParts = (uiParams) => {
    const formattedParts = [];
    for (const part of uiParams.reparinfos.parts) {
        const prov = [];
        prov.push(part.text);
        prov.push(part.url);
        prov.push(0);
        formattedParts.push(prov)
    }
    return formattedParts
};

/**
 * Fonction qui parcourt la liste des outils nécessaires pour la réparation d'un téléphone et renvoie une liste de liste avec nom de l'outils - url d'achat - 0
 * @param {str} uiParams Localisation de la variable reparinfos
 * @returns {[[tools.text,tools.url,0]]} Liste attendue
 */
const formatageTools = (uiParams) => {
    const formattedTools = [];
    for (const tool of uiParams.reparinfos.tools) {
        const prov = [];
        prov.push(tool.text);
        prov.push(tool.url);
        prov.push(0);
        formattedTools.push(prov)
    }
    return formattedTools
};

/**
 * Fonction qui crée à partir du score ifixit l'adresse du chemin de l'image associée au score
 * @param {*} uiParams Localisation de la variable score
 * @returns {[links_pictures]} Liste avec les liens des images
 */
const getLinkScorePictures = (uiParams) => {
    const linkScorePictures = [];
    if (uiParams.score != null) {
        const link_ifixit_picture = `./src/pictures/i-fixit/${uiParams.score}.jpg`;
        linkScorePictures.push(link_ifixit_picture)
    } else {
        linkScorePictures.push(0)
    }
    return linkScorePictures
};