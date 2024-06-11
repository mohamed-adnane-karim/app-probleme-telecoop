import axios from 'axios';

// Fonction pour récupérer les informations détaillées sur un wiki
async function fetchReparInfos(guideID) {
    try {
        // Construire l'URL de l'API avec les paramètres de requête
        const url_get = `https://www.ifixit.com/api/2.0/guides/${guideID}`;

        // Effectuer la requête GET
        const response = await axios.get(url_get);

        // Retourner uniquement les clefs intéressants
        const { parts, tools, time_required, url, difficulty } = response.data

        // Retourner les données de la réponse
        return { parts, tools, time_required, url, difficulty };
    } catch (error) {
        console.error('Failed to fetch wiki details:', error.message);
        return null;
    }
}

export {
    fetchReparInfos
}