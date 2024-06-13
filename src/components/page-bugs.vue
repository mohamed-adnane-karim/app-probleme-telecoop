<template id="page-type">
    <body>
        <header class="wrapper-titre">
                <h1>
                    <span>Je rencontre des bugs sur mon téléphone</span>
                </h1>
        </header>

        <header class="wrapper-sous-titre">
                <p class="p1">
                    <span>TeleCoop vous accompagne pour conserver votre mobile le plus longtemps possible.</span> <span>Essayons de trouver une solution à vos bugs !</span>
                </p>
        </header>

        <div class="module_default-1" :class="{'module_default-1-expanded' : uiParams.isOneSectionOpen}">

            <section class="section-container"  id="je-repare-moi-meme">
                <div class="section-header" @click="toggleSection(1,uiParams)" :class="{ 'section-header-expanded': uiParams.isSection1Open }">
                    <span>JE REPARE MOI-MEME MON TELEPHONE</span>
                </div>
                <div v-if="uiParams.isSection1Open" class="section-content">

                    <div class="spacer"></div>

                    <div class="module_default-info" id="modele-phone">

                        <header class="header-info">
                            <div class="circle">1</div>
                            <span>Examinons ensemble les bugs possibles</span>
                        </header>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-marque">
                            <span class="bullet-1"></span>
                            <span class="p2">Veuillez sélectionner le problème que vous rencontrez avec votre téléphone * </span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedBugs" id="bug">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="bug in bugs" :key="bug" :value="bug">{{ bug }}</option>
                                    <option value="autre">Je ne trouve pas mon bug dans la liste</option>

                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <span class="label-mention">* Champs obligatoires</span>

                        <div class="spacer-1"></div>


                    </div>

                    <div class="spacer"></div>

                    <div class="module_default-info" id="info-repa">
                        <header class="header-info">
                            <div class="circle">2</div>
                            <span>Je trouve une solution à mon problème</span>
                        </header>

                        <div class="spacer-1"></div>

                        <!-- Vérifier que tous les champs obligatoires sont remplis -->
                        <div v-if="uiParams.selectedBugs === ''"  id="default">
                            <div class="module-text-info"> 
                                <span class="p3">Avant de pouvoir accéder à cette section, merci de renseigner les informartions nécessaires dans la section "Examinons ensemble les bugs possibles" ci-dessus.</span>
                            </div>
                            <div class="spacer-1"></div>
                        </div>
                        <!-- Si tous les champs obligatoires sont remplis -->
                        <div v-else>

                            <div class="module-1" id="affichage_resultats">

                                <!-- Si le bug n'est pas dans BDD -->
                                <div v-if="uiParams.selectedBugs==='autre'">
                                    <div style="text-align: justify">
                                        <span class="p3"> Malheureusement nous ne pouvons pas vous aider pour le moment, veuillez passer chez un réparateur agréé.</span>
                                    </div>

                                    <div class="spacer-1"></div>

                                </div>

                                <!-- Si le bug est dans la BDD -->
                                <div v-else>

                                    <div style="text-align: justify">
                                        <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                        <span class="p3"> Votre bug est bien répertorié chez TeleCoop, nous allons pouvoir vous aider.</span>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Bonnes pratiques à mettre en place -->

                                    <div class="module-select-info-1" id="bonnes_pratiques">

                                        <div v-for="(item, index) in Object.values(b_pratique)" :key="index" class="bullet-item">
                                            <div class="wrapper-pratiques-item-1">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">{{ item }}</span>
                                            </div>
                                        </div>

                                    </div>



                                    <div class="spacer-1"></div>                     

                                </div>

                                <div class="spacer-1"></div>                                

                            </div>

                            <div class="spacer-1"></div>

                            <div class="button-wrapper-4">
                                <div class="btn-3">
                                    <button @click="handleClickRepar(uiParams)">Je préfère passer par un réparateur agréé</button>
                                </div>
                                <div class="btn-4">
                                    <router-link to="/AutreProbleme" style="text-decoration: none; width:100%">
                                        <button>Je rencontre un autre type de problème</button>
                                    </router-link>
                                </div>
                            </div>


                        </div>

                    </div>

                    <div class="spacer"></div>


                </div>
            </section>

            <section class="section-container"  id="reparateur">
                <div class="section-header" @click="toggleSection(2,uiParams)" :class="{ 'section-header-expanded': uiParams.isSection2Open }">
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
                            <div class="p2" style="text-align:justify">                            
                                <span>En faisant réparer votre téléphone par un réparateur labellisé "QualiRépar" vous bénéficier directement du Bonus Réparation mis en place par l'Etat. </span>
                                <span>Rendez-vous ici pour </span><a href="https://www.ecosystem.eco/conditions/">en savoir plus sur le Bonus Réparation</a><span> !</span>
                                <br>
                                <br>
                                <span>Et parce que chez TeleCoop nous voulons vous aide à garder votre téléphone plus longtemps possible afin de réduire votre impact carbone numérique, nos clients bénéficient d'une réduction supplémentaire sur leurs réparations ! Rendez-vous dans la section "J'estime mes frais de réparations" pour en savoir plus.</span>
                            </div>
                        </div>

                        <div class="spacer-1"></div>
                        <div class="spacer-1"></div>
                        <div class="spacer-1"></div>


                        <div class="module-select-info" id="selection-code-postal">
                            <span class="bullet-1"></span>
                            <span class="p2">Votre code postal :</span>
                            <div class="barre-select">
                                <input type="text" v-model="uiParams.selectedCP" class="custom-input" placeholder="Entrez votre code postal" @input="onCPInput" @click="showSuggestions(uiParams)">
                                <ul v-if="uiParams.selectedCP.length >= 3 && uiParams.showSuggestions" class="suggestions">
                                    <li v-for="cp in filteredCPs" :key="`${cp.codePostal}-${cp.ville}`" @click="selectCP(cp,uiParams)">{{ cp.codePostal }} - {{ cp.ville }}</li>
                                </ul>
                            </div>    
                        </div> 

                        <div class="spacer-1"></div>

                        <div clas="button-wrapper-3">
                            <div class="btn-1">
                                <button @click="openRepairerLink(uiParams)">Trouver un réparateur QualiRépar</button>
                            </div>
                        </div>

                        <div class="spacer-1"></div>


                    </div>
                    
                    <div class="spacer"></div>

                </div>
            </section>

            <section class="section-container"  id="je-change de téléphone">
                <div class="section-header" @click="toggleSection(3,uiParams)" :class="{ 'section-header-expanded': uiParams.isSection3Open }">
                    <span>JE DESIRE TOUT DE MÊME CHANGER DE TELEPHONE</span>
                </div>
                <div v-if="uiParams.isSection3Open" class="section-content">
                    <div class="spacer"></div>

                    <div class="module_default-info" id="change-téléphone">

                        <header class="header-info">
                            <div class="circle">1</div>
                            <span>Avez-vous bien considéré toutes les options de réparations ?</span>
                        </header>

                        <div class="spacer-1"></div>

                        <div class="module-text-info" id="text-info" style="text-align: justify">
                            <span class="p2">80% de l'impact d'un mobile réside dans sa fabrication d'après l'ADEME. Les Français changent en moyenne de mobile tous les 2 ans alors qu'il fonctionne encore. Dans un effort commun de réduction de nos émission, il est donc important d'essayer de conserver son mobile le plus longtemps possible ! En faisant réparer votre téléphone, vous réduisez non seulement vos déchets, votre impact environnemental de votre usage numérique, mais aussi l'impact sur votre portefeuille.
                            </span>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="button-wrapper-4">
                            <div class="btn-3">
                                <router-link to="/AutreProbleme" style="text-decoration: none; width:100%">
                                    <button>Je rencontre un autre type de problème</button>
                                </router-link>
                            </div>
                            <div class="btn-4">
                                <button>Je souhaite quand même changer de téléphone</button>
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
                <span style="font-weight: bold">Afin de garantir une meilleure longévité de votre appareil, TeleCoop vous recommande de :</span>
            </div>
            <div v-for="(item, index) in Object.values(bonnes_pratiques_bugs)" :key="index" class="bullet-item">
                <div class="wrapper-pratiques-item">
                    <span class="bullet"></span>
                    <span>{{ item }}</span>
                </div>
            </div>
        </footer>

    </body>

