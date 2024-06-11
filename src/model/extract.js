import axios from 'axios';
import cheerio from 'cheerio';

/**
 * Fonction qui se connecte à l'url d'une pièce de la boutique ifixit et retourne le prix de la pièce
 * @param {url} url Target URL de la boutique
 * @returns {prix €} prix en euros de la pièce désignée
 */
async function getPriceFromUrl(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return "0,0 €"
    }
    try {
        // Effectuer une requête HTTP pour obtenir le contenu de la page
        const response = await axios.get(url);

        // Charger le contenu HTML dans cheerio
        const $ = cheerio.load(response.data);

        // Extraire la valeur de la balise <span data-product-price="">
        const price = $('span[data-product-price]').text().trim();

        return price;
    } catch (error) {
        console.error('Error fetching or parsing the page:', error);
        return "0,0 €";
    }
}

export {
    getPriceFromUrl
}
