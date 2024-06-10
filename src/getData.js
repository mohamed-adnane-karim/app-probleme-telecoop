import fs from 'fs';
import axios from 'axios';

// Fonction pour récupérer les données de l'API
async function fetchCategories() {
    try {
        const response = await axios.get('https://www.ifixit.com/api/2.0/categories');
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Failed to fetch categories:', error.message);
        return null;
    }
}

// Fonction pour filtrer les données pour obtenir uniquement le dictionnaire "Phone"
function filterPhoneCategories(categoriesData) {
    const phoneCategories = categoriesData['Phone'];
    if (phoneCategories['iPhone']) {
        delete phoneCategories['iPhone']['iPhone Accessories'];
    }
    delete phoneCategories['Phone Accessory'];
    delete phoneCategories['Landline Phone']


    const reorganizedData = {};
    for (const os in phoneCategories) {
        if (os != 'Android Phone') {
            if (os != 'iPhone' && os != 'Linux Phone') {
                reorganizedData[os] = {};
                for (const brand in phoneCategories[os]) {
                    if (phoneCategories[os][brand] === null) {
                        reorganizedData[os][brand] = null
                    } else {
                        // Utilisez la variable "brand" pour stocker la marque
                        reorganizedData[os][brand] = {}; // Initialisez un objet vide pour stocker les modèles
                        for (const model in phoneCategories[os][brand]) {
                            if (phoneCategories[os][brand][model] === null) {
                                reorganizedData[os][brand][model] = null
                            } else {
                                for (const subModel in phoneCategories[os][brand][model]) {
                                    reorganizedData[os][brand][subModel] = null
                                }
                            }
                        }
                    }
                }
            } else if (os === 'iPhone') {
                reorganizedData['Apple'] = {};
                reorganizedData['Apple']['iPhone'] = {};
                for (const model in phoneCategories[os]) {
                    reorganizedData['Apple']['iPhone'][model] = null
                }
            } else if (os === 'Linux Phone') {
                reorganizedData[os] = {}
                for (const brand in phoneCategories[os]) {
                    reorganizedData[os][brand] = {}
                    reorganizedData[os][brand][brand] = null
                }
            }
        } else {
            reorganizedData[os] = {};
            reorganizedData[os]['Autre'] = {}
            for (const brand in phoneCategories[os]) {
                if (phoneCategories[os][brand] === null) {
                    reorganizedData[os]['Autre'][brand] = null
                } else {
                    // Utilisez la variable "brand" pour stocker la marque
                    reorganizedData[os][brand] = {}; // Initialisez un objet vide pour stocker les modèles
                    for (const model in phoneCategories[os][brand]) {
                        if (phoneCategories[os][brand][model] === null) {
                            reorganizedData[os][brand][model] = null
                        } else {
                            for (const subModel in phoneCategories[os][brand][model]) {
                                reorganizedData[os][brand][subModel] = null
                            }
                        }
                    }
                }
            }
        }

    }
    return reorganizedData;

}

// Fonction pour enregistrer les données filtrées dans un fichier JSON
async function savePhoneCategoriesToFile() {
    const categoriesData = await fetchCategories();
    if (categoriesData) {
        const phoneCategories = filterPhoneCategories(categoriesData);
        fs.writeFile('./src/data/phonesCategories.json', JSON.stringify(phoneCategories, null, 2), (err) => {
            if (err) {
                console.error('Failed to save phone categories to file:', err);
            } else {
                console.log('Phone categories saved to file');
            }
        });
    }
}

// Appel de la fonction pour enregistrer les données filtrées dans un fichier JSON
savePhoneCategoriesToFile();