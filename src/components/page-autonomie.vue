<template id="page-type">
    <body>
        <header class="wrapper-titre">
                <h1>
                    <span>{{ titresPages.titrePageAutonomie }}</span>
                </h1>
        </header>

        <header class="wrapper-sous-titre">
                <p class="p1">
                    <span>TeleCoop vous accompagne pour conserver votre mobile le plus longtemps possible.</span> <span>{{ titresPages.soustitrePageAutonomie }}</span>
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
                            <span>Je renseigne mon modèle de téléphone</span>
                        </header>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-marque">
                            <span class="bullet-1"></span>
                            <span class="p2">Quelle est la marque de votre téléphone actuel ?*</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedMarque" id="marque">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="marque in marques" :key="marque" :value="marque">{{ marque }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-model">
                            <span class="bullet-1"></span>
                            <span class="p2">Quel est le modèle de votre téléphone actuel ?*</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedModele" id="model" >
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="modele in modelsForSelectedMarque" :key="modele" :value="modele">{{ modele }}</option>
                                    <option value="autre">Mon téléphone ne figure pas sur la liste</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-possession">
                            <span class="bullet-1"></span>
                            <span class="p2">Depuis combien d'année(s) possédez-vous votre téléphone ?*</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedPossession" id="possession">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="annee in annees" :key="annee" :value="annee">{{ annee }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-garantie">

                            <span class="bullet-1"></span>
                            <span class="p2">Votre téléphone est-il encore sous garantie ?*</span>
                            
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

                    <div class="module_default-info" id="info-repa">
                        <header class="header-info">
                            <div class="circle">2</div>
                            <span>{{ titresPages.souslabelPageAutonomie }}</span>
                        </header>

                        <div class="spacer-1"></div>

                        <!-- Vérifier que tous les champs obligatoires sont remplis -->
                        <div v-if="uiParams.selectedMarque === '' || uiParams.selectedModele === '' || uiParams.selectedPossession === '' || !uiParams.selectedGarantieOK" id="default">
                            <div class="module-text-info"> 
                                <span class="p3">Avant de pouvoir accéder à cette section, merci de renseigner les informations nécessaires dans la section "Je renseigne mon modèle de téléphone" ci-dessus.</span>
                            </div>
                            <div class="spacer-1"></div>
                        </div>
                        <!-- Si tous les champs obligatoires sont remplis -->
                        <div v-else>

                            <!-- Cas où le téléphone est encore sous garantie -->
                            <div v-if="uiParams.selectedGarantieOui || uiParams.selectedPossession==='Moins de 1 an' || uiParams.selectedPossession==='Entre 1 an et 2 ans' " class="module-1" id="il-y-a-garantie">
                                <div v-if="uiParams.selectedGarantieOui">
                                    <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                    <span class="p3"> Votre téléphone étant encore sous garantie, vous pouvez vous rapprocher de votre SAV pour le faire prendre en charge sans frais !</span>
                                </div>

                                <div v-else>
                                    <span class="p3" style="font-weight: bold">Information importante ! </span> 
                                    <span class="p3"> Votre téléphone est encore potentiellement sous garantie si vous l'avez acheter neuf et qu'il a moins de deux ans. Vous pouvez vous rapprocher de votre SAV pour le faire prendre en charge sans frais !</span>
                                </div>

                                <div class="spacer-1"></div>
                                
                                <div class="checkbox-grid-1">
                                    <div>
                                        <label class="checkbox-container" id="Continuer">
                                            <input type="checkbox" id="Continuer" v-model="uiParams.selectedContinuer">
                                            <span class="checkmark"></span>
                                            <span class="label-text">{{ uiParams.labelContinuer }}</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="spacer-1"></div>

                                <div v-if="uiParams.selectedContinuer">
                                    
                                <!-- Si le modèle de téléphone n'est pas dans BDD -->
                                <div v-if="uiParams.selectedModele==='autre'">
                                    <div style="text-align: justify">
                                        <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                        <span class="p3"> Même si votre téléphone n'est pas enregistré chez TeleCoop, nous allons pouvoir vous aider grâce à un téléphone type de la gamme </span><span class="p3">{{ uiParams.selectedMarque }}</span><span class="p3"> afin de vous donner les bons ordres de grandeurs ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Prix moyen composant -->
                                    <div id="prix-composant">
                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Prix moyen du composant</span>
                                            <span class="tooltip-icon-prix-composant" @click="handleClickToggle(1)">?</span>
                                        </div>
                                        <div class="tooltip-prix-composant" :class="{ 'visible': uiParams.tooltipVisibleprixcomposant }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelprixcomposant }}</span>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="module_default-results">
                                            
                                            <span class="p2">
                                                <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_component }} €</span><span> pour racheter une nouvelle batterie pour votre téléphone.</span>
                                            </span>
                                            
                                        </div>
                                    </div>
                                </div>

                                <!-- Si le modèle de téléphone est dans la BDD -->
                                <div v-else>

                                    <div style="text-align: justify">
                                        <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                        <span class="p3"> Votre téléphone est bien enregistré chez TeleCoop, nous allons pouvoir vous aider ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Prix moyen composant -->
                                    <div id="prix-composant">
                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Prix moyen du composant</span>
                                            <span class="tooltip-icon-prix-composant" @click="handleClickToggle(1)">?</span>
                                        </div>
                                        <div class="tooltip-prix-composant" :class="{ 'visible': uiParams.tooltipVisibleprixcomposant }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelprixcomposant }}</span>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="module_default-results">

                                            <!-- Prix enregistré dans la BDD -->
                                            <div v-if="price_component!==-1">
                                                <span class="p2">
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_component }} €</span><span> pour racheter une nouvelle batterie pour votre </span><span>{{ uiParams.selectedModele }}.</span>
                                                </span>
                                            </div>

                                            <!-- Prix pas enregistré  -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>Malheureusement nous n'avons pas le prix moyen d'une batterie pour votre </span><span>{{ uiParams.selectedModele }}</span><span>. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                </span>
                                            </div>   
                                            
                                        </div>
                                    </div>


                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Présence de tutoriel en ligne -->
                                    <div id="tuto">
                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Présence de tutoriel en ligne ?</span>
                                            <span class="tooltip-icon-tutos" @click="handleClickToggle(2)">?</span>
                                        </div>
                                        <div class="tooltip-tutos" :class="{ 'visible': uiParams.tooltipVisibletutos }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labeltutos }}</span>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="module_default-results">
                                            <!-- Pas de tuto dans la BDD -->
                                            <div v-if="link_tuto===0">
                                                <span class="p2">
                                                    <span>A ce jour, il n'y malheureusement aucun tutoriel sur le site de notre partenaire iFixit pour vous aider à changer vous même la batterie de votre </span><span>{{ uiParams.selectedModele }}.</span><span> Nous faisons tout pour remédier à cela au plus vite ! En attendant, n'hésitez pas à consulter les informations fournies sur le site de </span><span>{{ uiParams.selectedMarque }}.</span><span> Vous pouvez aussi passer par un réparateur agréé si vous ne souhaitez prendre aucun risque.</span>
                                                </span>
                                            </div>

                                            <!-- Tuto dans la BDD -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>Vous pouvez consulter le tutoriel pour changer la batterie de votre </span><span>{{ uiParams.selectedModele }} </span> <span></span>
                                                    <a :href="link_tuto" target="_blank">en cliquant ici</a>
                                                    <span>.</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Besoin outils spécifique -->
                                    <div id="outils">
                                        <div class="module-select-info" >
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Besoin d'outils spécifiques ?</span>
                                            <span class="tooltip-icon-outils" @click="handleClickToggle(3)">?</span>
                                        </div>
                                        <div class="tooltip-outils" :class="{ 'visible': uiParams.tooltipVisibleoutils }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labeloutils }}</span>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="module_default-results-1">

                                            <!-- Pas d'infos -->
                                            <div v-if="liste_outils==-1" style="text-align:justify">
                                                <span class="p2">Malheureusement le site de notre partenaire iFixit ne recense pas à ce jour la liste du matériel nécessaire pour changer la batterie de votre {{ uiParams.selectedModele }}. Nous faisons tout pour remédier à cela au plus vite!</span>
                                            </div>

                                            <!-- Pas besoin d'outils -->
                                            <div v-if="liste_outils==0" style="text-align:justify">
                                                <span class="p2">
                                                    <span style="font-weight:bold">Bonne nouvelle !</span><span>Aucun matériel n'est nécessaire pour changer la batterie de votre {{ uiParams.selectedModele }}. On s'y met maintenant ?</span>
                                                </span>
                                            </div>

                                            <!-- Besoin d'outils et on a la liste -->
                                            <div v-if="liste_outils!==0&&liste_outils!==-1">
                                                <div class="p2" style="text-align: center">
                                                    <span>Afin de vous lancer dans la réparation de votre batterie, vous aurez besoin de :</span>
                                                    <br>                                                    
                                                </div>
                                                <div class="p2" style="text-align: left ; margin-left:30px;">
                                                    <div class="spacer-1"></div>
                                                    <span v-for="(outil, index) in liste_outils.split('\n')" :key="index">
                                                        {{ outil.trim() }} <!-- Supprime les espaces inutiles autour de chaque outil -->
                                                        <br v-if="index !== liste_outils.split('\n').length - 1"> <!-- Ajoute un saut de ligne sauf pour le dernier élément -->
                                                    </span>
                                                    <div class="spacer-1"></div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="spacer-1"></div>

                                    <!-- Score de réparabilité de votre téléphone -->
                                    <div v-if="scores.length>0">
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <div class="module-select-info" id="score-repa">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Les scores de durabilité de votre téléphone</span>
                                            <span class="tooltip-icon-scores" @click="handleClickToggle(4)">?</span>
                                        </div>
                                        <div class="tooltip-scores" :class="{ 'visible': uiParams.tooltipVisiblescores }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelscores }}</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <div class="module_default-results">
                                            <div class="image-container">
                                                <img v-for="(score, index) in scores" :key="index" :src="score" class="score-image" />
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div class="spacer-1"></div>

                                </div>
  
                            </div>

                            <!-- Cas où le téléphone n'est plus sous garantie -->
                            <div v-else class="module-1">

                                <!-- Si le modèle de téléphone n'est pas dans BDD -->
                                <div v-if="uiParams.selectedModele==='autre'">
                                    <div style="text-align: justify">
                                        <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                        <span class="p3"> Même si votre téléphone n'est pas enregistré chez TeleCoop, nous allons pouvoir vous aider grâce à un téléphone type de la gamme </span><span class="p3">{{ uiParams.selectedMarque }}</span><span class="p3"> afin de vous donner les bons ordres de grandeurs ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Prix moyen composant -->
                                    <div id="prix-composant">
                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Prix moyen du composant</span>
                                            <span class="tooltip-icon-prix-composant" @click="handleClickToggle(1)">?</span>
                                        </div>
                                        <div class="tooltip-prix-composant" :class="{ 'visible': uiParams.tooltipVisibleprixcomposant }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelprixcomposant }}</span>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="module_default-results">
                                            
                                            <span class="p2">
                                                <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_component }} €</span><span> pour racheter une nouvelle batterie pour votre téléphone.</span>
                                            </span>
                                            
                                        </div>
                                    </div>
                                </div>

                                <!-- Si le modèle de téléphone est dans la BDD -->
                                <div v-else>

                                    <div style="text-align: justify">
                                        <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                        <span class="p3"> Votre téléphone est bien enregistré chez TeleCoop, nous allons pouvoir vous aider ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Prix moyen composant -->
                                    <div id="prix-composant">
                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Prix moyen du composant</span>
                                            <span class="tooltip-icon-prix-composant" @click="handleClickToggle(1)">?</span>
                                        </div>
                                        <div class="tooltip-prix-composant" :class="{ 'visible': uiParams.tooltipVisibleprixcomposant }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelprixcomposant }}</span>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="module_default-results">

                                            <!-- Prix enregistré dans la BDD -->
                                            <div v-if="price_component!==-1">
                                                <span class="p2">
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_component }} €</span><span> pour racheter une nouvelle batterie pour votre </span><span>{{ uiParams.selectedModele }}.</span>
                                                </span>
                                            </div>

                                            <!-- Prix pas enregistré  -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>Malheureusement nous n'avons pas le prix moyen d'une batterie pour votre </span><span>{{ uiParams.selectedModele }}</span><span>. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                </span>
                                            </div>   
                                            
                                        </div>
                                    </div>


                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Présence de tutoriel en ligne -->
                                    <div id="tuto">
                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Présence de tutoriel en ligne ?</span>
                                            <span class="tooltip-icon-tutos" @click="handleClickToggle(2)">?</span>
                                        </div>
                                        <div class="tooltip-tutos" :class="{ 'visible': uiParams.tooltipVisibletutos }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labeltutos }}</span>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="module_default-results">
                                            <!-- Pas de tuto dans la BDD -->
                                            <div v-if="link_tuto===0">
                                                <span class="p2">
                                                    <span>A ce jour, il n'y malheureusement aucun tutoriel sur le site de notre partenaire iFixit pour vous aider à changer vous même la batterie de votre </span><span>{{ uiParams.selectedModele }}.</span><span> Nous faisons tout pour remédier à cela au plus vite ! En attendant, n'hésitez pas à consulter les informations fournies sur le site de </span><span>{{ uiParams.selectedMarque }}.</span><span> Vous pouvez aussi passer par un réparateur agréé si vous ne souhaitez prendre aucun risque.</span>
                                                </span>
                                            </div>

                                            <!-- Tuto dans la BDD -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>Vous pouvez consulter le tutoriel pour changer la batterie de votre </span><span>{{ uiParams.selectedModele }} </span> <span></span>
                                                    <a :href="link_tuto" target="_blank">en cliquant ici</a>
                                                    <span>.</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Besoin outils spécifique -->
                                    <div id="outils">
                                        <div class="module-select-info" >
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Besoin d'outils spécifiques ?</span>
                                            <span class="tooltip-icon-outils" @click="handleClickToggle(3)">?</span>
                                        </div>
                                        <div class="tooltip-outils" :class="{ 'visible': uiParams.tooltipVisibleoutils }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labeloutils }}</span>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="module_default-results-1">

                                            <!-- Pas d'infos -->
                                            <div v-if="liste_outils==-1" style="text-align:justify">
                                                <span class="p2">Malheureusement le site de notre partenaire iFixit ne recense pas à ce jour la liste du matériel nécessaire pour changer la batterie de votre {{ uiParams.selectedModele }}. Nous faisons tout pour remédier à cela au plus vite!</span>
                                            </div>

                                            <!-- Pas besoin d'outils -->
                                            <div v-if="liste_outils==0" style="text-align:justify">
                                                <span class="p2">
                                                    <span style="font-weight:bold">Bonne nouvelle !</span><span>Aucun matériel n'est nécessaire pour changer la batterie de votre {{ uiParams.selectedModele }}. On s'y met maintenant ?</span>
                                                </span>
                                            </div>

                                            <!-- Besoin d'outils et on a la liste -->
                                            <div v-if="liste_outils!==0&&liste_outils!==-1">
                                                <div class="p2" style="text-align: center">
                                                    <span>Afin de vous lancer dans la réparation de votre batterie, vous aurez besoin de :</span>
                                                    <br>                                                    
                                                </div>
                                                <div class="p2" style="text-align: left ; margin-left:130px;">
                                                    <div class="spacer-1"></div>
                                                    <span v-for="(outil, index) in liste_outils.split('\n')" :key="index">
                                                        {{ outil.trim() }} <!-- Supprime les espaces inutiles autour de chaque outil -->
                                                        <br v-if="index !== liste_outils.split('\n').length - 1"> <!-- Ajoute un saut de ligne sauf pour le dernier élément -->
                                                    </span>
                                                    <div class="spacer-1"></div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                    <div class="spacer-1"></div>



                                    <!-- Score de réparabilité de votre téléphone -->
                                    <div v-if="scores.length>0">
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <div class="module-select-info" id="score-repa">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Les scores de durabilité de votre téléphone</span>
                                            <span class="tooltip-icon-scores" @click="handleClickToggle(4)">?</span>
                                        </div>
                                        <div class="tooltip-scores" :class="{ 'visible': uiParams.tooltipVisiblescores }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelscores }}</span>
                                        </div>
                                        <div class="spacer-1"></div>

                                        <div class="module_default-results">
                                            <div class="image-container">
                                                <img v-for="(score, index) in scores" :key="index" :src="score" class="score-image" />
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div class="spacer-1"></div>                                

                            </div>

                            <div class="spacer-1"></div>

                            <div class="button-wrapper-4">
                                <div class="btn-3">
                                    <button @click="handleClickRepar(uiParams)">Je préfère passer par un réparateur agréé</button>
                                </div>
                                <div class="btn-4">
                                    <button @click="handleClickChgt(uiParams)">Je préfère changer de téléphone</button>
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

                    <div class="module_default-info" id="modele-phone">

                        <header class="header-info">
                            <div class="circle">2</div>
                            <span>J'estime les frais de réparations de mon téléphone</span>
                        </header>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-marque">
                            <span class="bullet-1"></span>
                            <span class="p2">Quelle est la marque de votre téléphone actuel ?*</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedMarque" id="marque">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="marque in marques" :key="marque" :value="marque">{{ marque }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-model">
                            <span class="bullet-1"></span>
                            <span class="p2">Quel est le modèle de votre téléphone actuel ?*</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedModele" id="model">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="modele in modelsForSelectedMarque" :key="modele" :value="modele">{{ modele }}</option>
                                    <option value="autre">Mon téléphone ne figure pas sur la liste</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-possession">
                            <span class="bullet-1"></span>
                            <span class="p2">Depuis combien d'année(s) possédez-vous votre téléphone ?*</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedPossession" id="possession">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="annee in annees" :key="annee" :value="annee">{{ annee }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-garantie">

                            <span class="bullet-1"></span>
                            <span class="p2">Votre téléphone est-il encore sous garantie ?*</span>

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

                    <div class="module_default-info" id="info-repa">
                        <header class="header-info">
                            <div class="circle">3</div>
                            <span>Mon estimation personnalisée</span>
                        </header>

                        <div class="spacer-1"></div>

                        <!-- Verifier que les champs obligatoires sont cochés -->
                        <div v-if="uiParams.selectedMarque === '' || uiParams.selectedModele === '' || uiParams.selectedPossession === '' || !uiParams.selectedGarantieOK" id="default">
                            <div class="module-text-info"> 
                                <span class="p3">Avant de pouvoir accéder à cette section, merci de renseigner les informations nécessaires dans la section "Je renseigne mon modèle de téléphone" ci-dessus.</span>
                            </div>
                            <div class="spacer-1"></div>
                        </div>

                        <!-- Lorsque les champs obligatoires sont biens cochés -->
                        <div v-else>

                            <!-- téléphone encore sous garantie -->
                            <div v-if="uiParams.selectedGarantieOui || uiParams.selectedPossession==='Moins de 1 an' || uiParams.selectedPossession==='Entre 1 an et 2 ans' " class="module-1" id="il-y-a-garantie">
                                
                                <div v-if="uiParams.selectedGarantieOui">
                                    <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                    <span class="p3"> Votre téléphone étant encore sous garantie, vous pouvez vous rapprocher de votre SAV pour le faire prendre en charge sans frais !</span>
                                </div>

                                <div v-else>
                                    <span class="p3" style="font-weight: bold">Information importante ! </span> 
                                    <span class="p3"> Votre téléphone est encore potentiellement sous garantie si vous l'avez acheter neuf et qu'il a moins de deux ans. Vous pouvez vous rapprocher de votre SAV pour le faire prendre en charge sans frais !</span>
                                </div>

                                <div class="spacer-1"></div>
                                
                                <div class="checkbox-grid-1">
                                    <div>
                                        <label class="checkbox-container" id="Continuer">
                                            <input type="checkbox" id="Continuer" v-model="uiParams.selectedContinuer">
                                            <span class="checkmark"></span>
                                            <span class="label-text">{{ uiParams.labelContinuer1 }}</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="spacer-1"></div>

                                <div v-if="uiParams.selectedContinuer">
                                    
                                    <!-- Si Modèle pas dans la BDD -->
                                <div v-if="uiParams.selectedModele==='autre'" class="module-1">
                                    
                                    <div style="text-align: justify">
                                        <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                        <span class="p3"> Même si votre téléphone n'est pas enregistré chez TeleCoop, nous allons pouvoir vous aider grâce à un téléphone type de la gamme </span><span class="p3">{{ uiParams.selectedMarque }}</span><span class="p3"> afin de vous donner les bons ordres de grandeurs ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Prix Global réparation  -->
                                    <div id="prix-repa">

                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Prix moyen de la réparation totale</span>
                                            <span class="tooltip-icon-prix-total" @click="handleClickToggle(5)">?</span>
                                        </div>
                                        <div class="tooltip-prix-total" :class="{ 'visible': uiParams.tooltipVisibleprixtotal }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelprixprixtotal }}</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <div class="module_default-results" >

                                            <!-- Cas où il manque soit le prix composant soit le prix mo -->
                                            <div v-if="price_MO==-1||price_component==-1">
                                                <span class="p2">
                                                        <span>Malheureusement nous ne pouvons vous fournir le prix moyen d'une réparation de batterie pour votre téléphone. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                </span>
                                            </div>

                                            <!-- On a à la fois le prix MO et le prix composant -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_repa }} €</span><span> pour faire réparer la batterie de votre téléphone par un professionnel agréé.</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div v-if="reduc_etat>0||reduc_telecoop>0" class="spacer-1"></div>
                                        <div v-if="reduc_etat>0||reduc_telecoop>0" class="module_default-results-2">
                                            <div v-if="reduc_etat>0" class="p4">
                                                <span>Profitez du Bonus Réparation sur cette intervention chez n'importe quel réparateur labellisé QualiRépar, pour une réduction à hauteur de </span><span style="font-weight: bold">{{ reduc_etat }} € sur votre facture finale.</span>
                                            </div>

                                            <div v-if="reduc_telecoop>0" class="p4">
                                                <br>
                                                <div v-if="uiParams.selectedTeleCoopOui">
                                                    <span>En tant que client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ reduc_telecoop }} € sur votre facture finale.</span>
                                                </div>
                                                <div v-else>
                                                    <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ reduc_telecoop }} € sur votre facture finale.</span>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Prix moyen composant -->
                                    <div id="prix-composant">

                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Prix moyen du composant</span>
                                            <span class="tooltip-icon-prix-composant" @click="handleClickToggle(1)">?</span>
                                        </div>
                                        <div class="tooltip-prix-composant" :class="{ 'visible': uiParams.tooltipVisibleprixcomposant }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelprixcomposant }}</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <div class="module_default-results">
                                            <!-- Prix enregistré dans la BDD -->
                                            <div v-if="price_component!==-1">
                                                <span class="p2">
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_component }} €</span><span> pour racheter une nouvelle batterie pour votre téléphone.</span>
                                                </span>
                                            </div>

                                            <!-- Prix pas enregistré  -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>Malheureusement nous n'avons pas le prix moyen d'une batterie pour votre téléphone. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                </span>
                                            </div>   
                                        </div>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Prix moyen main d'oeuvre -->
                                    <div id="prix-mo">

                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Prix moyen de la main d'oeuvre</span>
                                            <span class="tooltip-icon-prix-mo" @click="handleClickToggle(6)">?</span>
                                        </div>
                                        <div class="tooltip-prix-mo" :class="{ 'visible': uiParams.tooltipVisibleprixmo }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelprixmo }}</span>
                                        </div>


                                        <div class="spacer-1"></div>

                                        <div class="module_default-results">
                                            <!-- Prix enregistré dans la BDD -->
                                            <div v-if="price_MO!==-1">
                                                <span class="p2">
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_MO }} €</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer la batterie de votre téléphone.</span>
                                                </span>
                                            </div>

                                            <!-- Prix pas enregistré  -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>Malheureusement nous n'avons pas le prix moyen de main d'oeuvre nécessaire pour réparer la batterie de votre téléphone. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                </span>
                                            </div>   
                                        </div>

                                    </div>

                                    <div class="spacer-1"></div>

                                </div>

                                <!-- Si modèle dans la BDD -->
                                <div v-else>
                                    <div class="module-1">

                                        <div style="text-align: justify">
                                            <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                            <span class="p3"> Votre téléphone est bien enregistré chez TeleCoop, nous allons pouvoir vous aider ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <!-- Prix Global réparation  -->
                                        <div id="prix-repa">

                                            <div class="module-select-info">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Prix moyen de la réparation totale</span>
                                                <span class="tooltip-icon-prix-total" @click="handleClickToggle(5)">?</span>
                                            </div>
                                            <div class="tooltip-prix-total" :class="{ 'visible': uiParams.tooltipVisibleprixtotal }" style="text-align-last:center"> 
                                                <span>{{ tooltipsLabels.tooltip_labelprixprixtotal }}</span>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <div class="module_default-results" >

                                                <!-- Cas où il manque soit le prix composant soit le prix mo -->
                                                <div v-if="price_MO==-1||price_component==-1">
                                                    <span class="p2">
                                                            <span>Malheureusement nous ne pouvons vous fournir le prix moyen d'une réparation d'une batterie pour votre </span><span>{{ uiParams.selectedModele }}</span><span>. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                    </span>
                                                </div>

                                                <!-- On a à la fois le prix MO et le prix composant -->
                                                <div v-else>
                                                    <span class="p2">
                                                            <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_repa }} €</span><span> pour faire réparer la batterie de votre </span><span>{{ uiParams.selectedModele }} par un professionnel agréé.</span>
                                                        </span>
                                                </div>
                                            </div>

                                            <div v-if="reduc_etat>0||reduc_telecoop>0" class="spacer-1"></div>
                                            <div v-if="reduc_etat>0||reduc_telecoop>0" class="module_default-results-2">
                                                <div v-if="reduc_etat>0" class="p4">
                                                    <span>Profitez du Bonus Réparation sur cette intervention chez n'importe quel réparateur labellisé QualiRépar, pour une réduction à hauteur de </span><span style="font-weight: bold">{{ reduc_etat }} € sur votre facture finale.</span>
                                                </div>

                                                <div v-if="reduc_telecoop>0" class="p4">
                                                    <br>
                                                    <div v-if="uiParams.selectedTeleCoopOui">
                                                        <span>En tant que client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ reduc_telecoop }} € sur votre facture finale.</span>
                                                    </div>
                                                    <div v-else>
                                                        <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ reduc_telecoop }} € sur votre facture finale.</span>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <!-- Prix moyen composant -->
                                        <div id="prix-composant">

                                            <div class="module-select-info">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Prix moyen du composant</span>
                                                <span class="tooltip-icon-prix-composant" @click="handleClickToggle(1)">?</span>
                                            </div>
                                            <div class="tooltip-prix-composant" :class="{ 'visible': uiParams.tooltipVisibleprixcomposant }" style="text-align-last:center"> 
                                                <span>{{ tooltipsLabels.tooltip_labelprixcomposant }}</span>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <div class="module_default-results">
                                                <!-- Prix enregistré dans la BDD -->
                                                <div v-if="price_component!==-1">
                                                    <span class="p2">
                                                        <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_component }} €</span><span> pour racheter une nouvelle batterie pour votre </span><span>{{ uiParams.selectedModele }}.</span>
                                                    </span>
                                                </div>

                                                <!-- Prix pas enregistré  -->
                                                <div v-else>
                                                    <span class="p2">
                                                        <span>Malheureusement nous n'avons pas le prix moyen d'une batterie pour votre </span><span>{{ uiParams.selectedModele }}</span><span>. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                    </span>
                                                </div>   
                                            </div>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <!-- Prix moyen main d'oeuvre -->
                                        <div id="prix-mo">

                                            <div class="module-select-info">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Prix moyen de la main d'oeuvre</span>
                                                <span class="tooltip-icon-prix-mo" @click="handleClickToggle(6)">?</span>
                                            </div>
                                            <div class="tooltip-prix-mo" :class="{ 'visible': uiParams.tooltipVisibleprixmo }" style="text-align-last:center"> 
                                                <span>{{ tooltipsLabels.tooltip_labelprixmo }}</span>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <div class="module_default-results">
                                                <!-- Prix enregistré dans la BDD -->
                                                <div v-if="price_MO!==-1">
                                                    <span class="p2">
                                                        <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_MO }} €</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer la batterie de votre </span><span>{{ uiParams.selectedModele }}.</span>
                                                    </span>
                                                </div>

                                                <!-- Prix pas enregistré  -->
                                                <div v-else>
                                                    <span class="p2">
                                                        <span>Malheureusement nous n'avons pas le prix moyen de main d'oeuvre nécessaire pour réparer la batterie de votre </span><span>{{ uiParams.selectedModele }}</span><span>. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                    </span>
                                                </div>   
                                            </div>

                                        </div>

                                        <div class="spacer-1"></div>

                                        <!-- Score de réparabilité de votre téléphone -->
                                        <div v-if="scores.length>0">
                                            <div class="spacer-1"></div>
                                            <div class="spacer-1"></div>

                                            <div class="module-select-info" id="score-repa">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Les scores de durabilité de votre téléphone</span>
                                                <span class="tooltip-icon-scores" @click="handleClickToggle(4)">?</span>
                                            </div>
                                            <div class="tooltip-scores" :class="{ 'visible': uiParams.tooltipVisiblescores }" style="text-align-last:center"> 
                                                <span>{{ tooltipsLabels.tooltip_labelscores }}</span>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <div class="module_default-results">
                                                <div class="image-container">
                                                    <img v-for="(score, index) in scores" :key="index" :src="score" class="score-image" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div class="spacer-1"></div>

                                </div>
  
                            </div>

                            <!-- Smartphon qui n'est plus sous garantie -->
                            <div v-else>
                                
                                <!-- Si Modèle pas dans la BDD -->
                                <div v-if="uiParams.selectedModele==='autre'" class="module-1">
                                    
                                    <div style="text-align: justify">
                                        <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                        <span class="p3"> Même si votre téléphone n'est pas enregistré chez TeleCoop, nous allons pouvoir vous aider grâce à un téléphone type de la gamme </span><span class="p3">{{ uiParams.selectedMarque }}</span><span class="p3"> afin de vous donner les bons ordres de grandeurs ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Prix Global réparation  -->
                                    <div id="prix-repa">

                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Prix moyen de la réparation totale</span>
                                            <span class="tooltip-icon-prix-total" @click="handleClickToggle(5)">?</span>
                                        </div>
                                        <div class="tooltip-prix-total" :class="{ 'visible': uiParams.tooltipVisibleprixtotal }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelprixprixtotal }}</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <div class="module_default-results" >

                                            <!-- Cas où il manque soit le prix composant soit le prix mo -->
                                            <div v-if="price_MO==-1||price_component==-1">
                                                <span class="p2">
                                                        <span>Malheureusement nous ne pouvons vous fournir le prix moyen d'une réparation d'une batterie pour votre téléphone. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                </span>
                                            </div>

                                            <!-- On a à la fois le prix MO et le prix composant -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_repa }} €</span><span> pour faire réparer la batterie de votre téléphone par un professionnel agréé.</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div v-if="reduc_etat>0||reduc_telecoop>0" class="spacer-1"></div>
                                        <div v-if="reduc_etat>0||reduc_telecoop>0" class="module_default-results-2">
                                            <div v-if="reduc_etat>0" class="p4">
                                                <span>Profitez du Bonus Réparation sur cette intervention chez n'importe quel réparateur labellisé QualiRépar, pour une réduction à hauteur de </span><span style="font-weight: bold">{{ reduc_etat }} € sur votre facture finale.</span>
                                            </div>

                                            <div v-if="reduc_telecoop>0" class="p4">
                                                <br>
                                                <div v-if="uiParams.selectedTeleCoopOui">
                                                    <span>En tant que client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ reduc_telecoop }} € sur votre facture finale.</span>
                                                </div>
                                                <div v-else>
                                                    <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ reduc_telecoop }} € sur votre facture finale.</span>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Prix moyen composant -->
                                    <div id="prix-composant">

                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Prix moyen du composant</span>
                                            <span class="tooltip-icon-prix-composant" @click="handleClickToggle(1)">?</span>
                                        </div>
                                        <div class="tooltip-prix-composant" :class="{ 'visible': uiParams.tooltipVisibleprixcomposant }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelprixcomposant }}</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <div class="module_default-results">
                                            <!-- Prix enregistré dans la BDD -->
                                            <div v-if="price_component!==-1">
                                                <span class="p2">
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_component }} €</span><span> pour racheter une nouvelle batterie pour votre téléphone.</span>
                                                </span>
                                            </div>

                                            <!-- Prix pas enregistré  -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>Malheureusement nous n'avons pas le prix moyen d'une batterie pour votre téléphone. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                </span>
                                            </div>   
                                        </div>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Prix moyen main d'oeuvre -->
                                    <div id="prix-mo">

                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Prix moyen de la main d'oeuvre</span>
                                            <span class="tooltip-icon-prix-mo" @click="handleClickToggle(6)">?</span>
                                        </div>
                                        <div class="tooltip-prix-mo" :class="{ 'visible': uiParams.tooltipVisibleprixmo }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelprixmo }}</span>
                                        </div>


                                        <div class="spacer-1"></div>

                                        <div class="module_default-results">
                                            <!-- Prix enregistré dans la BDD -->
                                            <div v-if="price_MO!==-1">
                                                <span class="p2">
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_MO }} €</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer la batterie de votre téléphone.</span>
                                                </span>
                                            </div>

                                            <!-- Prix pas enregistré  -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>Malheureusement nous n'avons pas le prix moyen de main d'oeuvre nécessaire pour réparer la batterie de votre téléphone. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                </span>
                                            </div>   
                                        </div>

                                    </div>

                                    <div class="spacer-1"></div>

                                </div>

                                <!-- Si modèle dans la BDD -->
                                <div v-else>
                                    <div class="module-1">

                                        <div style="text-align: justify">
                                            <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                            <span class="p3"> Votre téléphone est bien enregistré chez TeleCoop, nous allons pouvoir vous aider ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <!-- Prix Global réparation  -->
                                        <div id="prix-repa">

                                            <div class="module-select-info">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Prix moyen de la réparation totale</span>
                                                <span class="tooltip-icon-prix-total" @click="handleClickToggle(5)">?</span>
                                            </div>
                                            <div class="tooltip-prix-total" :class="{ 'visible': uiParams.tooltipVisibleprixtotal }" style="text-align-last:center"> 
                                                <span>{{ tooltipsLabels.tooltip_labelprixprixtotal }}</span>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <div class="module_default-results" >

                                                <!-- Cas où il manque soit le prix composant soit le prix mo -->
                                                <div v-if="price_MO==-1||price_component==-1">
                                                    <span class="p2">
                                                            <span>Malheureusement nous ne pouvons vous fournir le prix moyen d'une réparation d'une batterie pour votre </span><span>{{ uiParams.selectedModele }}</span><span>. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                    </span>
                                                </div>

                                                <!-- On a à la fois le prix MO et le prix composant -->
                                                <div v-else>
                                                    <span class="p2">
                                                            <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_repa }} €</span><span> pour faire réparer la batterie de votre </span><span>{{ uiParams.selectedModele }} par un professionnel agréé.</span>
                                                        </span>
                                                </div>
                                            </div>

                                            <div v-if="reduc_etat>0||reduc_telecoop>0" class="spacer-1"></div>
                                            <div v-if="reduc_etat>0||reduc_telecoop>0" class="module_default-results-2">
                                                <div v-if="reduc_etat>0" class="p4">
                                                    <span>Profitez du Bonus Réparation sur cette intervention chez n'importe quel réparateur labellisé QualiRépar, pour une réduction à hauteur de </span><span style="font-weight: bold">{{ reduc_etat }} € sur votre facture finale.</span>
                                                </div>

                                                <div v-if="reduc_telecoop>0" class="p4">
                                                    <br>
                                                    <div v-if="uiParams.selectedTeleCoopOui">
                                                        <span>En tant que client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ reduc_telecoop }} € sur votre facture finale.</span>
                                                    </div>
                                                    <div v-else>
                                                        <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ reduc_telecoop }} € sur votre facture finale.</span>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <!-- Prix moyen composant -->
                                        <div id="prix-composant">

                                            <div class="module-select-info">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Prix moyen du composant</span>
                                                <span class="tooltip-icon-prix-composant" @click="handleClickToggle(1)">?</span>
                                            </div>
                                            <div class="tooltip-prix-composant" :class="{ 'visible': uiParams.tooltipVisibleprixcomposant }" style="text-align-last:center"> 
                                                <span>{{ tooltipsLabels.tooltip_labelprixcomposant }}</span>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <div class="module_default-results">
                                                <!-- Prix enregistré dans la BDD -->
                                                <div v-if="price_component!==-1">
                                                    <span class="p2">
                                                        <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_component }} €</span><span> pour racheter une nouvelle batterie pour votre </span><span>{{ uiParams.selectedModele }}.</span>
                                                    </span>
                                                </div>

                                                <!-- Prix pas enregistré  -->
                                                <div v-else>
                                                    <span class="p2">
                                                        <span>Malheureusement nous n'avons pas le prix moyen d'une batterie pour votre </span><span>{{ uiParams.selectedModele }}</span><span>. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                    </span>
                                                </div>   
                                            </div>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <!-- Prix moyen main d'oeuvre -->
                                        <div id="prix-mo">

                                            <div class="module-select-info">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Prix moyen de la main d'oeuvre</span>
                                                <span class="tooltip-icon-prix-mo" @click="handleClickToggle(6)">?</span>
                                            </div>
                                            <div class="tooltip-prix-mo" :class="{ 'visible': uiParams.tooltipVisibleprixmo }" style="text-align-last:center"> 
                                                <span>{{ tooltipsLabels.tooltip_labelprixmo }}</span>
                                            </div>


                                            <div class="spacer-1"></div>

                                            <div class="module_default-results">
                                                <!-- Prix enregistré dans la BDD -->
                                                <div v-if="price_MO!==-1">
                                                    <span class="p2">
                                                        <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_MO }} €</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer la batterie de votre </span><span>{{ uiParams.selectedModele }}.</span>
                                                    </span>
                                                </div>

                                                <!-- Prix pas enregistré  -->
                                                <div v-else>
                                                    <span class="p2">
                                                        <span>Malheureusement nous n'avons pas le prix moyen de main d'oeuvre nécessaire pour réparer la batterie de votre </span><span>{{ uiParams.selectedModele }}</span><span>. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                    </span>
                                                </div>   
                                            </div>

                                        </div>

                                        <div class="spacer-1"></div>

                                        <!-- Score de réparabilité de votre téléphone -->
                                        <div v-if="scores.length>0">
                                            <div class="spacer-1"></div>
                                            <div class="spacer-1"></div>

                                            <div class="module-select-info" id="score-repa">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Les scores de durabilité de votre téléphone</span>
                                                <span class="tooltip-icon-scores" @click="handleClickToggle(4)">?</span>
                                            </div>
                                            <div class="tooltip-scores" :class="{ 'visible': uiParams.tooltipVisiblescores }" style="text-align-last:center"> 
                                                <span>{{ tooltipsLabels.tooltip_labelscores }}</span>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <div class="module_default-results">
                                                <div class="image-container">
                                                    <img v-for="(score, index) in scores" :key="index" :src="score" class="score-image" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div class="spacer-1"></div>
                                
                            </div>

                            <div class="spacer-1"></div>

                            <div class="button-wrapper-4">
                            <div class="btn-3">
                                <button @click="handleClickSelf(uiParams)">Je préfère réparer moi-même mon téléphone</button>
                            </div>
                            <div class="btn-4">
                                <button @click="handleClickChgt(uiParams)">Je préfère changer de téléphone</button>
                            </div>
                        </div>

                        </div>


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

                        <div class="module-text-info" id="text-info">
                            <span class="p2">80% de l'impact d'un mobile réside dans sa fabrication d'après l'ADEME. Les Français changent en moyenne de mobile tous les 2 ans alors qu'il fonctionne encore. Dans un effort commun de réduction de nos émission, il est donc important d'essayer de conserver son mobile le plus longtemps possible ! En faisant réparer votre téléphone, vous réduisez non seulement vos déchets, votre impact environnemental de votre usage numérique, mais aussi l'impact sur votre portefeuille.
                            </span>
                        </div>

                        <div class="spacer-1"></div>

                        <div clas="button-wrapper-3">
                            <div class="btn-2">
                                <button>Je souhaite quand même découvrir les téléphones durables de la gamme TeleCoop</button>
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
            <div v-for="(item, index) in Object.values(bonnes_pratiques_autonomie)" :key="index" class="bullet-item">
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
    import { titresPages, bonnes_pratiques_autonomie,annees } from '@/config/uiParams.js';
    import uiParams from '@/config/uiParams.js';
    import { tooltipsLabels } from '@/config/uiParams.js';
    import { uncheckOthersGarantie, uncheckOthersTeleCoop,openRepairerLink,toggleSection, showSuggestions, selectCP,handleClickChgt,handleClickRepar,handleClickSelf,toggleTooltip } from '@/controller/controller';
    import { cpVilles,marques,getModelsForMarque,getPriceComponentForModel, getLinkTuto, getListOutils, getScoresRepa, getPriceRepa, getPriceMOForModel, getReducEtat, getReducTeleCoop } from '@/model/model.js';
    
    /**
     * Retourne les Modèles Associés à une marque en particulier
     */
    const modelsForSelectedMarque = computed(() => {
      return getModelsForMarque(uiParams.selectedMarque).map(model => model[1]);
    });

    /**
     * Retourne le prix de la pièce de réparation pour un téléphone donné
     */
    const price_component = computed(()=>{
        if (uiParams.selectedModele!==""&&uiParams.selectedMarque!=""){
            const p = getPriceComponentForModel(uiParams.selectedModele,uiParams.selectedMarque,'batterie');
            const price = p[0];
            return price;
        } else {
            return null
        }
    });

    /**
     * Retourne le prix de la main d'oeuvre de réparation pour un téléphone donné
     */
    const price_MO = computed (()=>{
        if (uiParams.selectedModele!==""&&uiParams.selectedMarque!=""){
            const p = getPriceMOForModel(uiParams.selectedModele,uiParams.selectedMarque,'batterie');
            const price = p[0];
            return price;
        } else {
            return null
        }
    });

    /**
     * Retourne le prix de global de réparation pour un téléphone donné
     */
    const price_repa = computed (()=>{
        if (uiParams.selectedModele!==""&&uiParams.selectedMarque!=""){
            const price = getPriceRepa(uiParams.selectedModele,uiParams.selectedMarque,'batterie');
            return price;
        } else {
            return null
        }
    });

    /**
     * Retourne le liens de tutoriel pour la réaration d'un téléphone donné
     */
    const link_tuto = computed(()=>{
        if (uiParams.selectedModele!==""&&uiParams.selectedMarque!=""){
            const t = getLinkTuto(uiParams.selectedModele,'batterie');
            const tuto = t[0];
            return tuto;
        } else {
            return null
        }
    });

    /**
     * Retourne la liste de matériel nécessaire pour un réparation de téléphone
     */
    const liste_outils = computed(()=>{
        if (uiParams.selectedModele!==""&&uiParams.selectedMarque!=""){
            const l = getListOutils(uiParams.selectedModele,'batterie');
            const liste = l[0];
            return liste;
        } else {
            return null
        }
    });

    /**
     * Retourne les liens des images des scores des téléphones
     */
    const scores = computed(()=>{
        if (uiParams.selectedModele!==""&&uiParams.selectedMarque!=""){
            const s = getScoresRepa(uiParams.selectedModele);
            return s;
        } else {
            return null
        }
    });

    /**
     * Retourne le prix de la réduction telecoop pour un téléphone donné
     */
    const reduc_telecoop = computed(()=>{
        if (uiParams.selectedModele!==""&&uiParams.selectedMarque!=""){
            const reduc = getReducTeleCoop(uiParams.selectedModele,uiParams.selectedMarque,'batterie');
            return reduc;
        } else {
            return null
        }
    });

    /**
     * Retourne le prix du bonus réparabilité pour un téléphone donné
     */
    const reduc_etat = computed(()=>{
        if (uiParams.selectedModele!==""&&uiParams.selectedMarque!=""){
            const reduc = getReducEtat(uiParams.selectedModele,uiParams.selectedMarque,'batterie');
            return reduc;
        } else {
            return null
        }
    });

    /**
     * Assure qu'une seule cache de la catégorie "votre téléphone est-il encore sous garantie" est cochée
     * @param index 
     */
    const handleClickGarantie = (index) => {
        uncheckOthersGarantie(uiParams,index);
    }  ;

    /**
     * Assure qu'une seule cache de la catégorie "êtes vous client telecoop" est cochée
     * @param index 
     */
    const handleClickTeleCoop = (index) => {
        uncheckOthersTeleCoop(uiParams,index);
    }  ;

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
     * Gère l'affichage des tooltips au click de l'icone
     */
    const handleClickToggle =(index)=>{
        toggleTooltip(uiParams,index)
    };

    // Déohe automatiquement les tooltips si click autre part
    document.addEventListener('click', function(event) {
        var tooltip = document.querySelector('.tooltip-prix-composant');
        var tooltip1 = document.querySelector('.tooltip-tutos');
        var tooltip2 = document.querySelector('.tooltip-outils');
        var tooltip3 = document.querySelector('.tooltip-scores');
        var tooltip4 = document.querySelector('.tooltip-prix-total');
        var tooltip5 = document.querySelector('.tooltip-prix-mo');
        var tooltipIcon = document.querySelector('.tooltip-icon-prix-composant');
        var tooltipIcon1 = document.querySelector('.tooltip-icon-tutos');
        var tooltipIcon2 = document.querySelector('.tooltip-icon-outils');
        var tooltipIcon3 = document.querySelector('.tooltip-icon-scores');
        var tooltipIcon4 = document.querySelector('.tooltip-icon-prix-total');
        var tooltipIcon5 = document.querySelector('.tooltip-icon-prix-mo');


        // Vérifie si le clic n'est pas à l'intérieur du tooltip ni sur l'icône du tooltip
        if (tooltip && !tooltip.contains(event.target) && !tooltipIcon.contains(event.target)) {
            // Si le clic est en dehors, masque le tooltip
            uiParams.tooltipVisibleprixcomposant = false;
        } if (tooltip1 && !tooltip1.contains(event.target) && !tooltipIcon1.contains(event.target)) {
            // Si le clic est en dehors, masque le tooltip
            uiParams.tooltipVisibletutos = false;
        } if (tooltip2 && !tooltip2.contains(event.target) && !tooltipIcon2.contains(event.target)) {
            // Si le clic est en dehors, masque le tooltip
            uiParams.tooltipVisibleoutils = false;
        } if (tooltip3 && !tooltip3.contains(event.target) && !tooltipIcon3.contains(event.target)) {
            // Si le clic est en dehors, masque le tooltip
            uiParams.tooltipVisiblescores = false;
        } if (tooltip4 && !tooltip4.contains(event.target) && !tooltipIcon4.contains(event.target)) {
            // Si le clic est en dehors, masque le tooltip
            uiParams.tooltipVisibleprixtotal = false;
        } if (tooltip5 && !tooltip5.contains(event.target) && !tooltipIcon5.contains(event.target)) {
            // Si le clic est en dehors, masque le tooltip
            uiParams.tooltipVisibleprixmo = false;
        }

        
    });
    
</script>

<style setup>
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

