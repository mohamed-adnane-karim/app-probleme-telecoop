<template id="page-type">
    <body>
        <header class="wrapper-titre">
                <h1>
                    <span>{{ titrePage }}</span>
                </h1>
        </header>

        <header class="wrapper-sous-titre" id="sous-titre">
                <p class="p1">
                    <span>TeleCoop vous accompagne pour conserver votre mobile le plus longtemps possible.</span> <span>{{ soustitrePage }}</span>
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

                        <div class="module-select-info" id="selection-os">
                            <span class="bullet-1"></span>
                            <span class="p2">Quelle est l'OS de votre téléphone actuel ?*</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedOS" id="marque">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="OS in os_api" :key="OS" :value="OS">{{ OS }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-marque">
                            <span class="bullet-1"></span>
                            <span class="p2">Quelle est la marque de votre téléphone actuel ?*</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedMarque" id="marque">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="marque in marquesForSelectedOSAPI" :key="marque" :value="marque">{{ marque }}</option>
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
                                    <option v-for="modele in modelesForSelectedOSandMarqueAPI" :key="modele" :value="modele">{{ modele }}</option>
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
                            <span>{{ souslabelRéparationDIY }}</span>
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
                                    
                                    <!-- Cas où il n'y a pas de tuto remplacement  -->
                                    <div v-if="uiParams.dicId===null" style="text-align: justify">
                                        <span class="p3">Malheureusement il n'y a pour l'instant pas de tutoriel de réparation pour</span>
                                        <span class="p3">{{ le_la }}</span>
                                        <span class="p3">de votre téléphone disponible sur le site de notre partenaire. Nous faisons au mieux pour remédier à ce problème au plus vite !</span>
                                    </div>

                                    <!-- Cas où il y a un tuto remplacement  -->
                                    <div v-else>
                                        <div style="text-align: justify">
                                            <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                            <span class="p3"> Votre téléphone est bien enregistré chez TeleCoop, nous allons pouvoir vous aider ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <div v-if="uiParams.reparinfos">
                                            <span class="p3" style="font-weight: bold">Temps moyen de réparation : </span><span class="p3">{{ translatedTimeRequired }}.</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <div v-if="uiParams.reparinfos">
                                            <span class="p3" style="font-weight: bold">Difficulté estimée de la réparation : </span><span class="p3">{{ translatedDifficulty }}.</span>
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

                                            <!-- Affichage du prix moyen des composants -->
                                            <div class="module_default-results">

                                                <!-- Pas d'infos sur le prix = il n'y a pas de parts renseignées sur iFixit-->
                                                <div v-if="uiParams.reparinfos==null||uiParams.reparinfos.parts.length==0||totalPrice==0" style="text-align: justify">
                                                    <span class="p2">Malheureusement nous n'avons pas le prix moyen</span>
                                                    <span class="p2">{{ dun_dune }}</span> 
                                                    <span class="p2">pour votre </span><span class="p2">{{ uiParams.selectedModele }}</span><span class="p2">. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                </div>

                                                <!-- On peut obtenir le prix des composants -->
                                                <div v-else>
                                                    <span class="p2">
                                                        <span>En moyenne, comptez </span><span style="font-weight: bold">{{ totalPrice }} €</span><span> pour acheter les composants nécessaires listés ci-dessous afin de changer</span>
                                                        <span>{{ le_la }}</span>
                                                        <span>de votre </span><span>{{ uiParams.selectedModele }}.</span>
                                                    </span>
                                                </div>

                                            </div>

                                            <div class="spacer-1"></div>

                                            <!-- Affichage de chauqe pièce nécessaire -->
                                            <div class="module_default-results-1">
                                                <!-- Pas d'infos sur le besoin de piève-->
                                                <div v-if="uiParams.reparinfos==null||uiParams.reparinfos.parts.length==0" style="text-align: justify; text-align-last: center">
                                                    <span class="p2">Malheureusement nous ne savons pas quels composants et pièces sont nécessaires pour changer</span>
                                                    <span class="p2">{{ le_la }}</span> 
                                                    <span class="p2">de votre {{ uiParams.selectedModele }}. Il se peut que vous trouviez cette information directement sur le tutoriel fournit en haut. Nous faisons au plus vite pour y remédier !</span>
                                                </div>

                                                <div v-else>

                                                    <div class="spacer-1"></div>

                                                    <div class="p2" style="text-align: center">
                                                        <span>Pour se lancer dans la réparation de</span>
                                                        <span>{{ votre }}</span>
                                                        <span>vous aurez besoin des pièces suivantes :</span>
                                                        <br>
                                                    </div>

                                                    <div class="spacer-1"></div>

                                                    <div class="p2" style="display: flex; flex-wrap: wrap;">

                                                        <div v-for="(outil,index) in uiParams.reparinfos.parts" class="tools-item">

                                                            <div v-if="!outil.isoptional" class="p2" style="display: flex; align-items: center;">
                                                                <div v-if="outil.thumbnail">
                                                                    <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                                </div>
                                                                <div v-else>
                                                                    <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                                </div>
                                                                
                                                                <div class="wrapper-price-tools" >

                                                                    <!-- Cas où le lien de la pièce est valide -->
                                                                    <div v-if="outil.url.startsWith('http')||outil.url.startsWith('https')" class="label-tools-mandatory">
                                                                        <a :href="outil.url" target="_blank" class="label-tools-mandatory">{{ outil.text }}</a>
                                                                    </div>

                                                                    <!-- Cas où le lien n'est pas valide  -->
                                                                    <div v-else class="label-tools-mandatory">
                                                                        <span class="label-tools-mandatory">{{ outil.text }}</span>
                                                                    </div>

                                                                    <!-- Affichage des prix des composants si existant -->
                                                                    <div v-for="(partPrices,index) in listPartsPrices">
                                                                        <span v-if="partPrices[0]==outil.text&&partPrices[2]!='0,0 €'">{{partPrices[2]}}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div v-else class="p2" style="display: flex; align-items: center;">
                                                                <div v-if="outil.thumbnail">
                                                                    <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                                </div>
                                                                <div v-else>
                                                                    <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                                </div>
                                                                <div class="wrapper-price-tools">

                                                                    <!-- Cas où le lien de la pièce est valide -->
                                                                    <div v-if="outil.url.startsWith('http')||outil.url.startsWith('https')">
                                                                        <a :href="outil.url" target="_blank" class="label-optionnel">{{ outil.text }}</a>
                                                                        <span class="label-optionnel">(Optionnel)</span>
                                                                    </div>

                                                                    <!-- Cas où le lien de la pièce n'est pas valide -->
                                                                    <div v-else>
                                                                        <span class="label-optionnel">{{ outil.text }}</span>
                                                                        <span class="label-optionnel">(Optionnel)</span>
                                                                    </div>

                                                                    <!-- Affichage des prix si existant des pièces -->
                                                                    <div v-for="(partPrices,index) in listPartsPrices">
                                                                        <span v-if="partPrices[0]==outil.text&&partPrices[2]!='0,0 €'">{{partPrices[2]}}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    
                                                
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
                                                <span class="p2">
                                                    <span>Vous pouvez consulter le tutoriel pour changer</span>
                                                    <span>{{ le_la }}</span>
                                                    <span>votre </span><span>{{ uiParams.selectedModele }} </span> <span></span>
                                                    <a :href="uiParams.reparinfos.url" target="_blank">en cliquant ici</a>
                                                    <span>.</span>
                                                </span>
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

                                                <!-- Pas besoin d'outils ou pas d'infos -->
                                                <div v-if="uiParams.reparinfos==null||uiParams.reparinfos.tools.length==0" style="text-align: justify">
                                                    <span class="p2">Malheureusement nous ne savons pas si du matériel spécifique est nécessaire pour changer</span>
                                                    <span class="p2">{{ le_la }}</span> 
                                                    <span class="p2">de votre {{ uiParams.selectedModele }}. Il se peut que vous trouviez cette information directement sur le tutoriel fournit en haut. Nous faisons au plus vite pour y remédier !</span>
                                                </div>

                                                <!-- Besoin d'outils -->
                                                <div v-else>
                                                    <div class="spacer-1"></div>

                                                    <div class="p2" style="text-align: center">
                                                        <span>Afin de vous lancer dans la réparation de</span>
                                                        <span>{{ votre }}</span>
                                                        <span>vous aurez besoin des outils suivants :</span>
                                                        <br>
                                                    </div>

                                                    <div class="spacer-1"></div>

                                                    <div class="p2" style="display: flex; flex-wrap: wrap;">
                                                        <div v-for="(outil,index) in uiParams.reparinfos.tools" class="tools-item">

                                                            <div v-if="!outil.isoptional" class="p2" style="display: flex; align-items: center;">
                                                                <div v-if="outil.thumbnail">
                                                                    <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                                </div>
                                                                <div v-else>
                                                                    <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                                </div>
                                                                <div class="wrapper-price-tools">

                                                                    <!-- Cas où l'url de l'objet est valide -->
                                                                    <div v-if="outil.url.startsWith('http') || outil.url.startsWith('https')" class="label-tools-mandatory">
                                                                        <a :href="outil.url" target="_blank" class="label-tools-mandatory">{{ outil.text }}</a>
                                                                    </div>

                                                                    <!-- Cas où l'url de l'objet n'est pas valide -->
                                                                    <div v-else class="label-tools-mandatory">
                                                                        <span class="label-tools-mandatory">{{ outil.text }}</span>
                                                                    </div>

                                                                    <!-- Affichage du prix de l'objet si existant -->
                                                                    <div v-for="(toolPrices,index) in listToolsPrices">
                                                                        <span v-if="toolPrices[0]==outil.text&&toolPrices[2]!='0,0 €'">{{toolPrices[2]}}</span>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div v-else class="p2" style="display: flex; align-items: center;">
                                                                <div v-if="outil.thumbnail">
                                                                    <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                                </div>
                                                                <div v-else>
                                                                    <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                                </div>
                                                                <div class="wrapper-price-tools">

                                                                    <!-- Cas où l'url de l'objet est valide -->
                                                                    <div v-if="outil.url.startsWith('http') || outil.url.startsWith('https')" class="label-optionnel">
                                                                        <a :href="outil.url" target="_blank"  class="label-optionnel" >{{ outil.text }}</a>
                                                                        <span class="label-optionnel" >(Optionnel)</span>
                                                                    </div>

                                                                    <!-- Cas où l'url de l'objet n'est pas valide -->
                                                                    <div v-else class="label-optionnel">
                                                                        <span>{{ outil.text }}</span>
                                                                        <span >(Optionnel)</span>
                                                                    </div>

                                                                    <!-- Affichage du prix des objets si existants -->
                                                                    <div v-for="(toolPrices,index) in listToolsPrices">
                                                                        <span v-if="toolPrices[0]==outil.text&&toolPrices[2]!='0,0 €'">{{toolPrices[2]}}</span>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <!-- Score de réparabilité de votre téléphone -->
                                        <div id="score-reparabilite">

                                            <div class="module-select-info" id="score-repa">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Le score de réparabilité de votre téléphone</span>
                                                <span class="tooltip-icon-scores" @click="handleClickToggle(4)">?</span>
                                            </div>
                                            <div class="tooltip-scores" :class="{ 'visible': uiParams.tooltipVisiblescores }" style="text-align-last:center"> 
                                                <span>{{ tooltipsLabels.tooltip_labelscores }}</span>
                                            </div>
                                            <div class="spacer-1"></div>

                                            <div class="module_default-results">
                                                <!-- Cas où le score ifixit existe -->
                                                <div v-if="uiParams.score!=null">
                                                    <div class="image-container">
                                                        <div v-for="(link, index) in link_picture" :key="index" >
                                                            <img v-if="link!=0" :src="link" class="score-image" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Cas où le score ifixit n'existe pas  -->
                                                <div v-else style="text-align: justify">
                                                    <span class="p2">Malheureusement iFixit n'a pas encore attribué un score de réparabilité à votre {{ uiParams.selectedModele }}. Nous faisons au plus vite pour y remédier !</span>
                                                </div>
                                            
                                            </div>
                                        </div>

                                    </div>
                                    
                                    <div class="spacer-1"></div>   
                                    

                                </div>
  
                            </div>

                            <!-- Cas où le téléphone n'est plus sous garantie -->
                            <div v-else class="module-1">

                                <!-- Cas où il n'y a pas de tuto remplacement  -->
                                <div v-if="uiParams.dicId===null" style="text-align: justify">
                                    <span class="p3">Malheureusement il n'y a pour l'instant pas de tutoriel de réparation pour</span>
                                    <span class="p3">{{ le_la }}</span>
                                    <span class="p3">de votre téléphone disponible sur le site de notre partenaire. Nous faisons au mieux pour remédier à ce problème au plus vite !</span>
                                </div>

                                <!-- Cas où il y a un tuto remplacement  -->
                                <div v-else>
                                    <div style="text-align: justify">
                                        <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                        <span class="p3"> Votre téléphone est bien enregistré chez TeleCoop, nous allons pouvoir vous aider ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                    </div>

                                    <div class="spacer-1"></div>

                                    <div v-if="uiParams.reparinfos">
                                        <span class="p3" style="font-weight: bold">Temps moyen de réparation : </span><span class="p3">{{ translatedTimeRequired }}.</span>
                                    </div>

                                    <div class="spacer-1"></div>

                                    <div v-if="uiParams.reparinfos">
                                        <span class="p3" style="font-weight: bold">Difficulté estimée de la réparation : </span><span class="p3">{{ translatedDifficulty }}.</span>
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

                                        <!-- Affichage du prix moyen des composants -->
                                        <div class="module_default-results">

                                            <!-- Pas d'infos sur le prix = il n'y a pas de parts renseignées sur iFixit-->
                                            <div v-if="uiParams.reparinfos==null||uiParams.reparinfos.parts.length==0||totalPrice==0" style="text-align: justify">
                                                <span class="p2">Malheureusement nous n'avons pas le prix moyen</span>
                                                <span class="p2">{{ dun_dune }}</span> 
                                                <span class="p2">pour votre </span><span class="p2">{{ uiParams.selectedModele }}</span><span class="p2">. Nous faisons tout pour remédier à cela au plus vite!</span>
                                            </div>

                                            <!-- On peut obtenir le prix des composants -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ totalPrice }} €</span><span> pour acheter les composants nécessaires listés ci-dessous afin de changer</span>
                                                    <span>{{ le_la }}</span>
                                                    <span>de votre </span><span>{{ uiParams.selectedModele }}.</span>
                                                </span>
                                            </div>

                                        </div>

                                        <div class="spacer-1"></div>

                                        <!-- Affichage de chauqe pièce nécessaire -->
                                        <div class="module_default-results-1">
                                            <!-- Pas d'infos sur le besoin de piève-->
                                            <div v-if="uiParams.reparinfos==null||uiParams.reparinfos.parts.length==0" style="text-align: justify; text-align-last: center">
                                                <span class="p2">Malheureusement nous ne savons pas quels composants et pièces sont nécessaires pour changer</span>
                                                <span class="p2">{{ le_la }}</span> 
                                                <span class="p2">de votre {{ uiParams.selectedModele }}. Il se peut que vous trouviez cette information directement sur le tutoriel fournit en haut. Nous faisons au plus vite pour y remédier !</span>
                                            </div>

                                            <div v-else>

                                                <div class="spacer-1"></div>

                                                <div class="p2" style="text-align: center">
                                                    <span>Pour se lancer dans la réparation de</span>
                                                    <span>{{ votre }}</span>
                                                    <span>vous aurez besoin des pièces suivantes :</span>
                                                    <br>
                                                </div>

                                                <div class="spacer-1"></div>

                                                <div class="p2" style="display: flex; flex-wrap: wrap;">

                                                    <div v-for="(outil,index) in uiParams.reparinfos.parts" class="tools-item">

                                                        <div v-if="!outil.isoptional" class="p2" style="display: flex; align-items: center;">
                                                            <div v-if="outil.thumbnail">
                                                                <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                            </div>
                                                            <div v-else>
                                                                <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                            </div>
                                                            
                                                            <div class="wrapper-price-tools" >

                                                                <!-- Cas où le lien de la pièce est valide -->
                                                                <div v-if="outil.url.startsWith('http')||outil.url.startsWith('https')" class="label-tools-mandatory">
                                                                    <a :href="outil.url" target="_blank" class="label-tools-mandatory">{{ outil.text }}</a>
                                                                </div>

                                                                <!-- Cas où le lien n'est pas valide  -->
                                                                <div v-else class="label-tools-mandatory">
                                                                    <span class="label-tools-mandatory">{{ outil.text }}</span>
                                                                </div>

                                                                <!-- Affichage des prix des composants si existant -->
                                                                <div v-for="(partPrices,index) in listPartsPrices">
                                                                    <span v-if="partPrices[0]==outil.text&&partPrices[2]!='0,0 €'">{{partPrices[2]}}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div v-else class="p2" style="display: flex; align-items: center;">
                                                            <div v-if="outil.thumbnail">
                                                                <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                            </div>
                                                            <div v-else>
                                                                <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                            </div>
                                                            <div class="wrapper-price-tools">

                                                                <!-- Cas où le lien de la pièce est valide -->
                                                                <div v-if="outil.url.startsWith('http')||outil.url.startsWith('https')">
                                                                    <a :href="outil.url" target="_blank" class="label-optionnel">{{ outil.text }}</a>
                                                                    <span class="label-optionnel">(Optionnel)</span>
                                                                </div>

                                                                <!-- Cas où le lien de la pièce n'est pas valide -->
                                                                <div v-else>
                                                                    <span class="label-optionnel">{{ outil.text }}</span>
                                                                    <span class="label-optionnel">(Optionnel)</span>
                                                                </div>

                                                                <!-- Affichage des prix si existant des pièces -->
                                                                <div v-for="(partPrices,index) in listPartsPrices">
                                                                    <span v-if="partPrices[0]==outil.text&&partPrices[2]!='0,0 €'">{{partPrices[2]}}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                
                                            
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
                                            <span class="p2">
                                                <span>Vous pouvez consulter le tutoriel pour changer</span>
                                                <span>{{ le_la }}</span>
                                                <span>votre </span><span>{{ uiParams.selectedModele }} </span> <span></span>
                                                <a :href="uiParams.reparinfos.url" target="_blank">en cliquant ici</a>
                                                <span>.</span>
                                            </span>
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

                                            <!-- Pas besoin d'outils ou pas d'infos -->
                                            <div v-if="uiParams.reparinfos==null||uiParams.reparinfos.tools.length==0" style="text-align: justify">
                                                <span class="p2">Malheureusement nous ne savons pas si du matériel spécifique est nécessaire pour changer</span>
                                                <span class="p2">{{ le_la }}</span> 
                                                <span class="p2">de votre {{ uiParams.selectedModele }}. Il se peut que vous trouviez cette information directement sur le tutoriel fournit en haut. Nous faisons au plus vite pour y remédier !</span>
                                            </div>

                                            <!-- Besoin d'outils -->
                                            <div v-else>
                                                <div class="spacer-1"></div>

                                                <div class="p2" style="text-align: center">
                                                    <span>Afin de vous lancer dans la réparation de</span>
                                                    <span>{{ votre }}</span>
                                                    <span>vous aurez besoin des outils suivants :</span>
                                                    <br>
                                                </div>

                                                <div class="spacer-1"></div>

                                                <div class="p2" style="display: flex; flex-wrap: wrap;">
                                                    <div v-for="(outil,index) in uiParams.reparinfos.tools" class="tools-item">

                                                        <div v-if="!outil.isoptional" class="p2" style="display: flex; align-items: center;">
                                                            <div v-if="outil.thumbnail">
                                                                <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                            </div>
                                                            <div v-else>
                                                                <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                            </div>
                                                            <div class="wrapper-price-tools">

                                                                <!-- Cas où l'url de l'objet est valide -->
                                                                <div v-if="outil.url.startsWith('http') || outil.url.startsWith('https')" class="label-tools-mandatory">
                                                                    <a :href="outil.url" target="_blank" class="label-tools-mandatory">{{ outil.text }}</a>
                                                                </div>

                                                                <!-- Cas où l'url de l'objet n'est pas valide -->
                                                                <div v-else class="label-tools-mandatory">
                                                                    <span class="label-tools-mandatory">{{ outil.text }}</span>
                                                                </div>

                                                                <!-- Affichage du prix de l'objet si existant -->
                                                                <div v-for="(toolPrices,index) in listToolsPrices">
                                                                    <span v-if="toolPrices[0]==outil.text&&toolPrices[2]!='0,0 €'">{{toolPrices[2]}}</span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div v-else class="p2" style="display: flex; align-items: center;">
                                                            <div v-if="outil.thumbnail">
                                                                <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                            </div>
                                                            <div v-else>
                                                                <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                            </div>
                                                            <div class="wrapper-price-tools">

                                                                <!-- Cas où l'url de l'objet est valide -->
                                                                <div v-if="outil.url.startsWith('http') || outil.url.startsWith('https')" class="label-optionnel">
                                                                    <a :href="outil.url" target="_blank"  class="label-optionnel" >{{ outil.text }}</a>
                                                                    <span class="label-optionnel" >(Optionnel)</span>
                                                                </div>

                                                                <!-- Cas où l'url de l'objet n'est pas valide -->
                                                                <div v-else class="label-optionnel">
                                                                    <span>{{ outil.text }}</span>
                                                                    <span >(Optionnel)</span>
                                                                </div>

                                                                <!-- Affichage du prix des objets si existants -->
                                                                <div v-for="(toolPrices,index) in listToolsPrices">
                                                                    <span v-if="toolPrices[0]==outil.text&&toolPrices[2]!='0,0 €'">{{toolPrices[2]}}</span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Score de réparabilité de votre téléphone -->
                                    <div id="score-reparabilite">

                                        <div class="module-select-info" id="score-repa">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Le score de réparabilité de votre téléphone</span>
                                            <span class="tooltip-icon-scores" @click="handleClickToggle(4)">?</span>
                                        </div>
                                        <div class="tooltip-scores" :class="{ 'visible': uiParams.tooltipVisiblescores }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelscores }}</span>
                                        </div>
                                        <div class="spacer-1"></div>

                                        <div class="module_default-results">
                                            <!-- Cas où le score ifixit existe -->
                                            <div v-if="uiParams.score!=null">
                                                <div class="image-container">
                                                    <div v-for="(link, index) in link_picture" :key="index" >
                                                        <img v-if="link!=0" :src="link" class="score-image" />
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Cas où le score ifixit n'existe pas  -->
                                            <div v-else style="text-align: justify">
                                                <span class="p2">Malheureusement iFixit n'a pas encore attribué un score de réparabilité à votre {{ uiParams.selectedModele }}. Nous faisons au plus vite pour y remédier !</span>
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
                                    <router-link to="/AutreProbleme" style="text-decoration: none; width:100%">
                                        <button>Je rencontre un autre type de problème</button>
                                    </router-link>
                                </div>
                            </div>


                        </div>

                        <div class="spacer-1"></div> 

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

                        <div class="module-select-info" id="selection-os">
                            <span class="bullet-1"></span>
                            <span class="p2">Quelle est l'OS de votre téléphone actuel ?*</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedOS" id="marque">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="OS in os_api" :key="OS" :value="OS">{{ OS }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="spacer-1"></div>

                        <div class="module-select-info" id="selection-marque">
                            <span class="bullet-1"></span>
                            <span class="p2">Quelle est la marque de votre téléphone actuel ?*</span>
                            <div class="custom-select">
                                <select v-model="uiParams.selectedMarque" id="marque">
                                    <option value="" disabled selected>  Veuillez faire votre choix  </option>
                                    <option v-for="marque in marquesForSelectedOSAPI" :key="marque" :value="marque">{{ marque }}</option>
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
                                    <option v-for="modele in modelesForSelectedOSandMarqueAPI" :key="modele" :value="modele">{{ modele }}</option>
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
                                    
                                     <!-- Cas où il n'y a pas de tuto remplacement  -->
                                    <div v-if="uiParams.dicId===null" style="text-align: justify">

                                        <div v-if="uiParams.dicId===null" style="text-align: justify">
                                            <span class="p3">Malheureusement il n'y a, pour l'instant, pas toutes les informations de réparation nécessaires concernant</span>
                                            <span class="p3">{{ le_la }}</span>
                                            <span class="p3">de votre téléphone disponible sur le site de notre partenaire. Nous faisons au mieux pour remédier à ce problème au plus vite !</span>
                                        </div>

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
                                                <div class='p2'>
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ taux_moyen_MO }} € / heure</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer {{ le_la }} de votre téléphone.</span>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <!-- Reduction  -->
                                        <div id="reductions">

                                            <div class="module-select-info">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Réductions disponibles</span>
                                                <span class="tooltip-icon-prix-total" @click="handleClickToggle(5)">?</span>
                                            </div>
                                            <div class="tooltip-prix-total" :class="{ 'visible': uiParams.tooltipVisibleprixtotal }" style="text-align-last:center"> 
                                                <span>{{ tooltipsLabels.tooltip_labelprixprixtotal }}</span>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <div class="module_default-results-2">

                                                <!-- S'il y a un bonus réparation -->
                                                <div v-if="bonus_reparation>0">

                                                    <div class="p4">
                                                        <span>Profitez du Bonus Réparation de l'Etat sur cette intervention chez n'importe quel réparateur labellisé QualiRépar, pour une réduction à hauteur de </span><span style="font-weight: bold">{{ bonus_reparation }} € sur votre facture finale.</span>
                                                    </div>

                                                    <div v-if="bonus_telecoop>0" class="p4">
                                                        <br>
                                                        <div v-if="uiParams.selectedTeleCoopOui">
                                                            <span>En tant que client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                        </div>
                                                        <div v-else>
                                                            <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                        </div>
                                                    </div>

                                                </div>

                                                <!-- S'il n'y a pas de bonus réparation -->

                                                <div v-else>

                                                    <div v-if="bonus_telecoop>0" class="p4">
                                                        <br>
                                                        <div v-if="uiParams.selectedTeleCoopOui">
                                                            <span>En tant que client TeleCoop, en passant chez n'importe quel réparateur labellisé QualiRépar, vous bénéficiez d'une réduction de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                        </div>
                                                        <div v-else>
                                                            <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour bénéficier d'une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                        </div>
                                                    </div>

                                                    <div v-else class="p4">
                                                        <span>Malheureusement le changement et/ou la réparation</span><span>{{ dun_dune }}</span><span> de </span><span>{{ uiParams.selectedModele }}</span><span> n'est pour l'instant éligible à aucune réduction.</span>
                                                    </div>

                                                </div>


                                                
                                            </div>

                                        </div>

                                    </div>

                                    <!-- Cas où il y a un tuto remplacement  -->
                                    <div v-else>

                                        <div style="text-align: justify">
                                            <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                            <span class="p3"> Votre téléphone est bien enregistré chez TeleCoop, nous allons pouvoir vous aider ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <div v-if="uiParams.reparinfos">
                                            <span class="p3" style="font-weight: bold">Temps moyen de réparation : </span><span class="p3">{{ translatedTimeRequired }}.</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <div v-if="uiParams.reparinfos">
                                            <span class="p3" style="font-weight: bold">Difficulté estimée de la réparation : </span><span class="p3">{{ translatedDifficulty }}.</span>
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

                                            <!-- Affichage du prix global -->
                                            <div class="module_default-results">

                                                <!-- Cas où il manque soit le prix composant soit le prix mo -->
                                                <div v-if="parseFloat(totalPrice)==0||calculatePriceMO(uiParams.reparinfos.time_required,taux_moyen_MO)==0">
                                                    <span class="p2">
                                                            <span>Malheureusement nous ne pouvons vous fournir le prix moyen d'une réparation d'un écran pour votre téléphone. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                    </span>
                                                </div>

                                                <!-- On a à la fois le prix MO et le prix composant -->
                                                <div v-else>
                                                    <span class="p2">
                                                        <span>En moyenne, comptez </span><span style="font-weight: bold">{{ calculatePriceMO(uiParams.reparinfos.time_required,taux_moyen_MO) + parseFloat(totalPrice) }} €</span><span> pour faire réparer l'écran de votre téléphone par un professionnel agréé.</span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <!-- Bonus Réparations -->
                                            <div class="module_default-results-2" id="bonus-de-reparations">

                                                <!-- S'il y a un bonus réparation -->
                                                <div v-if="bonus_reparation>0">

                                                    <div class="p4">
                                                        <span>Profitez du Bonus Réparation de l'Etat sur cette intervention chez n'importe quel réparateur labellisé QualiRépar, pour une réduction à hauteur de </span><span style="font-weight: bold">{{ bonus_reparation }} € sur votre facture finale.</span>
                                                    </div>

                                                    <div v-if="bonus_telecoop>0" class="p4">
                                                        <br>
                                                        <div v-if="uiParams.selectedTeleCoopOui">
                                                            <span>En tant que client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                        </div>
                                                        <div v-else>
                                                            <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                        </div>
                                                    </div>

                                                </div>

                                                <!-- S'il n'y a pas de bonus réparation -->
                                                <div v-else>

                                                    <div v-if="bonus_telecoop>0" class="p4">
                                                        <br>
                                                        <div v-if="uiParams.selectedTeleCoopOui">
                                                            <span>En tant que client TeleCoop, en passant chez n'importe quel réparateur labellisé QualiRépar, vous bénéficiez d'une réduction de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                        </div>
                                                        <div v-else>
                                                            <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour bénéficier d'une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                        </div>
                                                    </div>

                                                    <div v-else class="p4">
                                                        <span>Malheureusement le changement et/ou la réparation</span><span>{{ dun_dune }}</span><span> de </span><span>{{ uiParams.selectedModele }}</span><span> n'est pour l'instant éligible à aucune réduction.</span>
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

                                            <!-- Affichage du prix moyen des composants -->
                                            <div class="module_default-results">

                                                <!-- Pas d'infos sur le prix = il n'y a pas de parts renseignées sur iFixit-->
                                                <div v-if="uiParams.reparinfos.parts==null||totalPrice==0" style="text-align: justify">
                                                    <span class="p2">Malheureusement nous n'avons pas le prix moyen</span>
                                                    <span class="p2">{{ dun_dune }}</span> 
                                                    <span class="p2">pour votre </span><span class="p2">{{ uiParams.selectedModele }}</span><span class="p2">. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                </div>

                                                <!-- On peut obtenir le prix des composants -->
                                                <div v-else>
                                                    <span class="p2">
                                                        <span>En moyenne, comptez </span><span style="font-weight: bold">{{ totalPrice }} €</span><span> pour acheter les composants nécessaires listés ci-dessous afin de changer</span>
                                                        <span>{{ le_la }}</span>
                                                        <span>de votre </span><span>{{ uiParams.selectedModele }}.</span>
                                                    </span>
                                                </div>

                                            </div>

                                            <div class="spacer-1"></div>

                                            <!-- Affichage de chauqe pièce nécessaire -->
                                            <div class="module_default-results-1">
                                                <!-- Pas d'infos sur le besoin de piève-->
                                                <div v-if="uiParams.reparinfos.parts.length==0" style="text-align: justify; text-align-last: center">
                                                    <span class="p2">Malheureusement nous ne savons pas quels composants et pièces sont nécessaires pour changer</span>
                                                    <span class="p2">{{ le_la }}</span> 
                                                    <span class="p2">de votre {{ uiParams.selectedModele }}. Il se peut que vous trouviez cette information directement sur le tutoriel fournit en haut. Nous faisons au plus vite pour y remédier !</span>
                                                </div>

                                                <div v-else>

                                                    <div class="spacer-1"></div>

                                                    <div class="p2" style="text-align: center">
                                                        <span>Pour se lancer dans la réparation de</span>
                                                        <span>{{ votre }}</span>
                                                        <span>vous aurez besoin des pièces suivantes :</span>
                                                        <br>
                                                    </div>

                                                    <div class="spacer-1"></div>

                                                    <div class="p2" style="display: flex; flex-wrap: wrap;">

                                                        <div v-for="(outil,index) in uiParams.reparinfos.parts" class="tools-item">

                                                            <div v-if="!outil.isoptional" class="p2" style="display: flex; align-items: center;">
                                                                <div v-if="outil.thumbnail">
                                                                    <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                                </div>
                                                                <div v-else>
                                                                    <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                                </div>
                                                                
                                                                <div class="wrapper-price-tools" >

                                                                    <!-- Cas où le lien de la pièce est valide -->
                                                                    <div v-if="outil.url.startsWith('http')||outil.url.startsWith('https')" class="label-tools-mandatory">
                                                                        <a :href="outil.url" target="_blank" class="label-tools-mandatory">{{ outil.text }}</a>
                                                                    </div>

                                                                    <!-- Cas où le lien n'est pas valide  -->
                                                                    <div v-else class="label-tools-mandatory">
                                                                        <span class="label-tools-mandatory">{{ outil.text }}</span>
                                                                    </div>

                                                                    <!-- Affichage des prix des composants si existant -->
                                                                    <div v-for="(partPrices,index) in listPartsPrices">
                                                                        <span v-if="partPrices[0]==outil.text&&partPrices[2]!='0,0 €'">{{partPrices[2]}}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div v-else class="p2" style="display: flex; align-items: center;">
                                                                <div v-if="outil.thumbnail">
                                                                    <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                                </div>
                                                                <div v-else>
                                                                    <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                                </div>
                                                                <div class="wrapper-price-tools">

                                                                    <!-- Cas où le lien de la pièce est valide -->
                                                                    <div v-if="outil.url.startsWith('http')||outil.url.startsWith('https')">
                                                                        <a :href="outil.url" target="_blank" class="label-optionnel">{{ outil.text }}</a>
                                                                        <span class="label-optionnel">(Optionnel)</span>
                                                                    </div>

                                                                    <!-- Cas où le lien de la pièce n'est pas valide -->
                                                                    <div v-else>
                                                                        <span class="label-optionnel">{{ outil.text }}</span>
                                                                        <span class="label-optionnel">(Optionnel)</span>
                                                                    </div>

                                                                    <!-- Affichage des prix si existant des pièces -->
                                                                    <div v-for="(partPrices,index) in listPartsPrices">
                                                                        <span v-if="partPrices[0]==outil.text&&partPrices[2]!='0,0 €'">{{partPrices[2]}}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    
                                                
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

                                            <!-- Cas où on a pu calculer le prix exact de main d'oeuvre de réparation -->
                                            <div v-if="calculatePriceMO(uiParams.reparinfos.time_required,taux_moyen_MO)>0" class="module_default-results">

                                                <!-- Le prix calculé ne vaut pas 0 -->
                                                <div class='p2'>
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ calculatePriceMO(uiParams.reparinfos.time_required,taux_moyen_MO) }} €</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer {{ le_la }} de votre téléphone.</span>
                                                </div>

                                            </div>

                                            <!-- Cas où on a juste le taux moyen horaire -->
                                            <div v-else class="module_default-results">
                                                <div class='p2'>
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ taux_moyen_MO }} € / heure</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer {{ le_la }} de votre téléphone.</span>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <!-- Score de réparabilité de votre téléphone -->
                                        <div id="score-reparabilite">

                                            <div class="module-select-info" id="score-repa">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Le score de réparabilité de votre téléphone</span>
                                                <span class="tooltip-icon-scores" @click="handleClickToggle(4)">?</span>
                                            </div>
                                            <div class="tooltip-scores" :class="{ 'visible': uiParams.tooltipVisiblescores }" style="text-align-last:center"> 
                                                <span>{{ tooltipsLabels.tooltip_labelscores }}</span>
                                            </div>
                                            <div class="spacer-1"></div>

                                            <div class="module_default-results">
                                                <!-- Cas où le score ifixit existe -->
                                                <div v-if="uiParams.score!=null">
                                                    <div class="image-container">
                                                        <div v-for="(link, index) in link_picture" :key="index" >
                                                            <img v-if="link!=0" :src="link" class="score-image" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Cas où le score ifixit n'existe pas  -->
                                                <div v-else style="text-align: justify">
                                                    <span class="p2">Malheureusement iFixit n'a pas encore attribué un score de réparabilité à votre {{ uiParams.selectedModele }}. Nous faisons au plus vite pour y remédier !</span>
                                                </div>
                                            
                                            </div>
                                        </div>

                                    </div>

                                    <div class="spacer-1"></div>

                                </div>    
  
                            </div>

                            <!-- Smartphon qui n'est plus sous garantie -->
                            <div v-else class="module-1">

                                <!-- Cas où il n'y a pas de tuto remplacement  -->
                                <div v-if="uiParams.dicId===null" style="text-align: justify">

                                    <div v-if="uiParams.dicId===null" style="text-align: justify">
                                        <span class="p3">Malheureusement il n'y a, pour l'instant, pas toutes les informations de réparation nécessaires concernant</span>
                                        <span class="p3">{{ le_la }}</span>
                                        <span class="p3">de votre téléphone disponible sur le site de notre partenaire. Nous faisons au mieux pour remédier à ce problème au plus vite !</span>
                                    </div>

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
                                            <div class='p2'>
                                                <span>En moyenne, comptez </span><span style="font-weight: bold">{{ taux_moyen_MO }} € / heure</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer {{ le_la }} de votre téléphone.</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Reduction  -->
                                    <div id="reductions">

                                        <div class="module-select-info">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Réductions disponibles</span>
                                            <span class="tooltip-icon-prix-total" @click="handleClickToggle(5)">?</span>
                                        </div>
                                        <div class="tooltip-prix-total" :class="{ 'visible': uiParams.tooltipVisibleprixtotal }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelprixprixtotal }}</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <div class="module_default-results-2">

                                            <!-- S'il y a un bonus réparation -->
                                            <div v-if="bonus_reparation>0">

                                                <div class="p4">
                                                    <span>Profitez du Bonus Réparation de l'Etat sur cette intervention chez n'importe quel réparateur labellisé QualiRépar, pour une réduction à hauteur de </span><span style="font-weight: bold">{{ bonus_reparation }} € sur votre facture finale.</span>
                                                </div>

                                                <div v-if="bonus_telecoop>0" class="p4">
                                                    <br>
                                                    <div v-if="uiParams.selectedTeleCoopOui">
                                                        <span>En tant que client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                    </div>
                                                    <div v-else>
                                                        <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                    </div>
                                                </div>

                                            </div>

                                            <!-- S'il n'y a pas de bonus réparation -->

                                            <div v-else>

                                                <div v-if="bonus_telecoop>0" class="p4">
                                                    <br>
                                                    <div v-if="uiParams.selectedTeleCoopOui">
                                                        <span>En tant que client TeleCoop, en passant chez n'importe quel réparateur labellisé QualiRépar, vous bénéficiez d'une réduction de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                    </div>
                                                    <div v-else>
                                                        <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour bénéficier d'une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                    </div>
                                                </div>

                                                <div v-else class="p4">
                                                    <span>Malheureusement le changement et/ou la réparation</span><span>{{ dun_dune }}</span><span> de </span><span>{{ uiParams.selectedModele }}</span><span> n'est pour l'instant éligible à aucune réduction.</span>
                                                </div>

                                            </div>


                                            
                                        </div>

                                    </div>
                                    
                                </div>
                                
                                <!-- Cas où il y a un tuto remplacement  -->
                                <div v-else>
                                    <div style="text-align: justify">
                                        <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                        <span class="p3"> Votre téléphone est bien enregistré chez TeleCoop, nous allons pouvoir vous aider ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                    </div>

                                    <div class="spacer-1"></div>

                                    <div v-if="uiParams.reparinfos">
                                        <span class="p3" style="font-weight: bold">Temps moyen de réparation : </span><span class="p3">{{ translatedTimeRequired }}.</span>
                                    </div>

                                    <div class="spacer-1"></div>

                                    <div v-if="uiParams.reparinfos">
                                        <span class="p3" style="font-weight: bold">Difficulté estimée de la réparation : </span><span class="p3">{{ translatedDifficulty }}.</span>
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

                                        <!-- Affichage du prix global -->
                                        <div class="module_default-results">

                                            <!-- Cas où il manque soit le prix composant soit le prix mo -->
                                            <div v-if="parseFloat(totalPrice)==0||calculatePriceMO(uiParams.reparinfos.time_required,taux_moyen_MO)==0">
                                                <span class="p2">
                                                        <span>Malheureusement nous ne pouvons vous fournir le prix moyen d'une réparation d'un écran pour votre téléphone. Nous faisons tout pour remédier à cela au plus vite!</span>
                                                </span>
                                            </div>

                                            <!-- On a à la fois le prix MO et le prix composant -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ calculatePriceMO(uiParams.reparinfos.time_required,taux_moyen_MO) + parseFloat(totalPrice) }} €</span><span> pour faire réparer l'écran de votre téléphone par un professionnel agréé.</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <!-- Bonus Réparations -->
                                        <div class="module_default-results-2" id="bonus-de-reparations">

                                            <!-- S'il y a un bonus réparation -->
                                            <div v-if="bonus_reparation>0">

                                                <div class="p4">
                                                    <span>Profitez du Bonus Réparation de l'Etat sur cette intervention chez n'importe quel réparateur labellisé QualiRépar, pour une réduction à hauteur de </span><span style="font-weight: bold">{{ bonus_reparation }} € sur votre facture finale.</span>
                                                </div>

                                                <div v-if="bonus_telecoop>0" class="p4">
                                                    <br>
                                                    <div v-if="uiParams.selectedTeleCoopOui">
                                                        <span>En tant que client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                    </div>
                                                    <div v-else>
                                                        <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                    </div>
                                                </div>

                                            </div>

                                            <!-- S'il n'y a pas de bonus réparation -->
                                            <div v-else>

                                                <div v-if="bonus_telecoop>0" class="p4">
                                                    <br>
                                                    <div v-if="uiParams.selectedTeleCoopOui">
                                                        <span>En tant que client TeleCoop, en passant chez n'importe quel réparateur labellisé QualiRépar, vous bénéficiez d'une réduction de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                    </div>
                                                    <div v-else>
                                                        <span>En devenant client TeleCoop, cumulez les réductions en passant chez n'importe quel réparateur labellisé QualiRépar, pour bénéficier d'une réduction supplémentaire de </span><span style="font-weight: bold">{{ bonus_telecoop }} € sur votre facture finale.</span>
                                                    </div>
                                                </div>

                                                <div v-else class="p4">
                                                    <span>Malheureusement le changement et/ou la réparation</span><span>{{ dun_dune }}</span><span> de </span><span>{{ uiParams.selectedModele }}</span><span> n'est pour l'instant éligible à aucune réduction.</span>
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

                                        <!-- Affichage du prix moyen des composants -->
                                        <div class="module_default-results">

                                            <!-- Pas d'infos sur le prix = il n'y a pas de parts renseignées sur iFixit-->
                                            <div v-if="uiParams.reparinfos.parts==null||totalPrice==0" style="text-align: justify">
                                                <span class="p2">Malheureusement nous n'avons pas le prix moyen</span>
                                                <span class="p2">{{ dun_dune }}</span> 
                                                <span class="p2">pour votre </span><span class="p2">{{ uiParams.selectedModele }}</span><span class="p2">. Nous faisons tout pour remédier à cela au plus vite!</span>
                                            </div>

                                            <!-- On peut obtenir le prix des composants -->
                                            <div v-else>
                                                <span class="p2">
                                                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ totalPrice }} €</span><span> pour acheter les composants nécessaires listés ci-dessous afin de changer</span>
                                                    <span>{{ le_la }}</span>
                                                    <span>de votre </span><span>{{ uiParams.selectedModele }}.</span>
                                                </span>
                                            </div>

                                        </div>

                                        <div class="spacer-1"></div>

                                        <!-- Affichage de chauqe pièce nécessaire -->
                                        <div class="module_default-results-1">
                                            <!-- Pas d'infos sur le besoin de piève-->
                                            <div v-if="uiParams.reparinfos.parts.length==0" style="text-align: justify; text-align-last: center">
                                                <span class="p2">Malheureusement nous ne savons pas quels composants et pièces sont nécessaires pour changer</span>
                                                <span class="p2">{{ le_la }}</span> 
                                                <span class="p2">de votre {{ uiParams.selectedModele }}. Il se peut que vous trouviez cette information directement sur le tutoriel fournit en haut. Nous faisons au plus vite pour y remédier !</span>
                                            </div>

                                            <div v-else>

                                                <div class="spacer-1"></div>

                                                <div class="p2" style="text-align: center">
                                                    <span>Pour se lancer dans la réparation de</span>
                                                    <span>{{ votre }}</span>
                                                    <span>vous aurez besoin des pièces suivantes :</span>
                                                    <br>
                                                </div>

                                                <div class="spacer-1"></div>

                                                <div class="p2" style="display: flex; flex-wrap: wrap;">

                                                    <div v-for="(outil,index) in uiParams.reparinfos.parts" class="tools-item">

                                                        <div v-if="!outil.isoptional" class="p2" style="display: flex; align-items: center;">
                                                            <div v-if="outil.thumbnail">
                                                                <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                            </div>
                                                            <div v-else>
                                                                <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                            </div>
                                                            
                                                            <div class="wrapper-price-tools" >

                                                                <!-- Cas où le lien de la pièce est valide -->
                                                                <div v-if="outil.url.startsWith('http')||outil.url.startsWith('https')" class="label-tools-mandatory">
                                                                    <a :href="outil.url" target="_blank" class="label-tools-mandatory">{{ outil.text }}</a>
                                                                </div>

                                                                <!-- Cas où le lien n'est pas valide  -->
                                                                <div v-else class="label-tools-mandatory">
                                                                    <span class="label-tools-mandatory">{{ outil.text }}</span>
                                                                </div>

                                                                <!-- Affichage des prix des composants si existant -->
                                                                <div v-for="(partPrices,index) in listPartsPrices">
                                                                    <span v-if="partPrices[0]==outil.text&&partPrices[2]!='0,0 €'">{{partPrices[2]}}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div v-else class="p2" style="display: flex; align-items: center;">
                                                            <div v-if="outil.thumbnail">
                                                                <img :src="outil.thumbnail" class="picture-thumbnail"/>
                                                            </div>
                                                            <div v-else>
                                                                <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail"/>
                                                            </div>
                                                            <div class="wrapper-price-tools">

                                                                <!-- Cas où le lien de la pièce est valide -->
                                                                <div v-if="outil.url.startsWith('http')||outil.url.startsWith('https')">
                                                                    <a :href="outil.url" target="_blank" class="label-optionnel">{{ outil.text }}</a>
                                                                    <span class="label-optionnel">(Optionnel)</span>
                                                                </div>

                                                                <!-- Cas où le lien de la pièce n'est pas valide -->
                                                                <div v-else>
                                                                    <span class="label-optionnel">{{ outil.text }}</span>
                                                                    <span class="label-optionnel">(Optionnel)</span>
                                                                </div>

                                                                <!-- Affichage des prix si existant des pièces -->
                                                                <div v-for="(partPrices,index) in listPartsPrices">
                                                                    <span v-if="partPrices[0]==outil.text&&partPrices[2]!='0,0 €'">{{partPrices[2]}}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                
                                            
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

                                        <!-- Cas où on a pu calculer le prix exact de main d'oeuvre de réparation -->
                                        <div v-if="calculatePriceMO(uiParams.reparinfos.time_required,taux_moyen_MO)>0" class="module_default-results">

                                            <!-- Le prix calculé ne vaut pas 0 -->
                                            <div class='p2'>
                                                <span>En moyenne, comptez </span><span style="font-weight: bold">{{ calculatePriceMO(uiParams.reparinfos.time_required,taux_moyen_MO) }} €</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer {{ le_la }} de votre téléphone.</span>
                                            </div>

                                        </div>

                                        <!-- Cas où on a juste le taux moyen horaire -->
                                        <div v-else class="module_default-results">
                                            <div class='p2'>
                                                <span>En moyenne, comptez </span><span style="font-weight: bold">{{ taux_moyen_MO }} € / heure</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer {{ le_la }} de votre téléphone.</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Score de réparabilité de votre téléphone -->
                                    <div id="score-reparabilite">

                                        <div class="module-select-info" id="score-repa">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Le score de réparabilité de votre téléphone</span>
                                            <span class="tooltip-icon-scores" @click="handleClickToggle(4)">?</span>
                                        </div>
                                        <div class="tooltip-scores" :class="{ 'visible': uiParams.tooltipVisiblescores }" style="text-align-last:center"> 
                                            <span>{{ tooltipsLabels.tooltip_labelscores }}</span>
                                        </div>
                                        <div class="spacer-1"></div>

                                        <div class="module_default-results">
                                            <!-- Cas où le score ifixit existe -->
                                            <div v-if="uiParams.score!=null">
                                                <div class="image-container">
                                                    <div v-for="(link, index) in link_picture" :key="index" >
                                                        <img v-if="link!=0" :src="link" class="score-image" />
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Cas où le score ifixit n'existe pas  -->
                                            <div v-else style="text-align: justify">
                                                <span class="p2">Malheureusement iFixit n'a pas encore attribué un score de réparabilité à votre {{ uiParams.selectedModele }}. Nous faisons au plus vite pour y remédier !</span>
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
            <div v-for="(item, index) in Object.values(bonnes_pratiques_page)" :key="index" class="bullet-item">
                <div class="wrapper-pratiques-item">
                    <span class="bullet"></span>
                    <span>{{ item }}</span>
                </div>
            </div>
        </footer>
       
    </body>

