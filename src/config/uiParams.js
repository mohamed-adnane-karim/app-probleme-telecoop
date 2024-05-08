import { reactive } from "vue";
const uiParams = reactive({
    isSection1Open: false,
    isSection2Open: false,
    isSection3Open: false,
    isOneSectionOpen: false,

    selectedMarque: "",
    selectedModele: "",
    selectedPossession: "",

    selectedGarantieOui: false,
    selectedGarantieNon: false,
    selectedGarantieJsp: false,
    labelGarantieOui: "OUI",
    labelGarantieNon: "NON",
    labelGarantieJsp: "JE NE SAIS PAS",

    selectedCP: ""

});

const titresPages = {
    titrePageEcran: "L'écran de mon smartphone est cassé",
    titrePageVitre: "La vitre arrière de mon smartphone est cassée",
    titrePageAutonomie: "L'autonomie de mon smartphone a diminué",
    titrePageCharge: "Mon smartphone ne charge plus",
    titrePageMicrophone: "Le microphone est défectueux",
    titrePageHautParleur: "Le haut-parleur est défectueux",
    titrePageCamera: "La caméra est défectueuse",
    titrePageBoutons: "Les boutons de mon smartphone sont défectueux",
    titrePageConnexion: "La connexion de mon smartphone est mauvaise",
    titrePageStockage: "Je manque de stockage sur mon smartphone",
    titrePageBugs: "Je rencontre des bugs sur mon smartphone",
    titrePageAutre: "Je recontre un autre type de problème",

    soustitrePageEcran: "Réparons ensemble votre écran !    "
};

const bonnes_pratiques_ecran = {
    pratique1: "Protéger votre appareil à l'aide d'une coque de protection solide",
    pratique2: "Protéger votre écran à l'aide d'une vitre de protection, de préférence en verre trempé"
}

export default uiParams;

export {
    titresPages,
    bonnes_pratiques_ecran
}