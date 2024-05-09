<template id="page-type">
    <body>
        <header class="wrapper-titre">
                <h1>
                    <span>{{ titresPages.titrePageEcran }}</span>
                </h1>
        </header>

        <header class="wrapper-sous-titre">
                <p class="p1">
                    <span>TeleCoop vous accompagne pour conserver votre mobile le plus longtemps possible.</span> <span>{{ titresPages.soustitrePageEcran }}</span>
                </p>
        </header>

        <div class="module_default-1" :class="{'module_default-1-expanded' : uiParams.isOneSectionOpen}">

            <section class="section-container"  id="je-repare-moi-meme">
                <div class="section-header" @click="toggleSection(1)" :class="{ 'section-header-expanded': uiParams.isSection1Open }">
                    <span>JE REPARE MOI-MEME MON SMARTPHONE</span>
                </div>
                <div v-if="uiParams.isSection1Open" class="section-content">

                    <div class="spacer"></div>

                    <div class="module_default-info" id="modele-phone">

                        <header class="header-info">
                            <div class="circle">1</div>
                            <span>Je renseigne mon modèle de smartphone</span>
                        </header>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-marque">
                            <span class="bullet-1"></span>
                            <span class="p2">Quelle est la marque de votre smartphone actuel ?</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedMarque" id="marque">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="os in OSs" :key="os" :value="os">{{ os }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-model">
                            <span class="bullet-1"></span>
                            <span class="p2">Quel est le modèle de votre smartphone actuel ?</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedModele" id="model">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="os in OSs" :key="os" :value="os">{{ os }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-possession">
                            <span class="bullet-1"></span>
                            <span class="p2">Depuis combien d'année(s) possédez-vous votre smartphone ?</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedPossession" id="possession">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="os in OSs" :key="os" :value="os">{{ os }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-garantie">

                            <span class="bullet-1"></span>
                            <span class="p2">Votre smartphone est-il encore sous garantie ?</span>
                            
                            <div class="checkbox-grid"> 
                                <div>
                                    <label class="checkbox-container" id="GarantieOui">
                                        <input type="checkbox" id="GarantieOui" @change="handleClickGarantie(1)" v-model="uiParams.selectedGarantieOui">
                                        <span class="checkmark"></span>
                                        <span class="label-text" >{{ uiParams.labelGarantieOui }}</span>
                                    </label>
                                </div>

                                <div>
                                    <label class="checkbox-container" id="GarantieNon">
                                        <input type="checkbox" id="GarantieNon" @change="handleClickGarantie(2)" v-model="uiParams.selectedGarantieNon">
                                        <span class="checkmark"></span>
                                        <span class="label-text" >{{ uiParams.labelGarantieNon }}</span>
                                    </label>
                                </div>

                                <div>
                                    <label class="checkbox-container" id="GarantieJSP">
                                        <input type="checkbox" id="GarantieJSP" @change="handleClickGarantie(3)" v-model="uiParams.selectedGarantieJsp">
                                        <span class="checkmark"></span>
                                        <span class="label-text-1" >{{ uiParams.labelGarantieJsp }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        

                        <div class="spacer-1"></div>

                        <span class="label-mention">* Champs obligatoires</span>

                        <div class="spacer-1"></div>


                    </div>

                    <div class="spacer"></div>

                </div>
            </section>

            <section class="section-container"  id="reparateur">
                <div class="section-header" @click="toggleSection(2)" :class="{ 'section-header-expanded': uiParams.isSection2Open }">
                    <span>JE CHERCHE UN REPARATEUR AGREE AUTOUR DE MOI</span>
                </div>
                <div v-if="uiParams.isSection2Open" class="section-content">
                    
                    <div class="spacer"></div>

                    <div class="module_default-info" id="adresse">

                        <header class="header-info">
                            <div class="circle">1</div>
                            <span>Trouvez un réparateur labellisé le plus proche de chez vous</span>
                        </header>

                        <div class="spacer-1"></div>

                        <div class="module-text-info">
                            <div class="p2">                            
                                <span>En faisant réparer votre téléphone par un réparateur labellisé "QualiRépar" vous bénéficier directement du Bonus Réparation mis en place par l'Etat. </span>
                                <span>Rendez-vous ici pour </span><a href="https://www.ecosystem.eco/conditions/">en savoir plus sur le Bonus Réparation</a><span> !</span>
                            </div>
                        </div>

                        <div class="spacer-1"></div>
                        <div class="spacer-1"></div>


                        <div class="module-select-info" id="selection-code-postal">
                            <span class="bullet-1"></span>
                            <span class="p2">Votre code postal :</span>
                            <div style="display: flex; align-items: center;width: 45%;margin-left: 15vh;">
                                <input type="text" v-model="uiParams.selectedCP" class="custom-input" placeholder="Entrez votre code postal" @input="onCPInput" @click="showSuggestions">
                                <ul v-if="uiParams.selectedCP.length >= 3 && uiParams.showSuggestions" class="suggestions">
                                    <li v-for="cp in filteredCPs" :key="`${cp.codePostal}-${cp.ville}`" @click="selectCP(cp)">{{ cp.codePostal }} - {{ cp.ville }}</li>
                                </ul>
                            </div>    
                        </div> 

                        <div class="spacer-1"></div>

                        <div clas="button-wrapper-3">
                            <div class="btn-1">
                                <button>Trouver un réparateur QualiRépar</button>
                            </div>
                        </div>

                        <div class="spacer-1"></div>


                    </div>
                    
                    <div class="spacer"></div>

                    <div class="module_default-info" id="modele-phone">

                        <header class="header-info">
                            <div class="circle">2</div>
                            <span>J'estime les frais de réparations de mon smartphone</span>
                        </header>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-marque">
                            <span class="bullet-1"></span>
                            <span class="p2">Quelle est la marque de votre smartphone actuel ?</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedMarque" id="marque">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="os in OSs" :key="os" :value="os">{{ os }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-model">
                            <span class="bullet-1"></span>
                            <span class="p2">Quel est le modèle de votre smartphone actuel ?</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedModele" id="model">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="os in OSs" :key="os" :value="os">{{ os }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-possession">
                            <span class="bullet-1"></span>
                            <span class="p2">Depuis combien d'année(s) possédez-vous votre smartphone ?</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedPossession" id="possession">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="os in OSs" :key="os" :value="os">{{ os }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-garantie">

                            <span class="bullet-1"></span>
                            <span class="p2">Votre smartphone est-il encore sous garantie ?</span>
                            
                            <div class="checkbox-grid"> 
                                <div>
                                    <label class="checkbox-container" id="GarantieOui">
                                        <input type="checkbox" id="GarantieOui" @change="handleClickGarantie(1)" v-model="uiParams.selectedGarantieOui">
                                        <span class="checkmark"></span>
                                        <span class="label-text" >{{ uiParams.labelGarantieOui }}</span>
                                    </label>
                                </div>

                                <div>
                                    <label class="checkbox-container" id="GarantieNon">
                                        <input type="checkbox" id="GarantieNon" @change="handleClickGarantie(2)" v-model="uiParams.selectedGarantieNon">
                                        <span class="checkmark"></span>
                                        <span class="label-text" >{{ uiParams.labelGarantieNon }}</span>
                                    </label>
                                </div>

                                <div>
                                    <label class="checkbox-container" id="GarantieJSP">
                                        <input type="checkbox" id="GarantieJSP" @change="handleClickGarantie(3)" v-model="uiParams.selectedGarantieJsp">
                                        <span class="checkmark"></span>
                                        <span class="label-text-1" >{{ uiParams.labelGarantieJsp }}</span>
                                    </label>
                                </div>
                            </div>
                        </div> 

                        <div class="spacer-1"></div>


                        <div class="module-select-info" id="selection-forfait-telecoop">

                            <span class="bullet-1"></span>
                            <span class="p2">Avez-vous un forfait TeleCoop ?</span>

                            <div class="checkbox-grid"> 
                                <div>
                                    <label class="checkbox-container" id="TeleCoopOui">
                                        <input type="checkbox" id="TeleCoopOui" @change="handleClickTeleCoop(1)" v-model="uiParams.selectedTeleCoopOui">
                                        <span class="checkmark"></span>
                                        <span class="label-text" >{{ uiParams.labelTeleCoopOui }}</span>
                                    </label>
                                </div>

                                <div>
                                    <label class="checkbox-container" id="TeleCoopNon">
                                        <input type="checkbox" id="TeleCoopNon" @change="handleClickTeleCoop(2)" v-model="uiParams.selectedTeleCoopNon">
                                        <span class="checkmark"></span>
                                        <span class="label-text" >{{ uiParams.labelTeleCoopNon }}</span>
                                    </label>
                                </div>  

                                <div>
                                    <label class="checkbox-container" id="TeleCoopJsp">
                                        <input type="checkbox" id="TeleCoopNon" @change="handleClickTeleCoop(3)" v-model="uiParams.selectedTeleCoopJsp">
                                        <span class="checkmark"></span>
                                        <span class="label-text-1" >{{ uiParams.labelTeleCoopJsp }}</span>
                                    </label>
                                </div>  

                            </div>

                        </div>


                        <div class="spacer-1"></div>

                        <span class="label-mention">* Champs obligatoires</span>

                        <div class="spacer-1"></div>
                    
                    </div>   

                    <div class="spacer"></div>

                </div>
            </section>

            <section class="section-container"  id="je-change de téléphone">
                <div class="section-header" @click="toggleSection(3)" :class="{ 'section-header-expanded': uiParams.isSection3Open }">
                    <span>JE DESIRE TOUT DE MÊME CHANGER DE TELEPHONE</span>
                </div>
                <div v-if="uiParams.isSection3Open" class="section-content">
                    <div class="spacer"></div>

                    <div class="module_default-info" id="change-smartphone">

                        <header class="header-info">
                            <div class="circle">1</div>
                            <span>Avez-vous bien considéré toutes les options de réparations ?</span>
                        </header>

                        <div class="spacer-1"></div>

                        <div class="module-text-info" id="text-info">
                            <span class="p2">80% de l'impact d'un mobile réside dans sa fabrication d'après l'ADEME. Les Français changent en moyenne de mobile tous les 2 ans alors qu'il fonctionne encore. Dans un effort commun de réduction de nos émission, il est donc important d'essayer de conserver son mobile le plus longtemps possible ! En faisant réparer votre smartphone, vous réduisez non seulement vos déchets, votre impact environnemental de votre usage numérique, mais aussi l'impact sur votre portefeuille.
                            </span>
                        </div>

                        <div class="spacer-1"></div>

                        <div clas="button-wrapper-3">
                            <div class="btn-2">
                                <button>Je souhaite quand même découvrir les smartphones durables de la gamme TeleCoop</button>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                    </div>

                    <div class="spacer"></div>


                </div>

                <div class="spacer"></div>
    
            </section>

        </div>

        <footer class="footer">
            <div class="wrapper-footer">
                <span>BONNES PRATIQUES</span>
            </div>
            <div class = "wrapper-pratiques">
                <span>Afin de garantir une meilleure longévité de votre appareil, TeleCoop vous recommande de :</span>
            </div>
            <div v-for="(item, index) in Object.values(bonnes_pratiques_ecran)" :key="index" class="bullet-item">
                <div class="wrapper-pratiques-item">
                    <span class="bullet"></span>
                    <span>{{ item }}</span>
                </div>
            </div>
        </footer>
    </body>

</template>

<script setup>
    import { titresPages, bonnes_pratiques_ecran } from '@/config/uiParams.js';
    import uiParams from '@/config/uiParams.js';
    import { uncheckOthersGarantie, uncheckOthersTeleCoop } from '@/controller/controller';
    import { OSs,cpVilles } from '@/model/model.js';
    import { computed } from 'vue';



    const toggleSection =(index) => {
        if (index==1) {
            uiParams.isSection1Open = !uiParams.isSection1Open;
        }if (index==2) {
            uiParams.isSection2Open = !uiParams.isSection2Open;
        }if (index==3) {
            uiParams.isSection3Open = !uiParams.isSection3Open;
        }if (uiParams.isSection1Open || uiParams.isSection2Open || uiParams.isSection3Open){
                uiParams.isOneSectionOpen = true;
        }if (!uiParams.isSection1Open && !uiParams.isSection2Open && !uiParams.isSection3Open){
                uiParams.isOneSectionOpen = false;
        }
    }

    const handleClickGarantie = (index) => {
        uncheckOthersGarantie(uiParams,index);
    }  ;

    const handleClickTeleCoop = (index) => {
        uncheckOthersTeleCoop(uiParams,index);
    }  ;


    const filteredCPs = computed(() => {
        return cpVilles.filter(cp => cp.codePostal.startsWith(uiParams.selectedCP)).sort((a, b) => {
                          // Compare les codes postaux
                          const cpComparison = a.codePostal.localeCompare(b.codePostal);
                          if (cpComparison !== 0) {
                              return cpComparison;
                          }
                          // Si les codes postaux sont les mêmes, compare les villes
                          return a.ville.localeCompare(b.ville);
                      });
    });

    const onCPInput = () => {
    // Mettre à jour les suggestions ici
    };

    const showSuggestions = () => {
    uiParams.showSuggestions = true;
};

    const selectCP = (selectedCP) => {
        // Mettre à jour la valeur de selectedCP avec le code postal sélectionné
        uiParams.selectedCP = selectedCP.codePostal;
        // Afficher le code postal et la ville dans le champ de l'input
        uiParams.selectedCPDisplay = `${selectedCP.codePostal} - ${selectedCP.ville}`;
        // Cacher les suggestions après la sélection
        uiParams.showSuggestions = false;
    };

    // Fonction pour masquer les suggestions lorsque l'utilisateur clique en dehors de la zone
    const handleClickOutside = (event) => {
        const suggestions = document.querySelector('.suggestions');
        const inputField = document.querySelector('.custom-input');
        if (suggestions && !suggestions.contains(event.target) && !inputField.contains(event.target)) {
            uiParams.showSuggestions = false;
            uiParams.selectedCP='';
        }
    };

    // Fonction pour afficher les suggestions lorsque l'utilisateur clique sur l'entrée


    // Ajouter des écouteurs d'événements pour détecter les clics sur le document entier et sur l'entrée
    document.addEventListener('click', handleClickOutside);

    
</script>

<style scoped>

.module-text-info {
    display: flex;
    align-items: center;
    position:relative;
    margin-left: 3vh;
    margin-right : 3vh

}

.button-wrapper-3 {
    max-width: 1300px;
    /* Définit la largeur maximale de la zone de contenu */
    margin: 0 auto;
    /* Centre le contenu horizontalement */
    padding: 0;
    /* Supprime le rembourrage */
    display: flex;
    /* Utilise Flexbox */
    /* Centre les éléments horizontalement */
    align-items: center;
    /* Aligne les éléments en bas */
    /* Calcul de la hauteur restante de la page */
    overflow: hidden;
    /* Empêche tout débordement de contenu */
    justify-content: center; /* Ajoutez ceci pour centrer horizontalement */
    position: absolute;
}

.btn-1 button:hover {
    background-color: var(--green-back);
    border-color: var(--green-back);
    transform: scale(1.01);
}


.btn-1 {
    display: flex;
    justify-content: center; /* Ajoutez ceci pour centrer horizontalement */
    margin-top: 10vh;
    margin-bottom: 10vh
}

.btn-1 button {
    background-color: var(--blue-back);
    border: 3px solid var(--blue-back);
    padding: 2vh ;
    cursor: pointer;
    color: white;
    font-size: 120%;
    font-weight: bold;
    text-align: center;
    font-family: Poppins, sans-serif;
    border-radius: 15px;
    width: 90%;
}

.btn-2 button:hover {
    background-color: var(--green-back);
    border-color: var(--green-back);
    transform: scale(1.01);
}


.btn-2 {
    display: flex;
    justify-content: center; /* Ajoutez ceci pour centrer horizontalement */
    margin-top: 5vh;
    margin-bottom: 5vh
}

.btn-2 button {
    background-color: var(--blue-back);
    border: 3px solid var(--blue-back);
    padding: 2vh ;
    cursor: pointer;
    color: white;
    font-size: 120%;
    font-weight: bold;
    text-align: center;
    font-family: Poppins, sans-serif;
    border-radius: 15px;
    width: 90%;
}


.custom-input {
    width: 100%; /* ajustez la largeur selon vos besoins */
    height: 40px; /* ajustez la hauteur selon vos besoins */
    border: 3px solid var(--blue-back);
    border-radius: 15px;
    background-color: white;
    font-size: 16px;
    font-family: Poppins, sans-serif;
    color: var(--text-blue-color);
    box-sizing: border-box;
    text-align: center;
    left:0;
}



.suggestions {
    position: absolute;
    top: 110%;
    width: 45%;
    max-height: 160px; /* Définir la hauteur maximale à afficher */
    overflow-y: scroll; /* Ajouter une barre de défilement verticale si nécessaire */
    background-color: white;
    border: 2px solid var(--attenuated-blue);
    list-style-type: none;
    padding: 0;
    margin: 0 auto;
    border-radius: 5px;
    z-index: 999;
}

.suggestions li {
    padding: 8px;
    cursor: pointer;
    color : var(--text-blue-color);
    font-size: 15px;
    font-family: Poppins, sans-serif;
    text-align: center
}

.suggestions li:hover {
    background-color: #f0f0f0;
}


.custom-input::-webkit-inner-spin-button,
.custom-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.custom-input[type=number] {
    appearance: textfield;
}

.custom-input:focus {
    outline: none;
    border-color: var(--attenuated-blue); /* change la couleur de la bordure lorsqu'il est focus */
}




.label-mention{
    font-size: 12px;
    font-family: Poppins, sans-serif;
    color: var(--text-blue-color);
    margin-left: 10vh
}

.label-text {
    margin-right: 5vh;
    margin-left: 3vh;
    font-size: 16px;
    font-family: Poppins, sans-serif;
    color: var(--text-blue-color);
}

.label-text-1 {
    margin-left: 3vh;
    font-size: 16px;
    font-family: Poppins, sans-serif;
    color: var(--text-blue-color);
}



.checkbox-container {
    margin-right: 10px; /* Ajoute une marge à droite pour séparer les cases à cocher */
    align-items: center;
    display: inline-flex;

}

.checkbox-container span {
    cursor: pointer;
}

.checkbox-container input[type="checkbox"] {
    display: none;
}

.checkbox-container input[type="checkbox"]:checked+.checkmark {
    background-color: var(--blue-back);
    /* Changez cette couleur selon vos préférences */
    border-color: var(--blue-back);
    /* Changez cette couleur selon vos préférences */
}

.checkmark {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 3px solid var(--blue-back);
    background-color: white;
    /* Bord bleu de 3px (code hexadécimal) */
    border-radius: 50%;
    /* Coins arrondis */

}

.checkbox-grid {
    display: flex;
    flex-direction: row;
    margin-right:2.5%;
}






.p2 {
    font-family: Poppins, sans-serif;
    font-size: 2vh;
    /* Taille de police du paragraphe */
    line-height: 1.4;
    /* Hauteur de ligne */
    font-weight: normal;
    color: #1F1549;
}

.module-select-info{
    display: flex;
    align-items: center;
    position:relative

}

.module-select-info .checkbox-grid {
    margin-left: auto; /* Place le bloc checkbox à droite */
}

.custom-select {
    width: 40%;
    height: 3vh;
    background-color: var(--blue-back);
    margin-left: auto;
    right: 3%;
    display: block;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
}

.custom-select select {
    width: 100%;
    height: 90%;
    border: none;
    background-color: transparent;
    color: white;
    font-size: 100%;
    font-weight: bold;
    text-align: center;
    appearance: none;
    font-family: Poppins, sans-serif;
}

.custom-select select option {
    color: var(--text-blue-color);
    /* Couleur du texte pour les options */
    font-weight: bold;
}

.custom-select::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 15px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 0 8px;
    border-color: white transparent transparent transparent;
    transform: translateY(-50%);
}


.circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50px; /* Ajustez la taille du cercle selon vos besoins */
    height: 50px; /* Ajustez la taille du cercle selon vos besoins */
    border-radius: 50%; /* Rendre le div un cercle */
    background-color: var(--blue-back); /* Couleur de fond bleu */
    color: white; /* Couleur du texte blanc */
    font-size: px; /* Taille de la police */
    margin-right: 10px; /* Marge à droite pour l'espace */
    font-weight: lighter;
    margin-top: 1vh;
    margin-left: 2vh;
    margin-right: 5vh;
}

.spacer{
    height: 2vh;
}

.spacer-1{
    height: 2vh;
}

.header-info{
    color: var(--text-blue-color);
    font-family: Poppins, sans-serif;
    font-size: 140%;
    font-weight: bold;
}

.module_default-info {
    background-color: lightgrey;
    width: 98%;
    margin: 0 auto;
    position: relative;
    border-radius: 10px;
    position: relative;
}

.module_default-1-expanded {
    margin-top: 1vh;

}


.section-container {
    position: relative;
    cursor: pointer;
    padding-bottom: 20px;
    width: 95%;
    margin: 0 auto; /* Centrer le header lui-même */
    margin-top: 1vh;
    margin-bottom: 1 vh;

}


.section-header {
    position: relative; /* Permet de positionner le pseudo-élément par rapport à ce conteneur */
    background-color: var(--module_default-background-color);
    color: var(--text-blue-color);
    padding: 2vh;
    border: 3px solid var(--blue-back);
    border-radius: 10px;
    text-align: center; /* Centrer le texte à l'intérieur du header */
    font-family: Poppins, sans-serif;
    font-size: 130%;
    font-weight: 700;
    box-sizing: border-box; /* Ajoutez cette propriété */
}

