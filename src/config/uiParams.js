import { reactive } from "vue";

const uiParams = reactive({
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
});
export default uiParams