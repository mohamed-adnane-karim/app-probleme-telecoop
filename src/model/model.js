import smartphonesOS from "@/data/OS.json";
import villes from "@/data/villes.json";

const OSs = Object.keys(smartphonesOS);


// Convertissez les codes postaux en chaînes de caractères
const cpVilles = villes.map(cp => ({
    codePostal: cp.codePostal.toString(),
    ville: cp.ville
}));


export { OSs, cpVilles }



