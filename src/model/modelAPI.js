import phones_api from '@/data/phonesCategories.json'
import { capitalizeFirstLetter } from '@/controller/controller';

export {
    os_api,
    getMarquesForOSAPI,
    getModelesForMarqueAndOSAPI
}

const os_api = Object.keys(phones_api);



const getMarquesForOSAPI = (selectedOS) => {
    const marquesForOS = []
    for (const marque in phones_api[selectedOS]) {
        marquesForOS.push(marque)
    }
    return marquesForOS
};

const getModelesForMarqueAndOSAPI = (selectedOS, selectedMarque) => {
    const modelesForMarque = []
    for (const model in phones_api[selectedOS][selectedMarque]) {
        const formattedModel = capitalizeFirstLetter(model);
        modelesForMarque.push(formattedModel)
    }
    return modelesForMarque
};