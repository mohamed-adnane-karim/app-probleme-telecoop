import smartphonesOS from "@/data/OS.json";
import villes from "@/data/villes.json";

const OSs = Object.keys(smartphonesOS);


// Convertissez les codes postaux en chaînes de caractères
const cpVilles = () => {
    const uniqueCPVilles = new Set();
    villes.forEach(cp => {
        const codePostal = cp.codePostal.toString();
        const ville = cp.ville;
        const cpVille = `${ville} ${codePostal}`;
        uniqueCPVilles.add(cpVille);
    });
    return Array.from(uniqueCPVilles).map(cpVille => {
        const [ville, codePostal] = cpVille.split(' ');
        return { codePostal, ville };
    });
};


export { OSs, cpVilles }