</template>

<script setup>
    import { computed } from 'vue';
    import { bonnes_pratiques_bugs } from '@/config/uiParams.js';
    import uiParams from '@/config/uiParams.js';
    import {openRepairerLink,toggleSection, showSuggestions, selectCP,handleClickRepar } from '@/controller/controller';
    import { cpVilles, bugs, getBps } from '@/model/model.js';
    

    /**
     * Filtres les suggestions de codes postaux en fonction de la saisie
     */
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
    };

    // Fonction pour masquer les suggestions lorsque l'utilisateur clique en dehors de la zone de saisie de CP
    const handleClickOutside = (event) => {
        const suggestions = document.querySelector('.suggestions');
        const inputField = document.querySelector('.custom-input');
        if (suggestions && !suggestions.contains(event.target) && !inputField.contains(event.target)) {
            uiParams.showSuggestions = false;
            uiParams.selectedCP='';
        }
    };

    // Ajouter des écouteurs d'événements pour détecter les clics sur le document entier et sur l'entrée
    document.addEventListener('click', handleClickOutside);
    
    /**
     * Retourne les bonnes pratiques pour un bug donné
     */
     const b_pratique = computed(()=>{
        if (uiParams.selectedBugs!==""){
            const Bps = getBps(uiParams.selectedBugs);
            return Bps;
        } else {
            return null
        }
    });

