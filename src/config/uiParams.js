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
    selectedGarantieOK: false,
    labelGarantieOui: "OUI",
    labelGarantieNon: "NON",
    labelGarantieJsp: "JE NE SAIS PAS",

    selectedCP: "",
    selectedlat: "",
    selectedlon: "",
    selectedCPDisplay: "",
    showSuggestions: true,

    selectedTeleCoopOui: false,
    selectedTeleCoopNon: false,
    selectedTeleCoopJsp: false,
    labelTeleCoopOui: "OUI",
    labelTeleCoopNon: "NON",
    labelTeleCoopJsp: "JE NE SAIS PAS",

    selectedContinuer: false,
    labelContinuer: "JE SOUHAITE TOUT DE MEME ME RENSEIGNER SUR COMMENT REPARER MON ECRAN"

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

    soustitrePageEcran: "Réparons ensemble votre écran !",
    souslabelPageEcran: "Je répare mon écran de smartphone"
};

const bonnes_pratiques_ecran = {
    pratique1: "Protéger votre appareil à l'aide d'une coque de protection solide",
    pratique2: "Protéger votre écran à l'aide d'une vitre de protection, de préférence en verre trempé"
};

const annees = {
    1: "Moins de 1 an",
    2: "Entre 1 an et 2 ans",
    3: "Plus de 2 ans"

}

export default uiParams;

export {
    titresPages,
    bonnes_pratiques_ecran,
    annees
}