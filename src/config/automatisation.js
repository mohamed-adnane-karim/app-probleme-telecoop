import lexique from '@/config/lexique.json';

/**
 * Fonction qui permet de récupérer les lexiques et paramètres à automatiser dans le fichier lexique.json pour l'affichage d'une page de l'app, une fois qu'elle est sélectionnée sur le menu d'accueil
 * @param {*} uiParams 
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

export {
    getLexique
};