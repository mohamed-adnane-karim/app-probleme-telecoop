// Ce fichier manipule la data de l'API i-Fixit

import phones_api from '@/data/phonesCategories.json'
import { fetchWikiDetails, fetchScore, fetchRelatedWikiDetails } from '@/api/getGuides';
import { fetchReparInfos } from '@/api/getReparIDetails';
import { convertTimeToMinutes } from '@/controller/controller';


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
    getLinkScorePictures,
    calculatePriceMO,
    updateListTechniquesForModel,
    updateListReplacementForModel,
    updateRelatedGuide,
    updateListTutoAnnexeForModel
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
 * Fonction qui update la valeur de uiParams.relatedGuides avec tous les guides de réparations existant sur l'API d'i-Fixit pour un modèle donnée
 * @param {str} newModel Modèke sélectionné
 * @param {*} uiParams Localisation de la variable relatedGuide
 */
async function updateRelatedGuide(newModel, uiParams) {
    if (newModel) {
        const guides = await fetchRelatedWikiDetails('CATEGORY', newModel);
        uiParams.relatedGuide = guides;
    } else {
        uiParams.relatedGuide = null;
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
 * Fonction qui update la valeur de uiParams.listTechniques avec les tutoriels tehniques existants sur l'API pour un modèle donné
 * @param {str} uiParams Localisation de la variable listTechniques
 */
function updateListTechniquesForModel(uiParams) {
    if (uiParams.guide != null) {
        const list = []
        const type_searched = 'technique'

        // Parcourir chaque guide dans uiParams.guide
        uiParams.guide.forEach(guide => {
            const prov = []
            // Vérifier si le type est égal à 'technique'
            if (guide.type === type_searched) {

                const title = guide.title;
                const url = guide.url;
                const difficulty = guide.difficulty;

                prov.push(title);
                prov.push(url);
                prov.push(difficulty);

                if (guide.image) {
                    const img = guide.image["140x105"];
                    prov.push(img);
                } else {
                    const img = 0;
                    prov.push(img);
                }

                list.push(prov);
            }
        });

        uiParams.listTechniques = list
    } else {
        uiParams.listTechniques = null
    }
};

/**
 * Fonction qui update la valeur de uiParams.listReplacement avec les tutoriels de remplacement existants sur l'API pour un modèle donné
 * @param {str} uiParams Localisation de la variable listReplacement
 */
function updateListReplacementForModel(uiParams) {
    if (uiParams.guide != null) {
        const list = []
        const type_searched = 'replacement'

        // Parcourir chaque guide dans uiParams.guide
        uiParams.guide.forEach(guide => {
            const prov = []
            // Vérifier si le type est égal à 'technique'
            if (guide.type === type_searched) {

                const title = guide.title;
                const url = guide.url;
                const difficulty = guide.difficulty;

                prov.push(title);
                prov.push(url);
                prov.push(difficulty);

                if (guide.image) {
                    const img = guide.image["140x105"];
                    prov.push(img);
                } else {
                    const img = 0;
                    prov.push(img);
                }

                list.push(prov);
            }
        });

        uiParams.listReplacement = list
    } else {
        uiParams.listReplacement = null
    }
};

/**
 * Fonction qui update la valeur de uiParams.listrelatedtutos avec les tutoriels annexes existants sur l'API pour un modèle donné
 * @param {str} uiParams Localisation de la variable listrelatedtutos
 */
function updateListTutoAnnexeForModel(uiParams) {
    if (uiParams.guide != null) {
        const list = []

        // Parcourir chaque guide dans uiParams.guide
        uiParams.relatedGuide.forEach(guide => {
            const prov = []

            const title = guide.title;
            const url = guide.url;

            prov.push(title);
            prov.push(url);

            if (guide.image) {
                const img = guide.image["140x105"];
                prov.push(img);
            } else {
                const img = 0;
                prov.push(img);
            }

            list.push(prov);
        }
        );

        uiParams.listrelatedtutos = list
    } else {
        uiParams.listrelatedtutos = null
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

/**
 * Fonction qui estime le prix de la main d'oeuvre pour une réparation
 * @param {str} time Temps estimée de réparation
 * @param {int} taux_moyen_horaire Prix moyen en euros de la Main d'oeuvre à l'heure
 * @returns {int} Estimation du prix de la main d'oeuvre en fonction du taux horaire et du temps estimé ||0 s'il y a un problème ou si le temps est inférieur à 10 minutes
 */
const calculatePriceMO = (time, taux_moyen_horaire) => {
    const convertedTimeMinutes = convertTimeToMinutes(time);
    if (convertedTimeMinutes < 10) {
        const estimated_price_MO = 0;
        return estimated_price_MO;
    } else {
        const estimated_price_MO = (convertedTimeMinutes * taux_moyen_horaire) / 60;
        return parseFloat(estimated_price_MO.toFixed(2));
    }
    return 0;
};