import { reactive, ref } from "vue";
const uiParams = reactive({
    selectedPage: "batterie",

    isSection1Open: false,
    isSection2Open: false,
    isSection3Open: false,
    isOneSectionOpen: false,

    selectedMarque: "",
    selectedModele: "",
    selectedBugs: "",
    selectedPossession: "",
    selectedOS: "",

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
    tooltipVisibleprixmo: false,

    guide: ref(null),
    relatedGuide: ref(null),
    dicId: ref(null),
    reparinfos: ref(null),
    score: ref(null),
    listComposants: ref([]),
    listTools: ref([]),

    listTechniques: ref(null),
    listReplacement: ref(null),
    listrelatedtutos: ref(null)

});


const bonnes_pratiques_bugs = {
    pratique1: "Maintenir votre système d'exploitation à jour en installant les mises à jour proposées par le fabricant de votre téléphone. Ces mises à jour corrigent souvent les bugs et améliorent la sécurité.",
    pratique2: "Redémarrer périodiquement votre téléphone pour vider la mémoire et réinitialiser les processus, ce qui peut souvent résoudre les bugs mineurs."
};

const annees = {
    1: "Moins de 1 an",
    2: "Entre 1 an et 2 ans",
    3: "Plus de 2 ans"

};

const difficultyTranslationDic = {
    'very easy': 'Très facile',
    'easy': 'Facile',
    'moderate': 'Modérée',
    'difficult': 'Difficile',
    'very difficult': 'Très difficile'
};

const timeTranslationDic = {
    'second': 'seconde',
    'seconds': 'secondes',
    'hour': 'heure',
    'hours': 'heures',
    '-': 'à',
    'No estimate': "Aucune estimation disponible"
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
    bonnes_pratiques_bugs,
    annees,
    tooltipsLabels,
    difficultyTranslationDic,
    timeTranslationDic
}