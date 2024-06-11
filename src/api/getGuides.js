import axios from 'axios';

// Fonction pour récupérer les informations générales des guides existants pour un téléphone donné
/**
 * Fonction pour récupérer les informations générales des guides existants sur l'API i-Fixit pour un téléphone donné
 * @param {str} namespace Par défaut CATEGORY : paramètre interne à l'API
 * @param {str} title Nom du modèle de téléphone
 * @returns {[{guide}]} Liste des guides de réparations trouvés pour le modèle de téléphone sélectionné
 */
async function fetchWikiDetails(namespace = "CATEGORY", title) {
    try {
        // Construire l'URL de l'API avec les paramètres de requête
        const url = `https://www.ifixit.com/api/2.0/wikis/${namespace}/${title}`;

        // Effectuer la requête GET
        const response = await axios.get(url);

        // Retourner les données de la réponse, uniquement la clé "guides"
        return response.data.guides;
    } catch (error) {
        console.error('Failed to fetch wiki details:', error.message);
        return null;
    }
}

// Fonction pour récupérer le score iFixit pour un téléphone donné
/**
 * Fonction pour récupérer lle score iFixit sur l'API i-Fixit pour un téléphone donné
 * @param {str} namespace Par défaut CATEGORY : paramètre interne à l'API
 * @param {str} title Nom du modèle de téléphone
 * @returns score iFixit du téléphone
 */
async function fetchScore(namespace = "CATEGORY", title) {
    try {
        // Construire l'URL de l'API avec les paramètres de requête
        const url = `https://www.ifixit.com/api/2.0/wikis/${namespace}/${title}`;

        // Effectuer la requête GET
        const response = await axios.get(url);

        // Retourner les données de la réponse, uniquement la clé "guides"
        return response.data.repairability_score;
    } catch (error) {
        console.error('Failed to score:', error.message);
        return null;
    }
}

export {
    fetchWikiDetails,
    fetchScore
}