</template>

<script>
    import { resetParams } from '@/controller/controller';
    import uiParams from '@/config/uiParams.js';

    export default {
    beforeRouteLeave(to, from, next) {
        resetParams(uiParams);
        next();
    }
    };

</script>

<script setup>
    import { computed, watch, watchEffect } from 'vue';
    import { annees } from '@/config/uiParams.js';
    import uiParams from '@/config/uiParams.js';
    import { getLexique, getReductions, getInfosReparation, getBonnesPratiques } from '@/config/automatisation.js';
    import { tooltipsLabels, difficultyTranslationDic, timeTranslationDic } from '@/config/uiParams.js';
    import { uncheckOthersGarantie, uncheckOthersTeleCoop,openRepairerLink,toggleSection, showSuggestions, selectCP,handleClickRepar,handleClickSelf,toggleTooltip, resetMarque, resetModel, resetOS } from '@/controller/controller';
    import { cpVilles } from '@/model/model.js';
    import { os_api,getMarquesForOSAPI,getModelesForMarqueAndOSAPI,updateGuide, updateScore, updateDicId ,updateInfosRepas, formatageParts, formatageTools, getLinkScorePictures, calculatePriceMO} from '@/model/modelAPI';
    import { getPriceFromUrl } from '@/model/extract';

    // 1 - Paramètres d'automatisation de la page via lexique.json

    // 1.1 - Bonnes pratiques
    const bonnes_pratiques_page = computed(()=>{
        return getBonnesPratiques(uiParams)
    });

    // 1.2 - Lexique des mots à employer
    const lexique = computed (()=>{
        return getLexique(uiParams)
    });
    
    const titrePage = computed(() => lexique.value[1]);
    const soustitrePage = computed(() => lexique.value[2]);
    const souslabelRéparationDIY = computed(() => lexique.value[3]);
    const le_la = computed(() => lexique.value[4]);
    const dun_dune = computed(() => lexique.value[5]);
    const votre = computed(() => lexique.value[6]);

    // 1.3 - ID de recherche pour faire apparaitre les infos grace à l'API
    const subject = computed(() => lexique.value[0]);

    // 1.4 - Taux moyen horaire main d'oeuvre appliqué au composant de la page 
    const reparations = computed (()=>{
        return getInfosReparation(uiParams)
    });

    const taux_moyen_MO = computed(()=>reparations.value[0])

    // 1.4 - Réductions appliquées au composant de la page 
    const reductions = computed (()=>{
        return getReductions(uiParams)
    });

    const bonus_reparation = computed (()=>reductions.value[0]);
    const bonus_telecoop = computed (()=>reductions.value[1]);

    
    // 2 - Traduction Anglais-Français

    /**
     * Traduit le paramètre uiParams.reparinfos.difficulty en français
     */
    const translatedDifficulty = computed(()=>{
        if(uiParams.reparinfos.difficulty){
            const difficultyEN = uiParams.reparinfos.difficulty.toLowerCase();
            return difficultyTranslationDic[difficultyEN] || uiParams.reparinfos.difficulty
        } else {
            return null
        }
        
    });

    /**
     * Traduit le paramètre uiParams.reparinfos.time_required en français
     */
    const translatedTimeRequired = computed(()=>{
        if(uiParams.reparinfos.time_required){
            const timeRequiredEN=uiParams.reparinfos.time_required
            return timeRequiredEN.replace(/(second|seconds|hour|hours|No estimate| - )/g, match => {
                if (match === ' - ') return ' à '; // Gestion spécifique du tiret entouré d'espaces
                return timeTranslationDic[match];
                }) || timeRequiredEN
        } else {
            return null
        }
        
    });

    // 3 - Fonctions nécessaires pour l'affichage des OS / Marques /modèles 

    /**
     * Calcule la liste des marques pour un OS sélectionné (sur l'API iFixit)
     */
    const marquesForSelectedOSAPI = computed (()=>{
        if (uiParams.selectedOS!=''){
            return getMarquesForOSAPI(uiParams.selectedOS).sort((a, b) => {
                if (a === "Autre") return 1; // "Autre" doit être à la fin
                if (b === "Autre") return -1; // "Autre" doit être à la fin
                return a.localeCompare(b); // Trier les autres marques par ordre lexicographique
            })
        } else {
            return null
        }
    });

    /**
     * Calcule la liste des modèles pour un OS sélectionné et une marque donnée(sur l'API iFixit)
     */
    const modelesForSelectedOSandMarqueAPI = computed (()=>{
        if (uiParams.selectedOS!=''&&uiParams.selectedMarque!=''){
            return getModelesForMarqueAndOSAPI(uiParams.selectedOS,uiParams.selectedMarque).sort()
        } else {
            return null
        }
    });

    // 4 - Les watch pour mettre à jour les informations de réparations et de recherche sur l'API dans le cas où le modèle de téléphne est changé

    // Utiliser un watch pour surveiller le changement de l'OS et remettre à 0 les valeurs de modèles de téléphones
    watch(()=> uiParams.selectedOS, async (newOS) => {
        resetOS(newOS,uiParams)
    });

    // Utiliser un watch pour surveiller le changement de marque et remettre à 0 les valeurs de modèles de téléphones
    watch(()=> uiParams.selectedMarque, async (newMarque) => {
        resetMarque(newMarque,uiParams)
    });

    // Utiliser un watch pour surveiller le changement de modèle et remettre à 0 les valeurs de modèles de téléphones
    watch(()=> uiParams.selectedModele, async (newModele) => {
        resetModel(newModele,uiParams)
    });


    // Utiliser un watch pour surveiller les changements de selectedModel et donc mettre à jour uiParams.guide si maj
    watch(() => uiParams.selectedModele, async (newMarque) => {
        await updateGuide(newMarque,uiParams);
    });

    // Utiliser un watch pour surveiller les changements et mettre à jour automatiquement la valeur de l'ID du guide contenant la réparation du composant sélectionné
    watch (()=>{
        if (subject){
            updateDicId(uiParams,subject.value)
        }
    });

    // Utiliser un watch pour surveiller les changements de selectedModel et donc mettre à jour uiParams.guide si maj
    watch(() => uiParams.selectedModele, async (newMarque) => {
        await updateScore(newMarque,uiParams);
    });

     // Utiliser un watch pour surveiller les changements de dicId et donc mettre à jour uiParams.reparinfos si maj
     watch(() => uiParams.dicId, async (newDicId) => {
        await updateInfosRepas(uiParams,newDicId);
    });

    // 5 - Fonctions de calculs

    // 5.1 - Fonction pour récupérer et calculer les prix des composants
    const fetchAndCalculatePrices = async () => {
        if (uiParams.reparinfos != null) {
            const prov = formatageParts(uiParams);
            const promises = prov.map(async (el) => {
                const calculatedPrice = await getPriceFromUrl(el[1]);
                el[2] = calculatedPrice || el[2]; // Garde la valeur initiale si l'obtention échoue
                return el;
            });
            uiParams.listComposants = await Promise.all(promises);
        } else {
            uiParams.listComposants = [];
        }
    };

    // Utiliser watchEffect pour surveiller les changements et mettre à jour les composants
    watchEffect(() => {
        fetchAndCalculatePrices();
    });

    // 5.2 - Fonction pour récupérer et calculer les prix des outils
     const fetchAndCalculatePricesTools = async () => {
        if (uiParams.reparinfos != null) {
            const prov = formatageTools(uiParams);
            const promises = prov.map(async (el) => {
                const calculatedPrice = await getPriceFromUrl(el[1]);
                el[2] = calculatedPrice || el[2]; // Garde la valeur initiale si l'obtention échoue
                return el;
            });
            uiParams.listTools = await Promise.all(promises);
        } else {
            uiParams.listTools = [];
        }
    };

    // Utiliser watchEffect pour surveiller les changements et mettre à jour les outils
    watchEffect(() => {
        fetchAndCalculatePricesTools();
    });

    // 5.3 - Calculer le prix total des composants
    const totalPrice = computed(() => {
        if (uiParams.reparinfos.parts){
            return uiParams.listComposants.reduce((sum, item) => {
            const price = parseFloat(item[2].replace('€', '').replace(',', '.')) || 0;
            return sum + price;
        }, 0).toFixed(2); // Utilisation de toFixed(2) pour limiter à 2 décimales
        } else {
            return 0
        }
    });

    // 6 - Mise en forme de certaines listes et paramètres pour les résultats

    // 6.1 - Liste des prix des outils pour réparation
    const listToolsPrices = computed (()=>{
        const tools= uiParams.listTools;
        return tools
    });

    // 6.2 - Liste des prix des pièces pour réparation
    const listPartsPrices = computed (()=>{
        const parts= uiParams.listComposants;
        return parts
    });

    // 6.3 - Création du lien image pour l'affihage du score iFixit
    const link_picture = computed (()=>{
        if (uiParams.selectedModele!=''){
            return getLinkScorePictures(uiParams);
        } else {
            return null;
        }
    });

    // 7 - Fonctions gérant certaines restrictions sur les clicks
    

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

    // 8 - Fonctions pour gérer l'affichage des CP

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

    // 9 - Fonctions spécifiques aux tooltips
  
    // 9.1 - Fonction pour masquer les suggestions lorsque l'utilisateur clique en dehors de la zone de saisie de CP
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

    // 9.2 - Affichage des tooltips au click

    /**
     * Gère l'affichage des tooltips au click de l'icone
     */
    const handleClickToggle =(index)=>{
        toggleTooltip(uiParams,index)
    };

    // Décoche automatiquement les tooltips si click autre part
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

