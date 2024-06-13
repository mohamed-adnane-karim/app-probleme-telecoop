import axios from 'axios';

/**
 * Fonction qui se connecte à l'API QualiRepar et extrait pour une ville donnée la liste des répareturs les plus proches
 * @param {int} lat latitude de la ville
 * @param {int} lon longitude de la ville
 * @returns {[{markers}]} liste de markers avec les informations des réparateurs 
 */
async function fetchQualiReparCP(lat, lon) {
    if (lat != null && lon != null) {
        try {
            const url = `https://www.ecosystem.eco/annuaire-qualirepar/markers?product=T%C3%A9l%C3%A9phone%20mobile&lat=${lat}&lon=${lon}`;

            // Effectuer la requête GET
            const response = await axios.get(url);

            // Elimine les paramètres non voulus
            const filteredData = response.data.markers.map(({ id, icon, url, ...rest }) => rest);

            console.log(filteredData)
            // Retourner les données de la réponse
            return filteredData;

        } catch (error) {
            console.error('Failed to fetch QualiRepar details :', error.message);

            return null
        }
    } else {
        return null
    }

};

fetchQualiReparCP(48.7018823, 2.134529)