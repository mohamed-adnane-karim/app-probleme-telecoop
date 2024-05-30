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
    labelContinuer: "JE SOUHAITE TOUT DE MEME ME RENSEIGNER SUR COMMENT REPARER MON ECRAN",
    labelContinuer1: "JE SOUHAITE TOUT DE MEME AVOIR UNE ESTIMATION DU COUT DE REPARATION DE MON ECRAN",

    tooltipVisibleprixcomposant: false,
    tooltipVisibletutos: false,
    tooltipVisibleoutils: false,
    tooltipVisiblescores: false,
    tooltipVisibleprixtotal: false,
    tooltipVisibleprixmo: false


});

const titresPages = {
    titrePageEcran: "L'écran de mon téléphone est cassé",
    titrePageVitre: "La vitre arrière de mon téléphone est cassée",
    titrePageAutonomie: "L'autonomie de mon téléphone a diminué",
    titrePageCharge: "Mon téléphone ne charge plus",
    titrePageMicrophone: "Le microphone est défectueux",
    titrePageHautParleur: "Le haut-parleur est défectueux",
    titrePageCamera: "La caméra est défectueuse",
    titrePageBoutons: "Les boutons de mon téléphone sont défectueux",
    titrePageConnexion: "La connexion de mon téléphone est mauvaise",
    titrePageStockage: "Je manque de stockage sur mon téléphone",
    titrePageBugs: "Je rencontre des bugs sur mon téléphone",
    titrePageAutre: "Je recontre un autre type de problème",

    soustitrePageEcran: "Réparons ensemble votre écran !",
    soustitrePageAutonomie: "Réparons ensemble votre batterie !",
    soustitrePageVitre: "Réparons ensemble votre vitre arrière !",




    souslabelPageEcran: "Je répare mon écran de téléphone",
    souslabelPageAutonomie: "Je répare la batterie de mon téléphone",
    souslabelPageVitreArrière: "Je répare la vitre arrière de mon téléphone",
};

const bonnes_pratiques_ecran = {
    pratique1: "Protéger votre appareil à l'aide d'une coque de protection solide",
    pratique2: "Protéger votre écran à l'aide d'une vitre de protection, de préférence en verre trempé"
};

const bonnes_pratiques_autonomie = {
    pratique1: "Réduire la luminosité de l'écran : Diminuez la luminosité de l'écran ou activez le mode automatique.",
    pratique2: "Fermer les applications en arrière-plan : Fermez les applications que vous n'utilisez pas pour économiser la batterie.",
    pratique3: "Activer le mode économie d'énergie : Utilisez le mode économie d'énergie de votre téléphone pour prolonger l'autonomie de la batterie.",
};

const bonnes_pratiques_vitre_arriere = {
    pratique1: "Utiliser une coque de protection : Pour éviter d'autres dommages, utilisez une coque robuste qui couvre l'arrière et les côtés du téléphone.",
    pratique2: "Faire réparer la vitre arrière : Consultez un professionnel de la réparation de smartphones pour remplacer la vitre arrière cassée.",
    pratique3: "Utiliser du ruban adhésif transparent : En attendant la réparation, appliquez du ruban adhésif transparent sur la vitre cassée pour éviter les coupures et empêcher les fragments de verre de se détacher.",
};
const annees = {
    1: "Moins de 1 an",
    2: "Entre 1 an et 2 ans",
    3: "Plus de 2 ans"

}

const tooltipsLabels = {
    tooltip_labelprixcomposant: "tooltip_labelprixcomposant",
    tooltip_labeltutos: "tooltip_labeltutos",
    tooltip_labeloutils: "tooltip_labeloutils",
    tooltip_labelscores: "tooltip_labelscores",
    tooltip_labelprixprixtotal: "tooltip_labelprixprixtotal",
    tooltip_labelprixmo: "tooltip_labelprixmo"
}

export default uiParams;

export {
    titresPages,
    bonnes_pratiques_ecran,
    bonnes_pratiques_autonomie,
    bonnes_pratiques_vitre_arriere,
    annees,
    tooltipsLabels
}