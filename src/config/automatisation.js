import lexique from '@/config/lexique.json';

export {
    getLexique,
    getAllPagesForAccueil,
    getReductions,
    getInfosReparation,
    getBonnesPratiques
};

// Récupère le titre des sections de lexique
const id_pages = Object.keys(lexique[0])

/**
 * Fonction qui permet de récupérer les lexiques et paramètres à automatiser dans le fichier lexique.json pour l'affichage d'une page de l'app, une fois qu'elle est sélectionnée sur le menu d'accueil
 * @param {str} uiParams localisation de la variable selectedPage
 * @returns {[subject, titrePage, soustitrePage, souslabelRéparationDIY, le_la, dun_dune, votre]} Liste avec les paramètres : subject (paramètre de recherche propre à l'API i-Fixit) - Titres et labels de pages - Variation lexicale le/la un/une votre
 */
const getLexique = (uiParams) => {
    const lexique_automatise = [];
    const page = uiParams.selectedPage;

    // Trouver la section correspondante dans le lexique
    const pageData = lexique.find(item => item[page]);

    if (pageData) {
        const pageInfo = pageData[page];
        const subject = pageInfo[0].Guide.subject;
        const titrePage = pageInfo[1].Labels.titrePage;
        const soustitrePage = pageInfo[1].Labels.soustitrePage;
        const souslabelRéparationDIY = pageInfo[1].Labels.souslabelRéparationDIY;
        const le_la = pageInfo[2].Lexique.le_la;
        const dun_dune = pageInfo[2].Lexique.dun_dune;
        const votre = pageInfo[2].Lexique.votre;

        lexique_automatise.push(subject);
        lexique_automatise.push(titrePage);
        lexique_automatise.push(soustitrePage);
        lexique_automatise.push(souslabelRéparationDIY);
        lexique_automatise.push(le_la);
        lexique_automatise.push(dun_dune);
        lexique_automatise.push(votre);
    } else {
        console.error(`Page ${page} not found in lexique`);
    }

    return lexique_automatise;
};

/**
 * Fonction qui permet de récupérer les réductions réparations à automatiser dans le fichier lexique.json pour l'affichage d'une page de l'app, une fois qu'elle est sélectionnée sur le menu d'accueil
 * @param {*} uiParams localisation de la variable selectedPage
 * @returns {[reduc_etat,reduct_telecoop]} Liste de deux nombres : reduction_etat & reduction_telecoop correspondant à la pièce sélectionné par l'utilisateur
 */
const getReductions = (uiParams) => {
    const reductions_automatisee = [];
    const page = uiParams.selectedPage;

    // Trouver la section correspondante dans le lexique
    const pageData = lexique.find(item => item[page]);

    if (pageData) {
        const pageInfo = pageData[page];
        const reduc_etat = pageInfo[3].Reductions.bonus_repa_etat;
        const reduc_telecoop = pageInfo[3].Reductions.bonus_telecoop;

        reductions_automatisee.push(reduc_etat);
        reductions_automatisee.push(reduc_telecoop);
    } else {
        console.error(`Page ${page} not found in lexique`);
    }

    return reductions_automatisee;

};
/**
 * Fonction qui permet de récupérer les infos de réparations à automatiser dans le fichier lexique.json pour l'affichage d'une page de l'app, une fois qu'elle est sélectionnée sur le menu d'accueil
 * @param {str} uiParams localisation de la variable selectedPage
 * @returns {[taux_moyen_MO]} liste d'un int avec la valeur du taux moyen horaire de main d'oeuvre pour le composant sélectionné (i.e. pour une page)
 */
const getInfosReparation = (uiParams) => {
    const reparations_automatise = [];
    const page = uiParams.selectedPage;

    // Trouver la section correspondante dans le lexique
    const pageData = lexique.find(item => item[page]);

    if (pageData) {
        const pageInfo = pageData[page];
        const taux_MO = pageInfo[4].Réparations.taux_horaire_MO;

        reparations_automatise.push(taux_MO)
    } else {
        console.error(`Page ${page} not found in lexique`);
    }

    return reparations_automatise;

};

/**
 * Fonction qui permet de récupérer les bonnes pratiques à automatiser dans le fichier lexique.json pour l'affichage d'une page de l'app, une fois qu'elle est sélectionnée sur le menu d'accueil
 * @param {str} uiParams Localisation de la variable selectedPage
 * @returns {[pratique1, pratique2, .., pratiqueN]} Liste de str avec les bonnes pratiques associée à la page sélectionnée
 */
const getBonnesPratiques = (uiParams) => {
    const bonnes_pratiques_automatisee = [];
    const page = uiParams.selectedPage;

    // Trouver la section correspondante dans le lexique
    const pageData = lexique.find(item => item[page]);

    if (pageData) {
        const pageInfo = pageData[page];

        // Accéder à la section BonnesPratiques
        const bonnesPratiques = pageInfo.find(item => item.BonnesPratiques);

        if (bonnesPratiques) {
            const pratique_keys = Object.keys(bonnesPratiques.BonnesPratiques);

            for (const key of pratique_keys) {
                const bp = bonnesPratiques.BonnesPratiques[key];
                bonnes_pratiques_automatisee.push(bp);
            }
        } else {
            console.error(`BonnesPratiques not found for page ${page}`);
        }
    } else {
        console.error(`Page ${page} not found in lexique`);
    }
    return bonnes_pratiques_automatisee;
};

/**
 * Fonction qui récupére tous les titres de pages existantes et leur id
 */
const getAllPagesForAccueil = () => {
    const pages = []
    for (const id of id_pages) {
        const titre = lexique[0][id][1].Labels.titrePage;
        const prov = [titre, id];
        pages.push(prov);
    }
    return pages;
}