.section-header::before {
    content: ''; /* Obligatoire pour les pseudo-éléments */
    position: absolute; /* Positionnement absolu par rapport au conteneur parent */
    top: 35%; /* Le triangle sera positionné en bas du header */
    left: 95%; /* Déplacement à mi-chemin de la largeur du header */
    transform: translateX(-50%) rotate(180deg); /* Rotation du triangle de 180 degrés pour l'inverser */
    border-width: 2vh; /* Taille du triangle */
    border-style: solid;
    border-color: transparent transparent var(--blue-back) transparent; /* Couleur des bordures (bleu pour le bas) */
    z-index: 1; /* Assure que le triangle apparaît au-dessus du contenu */
    transition: transform 0.5s ease; /* Ajoutez cette propriété pour animer la rotation */
}


.section-header-expanded {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 0 solid;
    background-color: var(--blue-back);
    color:white;
    border-color: var(--blue-back);
}

.section-header-expanded::before {
    content: ''; /* Obligatoire pour les pseudo-éléments */
    position: absolute; /* Positionnement absolu par rapport au conteneur parent */
    top: 0; /* Le triangle sera positionné en bas du header */
    left: 95%; /* Déplacement à mi-chemin de la largeur du header */
    transform: translateX(-50%); /* Rotation du triangle de 180 degrés pour l'inverser */
    border-width: 2vh; /* Taille du triangle */
    border-style: solid;
    border-color: transparent transparent white transparent; /* Couleur des bordures (bleu pour le bas) */
    z-index: 1; /* Assure que le triangle apparaît au-dessus du contenu */
    transition: transform 0.5s ease; /* Ajoutez cette propriété pour animer la rotation */
}