</script>

<style setup>
.module-select-info-1 {
    display: flex;
    position: relative;
    flex-direction: column

}


.wrapper-pratiques-item-1 {
    margin-left: 150px;
    font-family: Poppins, sans-serif;
    font-size: 120%;
    color: var(--blue-back);
}
/** 8 - Tooltip **/

/* 8.1 -  Styles pour le point d'interrogation */

.tooltip-icon-prix-composant {
    display: inline-block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: var(--blue-back);
    color: #fff;
    /* Blanc */
    text-align: center;
    align-content: center;
    cursor: pointer;
    font-weight: normal;
    align-content: center;
    align-items: center;
    font-family: Poppins, sans-serif;
    margin-left: 1vh;
}

.tooltip-icon-tutos{
    display: inline-block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: var(--blue-back);
    color: #fff;
    /* Blanc */
    text-align: center;
    align-content: center;
    cursor: pointer;
    font-weight: normal;
    align-content: center;
    align-items: center;
    font-family: Poppins, sans-serif;
    margin-left: 1vh;
}

.tooltip-icon-outils {
    display: inline-block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: var(--blue-back);
    color: #fff;
    /* Blanc */
    text-align: center;
    align-content: center;
    cursor: pointer;
    font-weight: normal;
    align-content: center;
    align-items: center;
    font-family: Poppins, sans-serif;
    margin-left: 1vh;
}

.tooltip-icon-scores {
    display: inline-block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: var(--blue-back);
    color: #fff;
    /* Blanc */
    text-align: center;
    align-content: center;
    cursor: pointer;
    font-weight: normal;
    align-content: center;
    align-items: center;
    font-family: Poppins, sans-serif;
    margin-left: 1vh;
}

.tooltip-icon-prix-total {
    display: inline-block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: var(--blue-back);
    color: #fff;
    /* Blanc */
    text-align: center;
    align-content: center;
    cursor: pointer;
    font-weight: normal;
    align-content: center;
    align-items: center;
    font-family: Poppins, sans-serif;
    margin-left: 1vh;
}

.tooltip-icon-prix-mo {
    display: inline-block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: var(--blue-back);
    color: #fff;
    /* Blanc */
    text-align: center;
    align-content: center;
    cursor: pointer;
    font-weight: normal;
    align-content: center;
    align-items: center;
    font-family: Poppins, sans-serif;
    margin-left: 1vh;
}

/* 8.2 - Styles pour le cadre gris du tooltip */
.tooltip-prix-composant {
    display: none;
    /* Caché par défaut */
    position: absolute;
    /* Position absolue pour afficher par-dessus le reste de la page */
    background-color:var(--attenuated-blue);
    /* Gris */
    color: #fff;
    /* Blanc */
    padding: 10px;
    border-radius: 5px;
    z-index:91;
    /* Pour s'assurer qu'il est au-dessus de tout le reste */
    /* Positionnement par rapport à l'icône */
    /* top: 35%;
    left: 70%; */
    max-width: 320px;
    /* Définissez la largeur maximale */
    white-space: normal;
    /* Permettre le retour à la ligne */
    text-align: center;
}