.section-header:hover {
    background-color: var(--blue-back);
    color:white;
    border-color: var(--blue-back);
}

.section-header:hover::before {
    border-color: transparent transparent white transparent; /* Couleur des bordures (bleu pour le bas) */
}


.section-content {
    position: relative;
    top: 100%;
    left: 0;
    width:100%;
    background-color: var(--module_default-background-color);
    border-left: 3px solid var(--blue-back);
    border-right: 3px solid var(--blue-back);
    border-bottom: 3px solid var(--blue-back);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin: 0 auto; /* Centrer le header lui-même */
    box-sizing: border-box; /* Ajoutez cette propriété */
}


.wrapper-pratiques-item {
    margin-left: 150px;
    font-family: Poppins, sans-serif;
    font-size: 120%;
    color: white;
}
.bullet-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px; /* espace entre chaque puce */
}

.bullet {
    display: inline-block;
    width: 4px; /* diamètre du cercle (le double du rayon) */
    height: 4px; /* diamètre du cercle (le double du rayon) */
    border-radius: 50%; /* pour former un cercle */
    background-color: white; /* couleur du fond */
    margin-right: 8px; /* espace entre le cercle et le texte */
}

.bullet-1 {
    display: inline-block;
    width: 8px; /* diamètre du cercle (le double du rayon) */
    height: 8px; /* diamètre du cercle (le double du rayon) */
    border-radius: 50%; /* pour former un cercle */
    background-color: var(--blue-back); /* couleur du fond */
    margin-right: 8px; /* espace entre le cercle et le texte */
    margin-left: 3vh;
}
</style>