.tooltip-tutos {
    display: none;
    /* Caché par défaut */
    position: absolute;
    /* Position absolue pour afficher par-dessus le reste de la page */
    background-color:var(--attenuated-blue);
    /* Gris */
    color: #fff;
    /* Blanc */
    padding: 10px;
    border-radius: 5px;
    z-index:91;
    /* Pour s'assurer qu'il est au-dessus de tout le reste */
    /* Positionnement par rapport à l'icône */
    /* top: 35%;
    left: 70%; */
    max-width: 320px;
    /* Définissez la largeur maximale */
    white-space: normal;
    /* Permettre le retour à la ligne */
    text-align: center;
}

.tooltip-outils {
    display: none;
    /* Caché par défaut */
    position: absolute;
    /* Position absolue pour afficher par-dessus le reste de la page */
    background-color:var(--attenuated-blue);
    /* Gris */
    color: #fff;
    /* Blanc */
    padding: 10px;
    border-radius: 5px;
    z-index:91;
    /* Pour s'assurer qu'il est au-dessus de tout le reste */
    /* Positionnement par rapport à l'icône */
    /* top: 35%;
    left: 70%; */
    max-width: 320px;
    /* Définissez la largeur maximale */
    white-space: normal;
    /* Permettre le retour à la ligne */
    text-align: center;
}

.tooltip-scores {
    display: none;
    /* Caché par défaut */
    position: absolute;
    /* Position absolue pour afficher par-dessus le reste de la page */
    background-color:var(--attenuated-blue);
    /* Gris */
    color: #fff;
    /* Blanc */
    padding: 10px;
    border-radius: 5px;
    z-index:91;
    /* Pour s'assurer qu'il est au-dessus de tout le reste */
    /* Positionnement par rapport à l'icône */
    /* top: 35%;
    left: 70%; */
    max-width: 320px;
    /* Définissez la largeur maximale */
    white-space: normal;
    /* Permettre le retour à la ligne */
    text-align: center;
}

.tooltip-prix-total {
    display: none;
    /* Caché par défaut */
    position: absolute;
    /* Position absolue pour afficher par-dessus le reste de la page */
    background-color:var(--attenuated-blue);
    /* Gris */
    color: #fff;
    /* Blanc */
    padding: 10px;
    border-radius: 5px;
    z-index:91;
    /* Pour s'assurer qu'il est au-dessus de tout le reste */
    /* Positionnement par rapport à l'icône */
    /* top: 35%;
    left: 70%; */
    max-width: 320px;
    /* Définissez la largeur maximale */
    white-space: normal;
    /* Permettre le retour à la ligne */
    text-align: center;
}

.tooltip-prix-mo {
    display: none;
    /* Caché par défaut */
    position: absolute;
    /* Position absolue pour afficher par-dessus le reste de la page */
    background-color:var(--attenuated-blue);
    /* Gris */
    color: #fff;
    /* Blanc */
    padding: 10px;
    border-radius: 5px;
    z-index:91;
    /* Pour s'assurer qu'il est au-dessus de tout le reste */
    /* Positionnement par rapport à l'icône */
    /* top: 35%;
    left: 70%; */
    max-width: 320px;
    /* Définissez la largeur maximale */
    white-space: normal;
    /* Permettre le retour à la ligne */
    text-align: center;
}



/*8.3 - Styles pour afficher le tooltip lorsqu'il est visible */

.tooltip-prix-composant.visible {
    display: block;
    /* Afficher le tooltip */
}

.tooltip-tutos.visible {
    display: block;
    /* Afficher le tooltip */
}

.tooltip-outils.visible {
    display: block;
    /* Afficher le tooltip */
}

.tooltip-scores.visible {
    display: block;
    /* Afficher le tooltip */
}

.tooltip-prix-total.visible {
    display: block;
    /* Afficher le tooltip */
}

.tooltip-prix-mo.visible {
    display: block;
    /* Afficher le tooltip */
}


</style>

