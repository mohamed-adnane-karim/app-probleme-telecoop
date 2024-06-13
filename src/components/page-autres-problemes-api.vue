<template id="page-type">
    <body>
        <header class="wrapper-titre">
                <h1>
                    <span>Je rencontre un autre type de problème</span>
                </h1>
        </header>

        <header class="wrapper-sous-titre" id="sous-titre">
                <p class="p1">
                    <span>TeleCoop vous accompagne pour conserver votre mobile le plus longtemps possible.</span> <span>Identifions votre problème ensemble afin de trouver la bonne solution !</span>
                </p>
        </header>

        <div class="module_default-1" :class="{'module_default-1-expanded' : uiParams.isOneSectionOpen}">

            <section class="section-container"  id="je-repare-moi-meme">

                <div class="section-header" @click="toggleSection(1,uiParams)" :class="{ 'section-header-expanded': uiParams.isSection1Open }">
                    <span>QUEL PROBLEME RENCONTREZ-VOUS ?</span>
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
                            <span>Les tutoriels associées</span>
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
                                            <span class="label-text">JE SOUHAITE TOUT DE MEME ME RENSEIGNER SUR COMMENT REPARER MON TELEPHONE</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="spacer-1"></div>

                                <div v-if="uiParams.selectedContinuer">     

                                    <!-- Cas où il n'y a aucune info de réparation sur le site d'iFixit -->
                                    <div v-if="uiParams.guide==null" style="text-align: justify">
                                        <span class="p3">Malheureusement il n'y a pour l'instant aucune information de réparation pour votre {{ uiParams.selectedModele }} sur le site de notre partenaire. Nous faisons au plus vite pour y remédier ! N'hésitez pas à passer par un réparateur labellisé afin de faire diagnostiquer votre téléphone.</span>
                                    </div>

                                    <!-- Cas où il y a des infos de réparations sur le site d'iFixit -->
                                    <div v-else>
                                        
                                        <div style="text-align: justify">
                                            <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                            <span class="p3"> Votre téléphone est bien enregistré chez TeleCoop, nous allons pouvoir vous aider ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <!-- Score de réparabilité de votre téléphone -->
                                        <div id="score-reparabilite">

                                            <div class="module-select-info" id="score-repa">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Le score de réparabilité de votre téléphone</span>
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

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <!-- Les tutoriels de remplacement existant  -->
                                        <div id="remplacement">

                                            <div class="module-select-info" id="tech">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Tutoriels de remplacement</span>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <!-- Il existe des techniques -->
                                            <div  v-if="uiParams.listReplacement.length>0" class="module_default-results-1">

                                                <div class="p2" style="display: flex; flex-wrap: wrap;">

                                                    <div v-for="(technique,index) in Object.values(uiParams.listReplacement)" :key="index" class="technique-item">

                                                        <div class="p2" style="display: flex; align-items: center;">

                                                            <!-- Si l'image existe -->
                                                            <div v-if="technique[3]!=0&&technique[3]">
                                                                <img :src="technique[3]" class="picture-thumbnail-1"/>
                                                            </div>

                                                            <!-- Si elle n'existe pas -->
                                                            <div v-else>
                                                                <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail-1"/>
                                                            </div>

                                                            <!-- Affichage des techniques -->
                                                            <div class="wrapper-price-tools">

                                                                <!-- Cas où l'url de la technique est valide -->
                                                                <div v-if="technique[1].startsWith('http') || technique[1].startsWith('https')" class="label-technique">
                                                                    <a :href="technique[1]" target="_blank" class="label-technique">{{ technique[0] }}</a>
                                                                </div>

                                                                <!--Affichage de la difficulté de la technqiue si existante -->
                                                                <div id="difficulté">
                                                                    <span class="label-difficulty">Difficulté : {{translatedDifficulty(technique[2])}}</span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                            <!-- Il n'en existe pas -->
                                            <div v-else class="module_default-results" style="text-align: justify">
                                                <span class="p3">Malheureusement il n'y a pour l'instant aucune tutoriel de remplacement disponible pour votre {{ uiParams.selectedModele }} sur le site de notre partenaire. Nous faisons au plus vite pour y remédier ! N'hésitez pas à passer par un réparateur labellisé afin de faire diagnostiquer votre téléphone.</span>
                                            </div>

                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>


                                        <!-- Les techniques disponibles -->
                                        <div id="techniques">

                                            <div class="module-select-info" id="tech">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Tutoriels de techniques</span>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <!-- Il existe des techniques -->
                                            <div  v-if="uiParams.listTechniques.length>0" class="module_default-results-1">

                                                <div class="p2" style="display: flex; flex-wrap: wrap;">

                                                    <div v-for="(technique,index) in Object.values(uiParams.listTechniques)" :key="index" class="technique-item">

                                                        <div class="p2" style="display: flex; align-items: center;">

                                                            <!-- Si l'image existe -->
                                                            <div v-if="technique[3]!=0&&technique[3]">
                                                                <img :src="technique[3]" class="picture-thumbnail-1"/>
                                                            </div>

                                                            <!-- Si elle n'existe pas -->
                                                            <div v-else>
                                                                <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail-1"/>
                                                            </div>

                                                            <!-- Affichage des techniques -->
                                                            <div class="wrapper-price-tools">

                                                                <!-- Cas où l'url de la technique est valide -->
                                                                <div v-if="technique[1].startsWith('http') || technique[1].startsWith('https')" class="label-technique">
                                                                    <a :href="technique[1]" target="_blank" class="label-technique">{{ technique[0] }}</a>
                                                                </div>

                                                                <!--Affichage de la difficulté de la technqiue si existante -->
                                                                <div id="difficulté">
                                                                    <span class="label-difficulty">Difficulté : {{translatedDifficulty(technique[2])}}</span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                            <!-- Il n'en existe pas -->
                                            <div v-else class="module_default-results" style="text-align: justify">
                                                <span class="p3">Malheureusement il n'y a pour l'instant aucune technique de réparation disponible pour votre {{ uiParams.selectedModele }} sur le site de notre partenaire. Nous faisons au plus vite pour y remédier ! N'hésitez pas à passer par un réparateur labellisé afin de faire diagnostiquer votre téléphone.</span>
                                            </div>
                                        </div>

                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>
                                        <div class="spacer-1"></div>

                                        <!-- Les tutoriels annexes -->
                                        <div id="tutoAnnexe">

                                            <div class="module-select-info" id="tech">
                                                <span class="bullet-1"></span>
                                                <span class="p3" style="font-weight: bold">Diagnostic et tutoriels annexes</span>
                                            </div>

                                            <div class="spacer-1"></div>

                                            <!-- Il existe des techniques -->
                                            <div  v-if="uiParams.listrelatedtutos.length>0" class="module_default-results-1">

                                                <div class="p2" style="display: flex; flex-wrap: wrap;">

                                                    <div v-for="(technique,index) in Object.values(uiParams.listrelatedtutos)" :key="index" class="technique-item">

                                                        <div class="p2" style="display: flex; align-items: center;">

                                                            <!-- Si l'image existe -->
                                                            <div v-if="technique[2]!=0&&technique[2]">
                                                                <img :src="technique[2]" class="picture-thumbnail-1"/>
                                                            </div>

                                                            <!-- Si elle n'existe pas -->
                                                            <div v-else>
                                                                <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail-1"/>
                                                            </div>

                                                            <!-- Affichage des techniques -->
                                                            <div class="wrapper-price-tools">

                                                                <!-- Cas où l'url de la technique est valide -->
                                                                <div v-if="technique[1].startsWith('http') || technique[1].startsWith('https')" class="label-technique">
                                                                    <a :href="technique[1]" target="_blank" class="label-technique">{{ technique[0] }}</a>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                            <!-- Il n'en existe pas -->
                                            <div v-else class="module_default-results" style="text-align: justify">
                                                <span class="p3">Malheureusement il n'y a pour l'instant aucun diagnostic disponible pour votre {{ uiParams.selectedModele }} sur le site de notre partenaire. Nous faisons au plus vite pour y remédier ! N'hésitez pas à passer par un réparateur labellisé afin de faire diagnostiquer votre téléphone.</span>
                                            </div>
                                            </div>

                                    </div>

                                    <div class="spacer-1"></div>   
                                    
                                </div>
  
                            </div>

                            <!-- Cas où le téléphone n'est plus sous garantie -->
                            <div v-else class="module-1">

                                <!-- Cas où il n'y a aucune info de réparation sur le site d'iFixit -->
                                <div v-if="uiParams.guide==null" style="text-align: justify">
                                    <span class="p3">Malheureusement il n'y a pour l'instant aucune information de réparation pour votre {{ uiParams.selectedModele }} sur le site de notre partenaire. Nous faisons au plus vite pour y remédier ! N'hésitez pas à passer par un réparateur labellisé afin de faire diagnostiquer votre téléphone.</span>
                                </div>

                                <!-- Cas où il y a des infos de réparations sur le site d'iFixit -->
                                <div v-else>
                                    
                                    <div style="text-align: justify">
                                        <span class="p3" style="font-weight: bold">Bonne nouvelle ! </span> 
                                        <span class="p3"> Votre téléphone est bien enregistré chez TeleCoop, nous allons pouvoir vous aider ! Nous vous guidons pas à pas tout au long du processus de réparation.</span>
                                    </div>

                                    <div class="spacer-1"></div>

                                    <!-- Score de réparabilité de votre téléphone -->
                                    <div id="score-reparabilite">

                                        <div class="module-select-info" id="score-repa">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Le score de réparabilité de votre téléphone</span>
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

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Les tutoriels de remplacement existant  -->
                                    <div id="remplacement">

                                        <div class="module-select-info" id="tech">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Tutoriels de remplacement</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <!-- Il existe des techniques -->
                                        <div  v-if="uiParams.listReplacement.length>0" class="module_default-results-1">

                                            <div class="p2" style="display: flex; flex-wrap: wrap;">

                                                <div v-for="(technique,index) in Object.values(uiParams.listReplacement)" :key="index" class="technique-item">

                                                    <div class="p2" style="display: flex; align-items: center;">

                                                        <!-- Si l'image existe -->
                                                        <div v-if="technique[3]!=0&&technique[3]">
                                                            <img :src="technique[3]" class="picture-thumbnail-1"/>
                                                        </div>

                                                        <!-- Si elle n'existe pas -->
                                                        <div v-else>
                                                            <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail-1"/>
                                                        </div>

                                                        <!-- Affichage des techniques -->
                                                        <div class="wrapper-price-tools">

                                                            <!-- Cas où l'url de la technique est valide -->
                                                            <div v-if="technique[1].startsWith('http') || technique[1].startsWith('https')" class="label-technique">
                                                                <a :href="technique[1]" target="_blank" class="label-technique">{{ technique[0] }}</a>
                                                            </div>

                                                            <!--Affichage de la difficulté de la technqiue si existante -->
                                                            <div id="difficulté">
                                                                <span class="label-difficulty">Difficulté : {{translatedDifficulty(technique[2])}}</span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <!-- Il n'en existe pas -->
                                        <div v-else class="module_default-results" style="text-align: justify">
                                            <span class="p3">Malheureusement il n'y a pour l'instant aucune tutoriel de remplacement disponible pour votre {{ uiParams.selectedModele }} sur le site de notre partenaire. Nous faisons au plus vite pour y remédier ! N'hésitez pas à passer par un réparateur labellisé afin de faire diagnostiquer votre téléphone.</span>
                                        </div>

                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>


                                    <!-- Les techniques disponibles -->
                                    <div id="techniques">

                                        <div class="module-select-info" id="tech">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Tutoriels de techniques</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <!-- Il existe des techniques -->
                                        <div  v-if="uiParams.listTechniques.length>0" class="module_default-results-1">

                                            <div class="p2" style="display: flex; flex-wrap: wrap;">

                                                <div v-for="(technique,index) in Object.values(uiParams.listTechniques)" :key="index" class="technique-item">

                                                    <div class="p2" style="display: flex; align-items: center;">

                                                        <!-- Si l'image existe -->
                                                        <div v-if="technique[3]!=0&&technique[3]">
                                                            <img :src="technique[3]" class="picture-thumbnail-1"/>
                                                        </div>

                                                        <!-- Si elle n'existe pas -->
                                                        <div v-else>
                                                            <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail-1"/>
                                                        </div>

                                                        <!-- Affichage des techniques -->
                                                        <div class="wrapper-price-tools">

                                                            <!-- Cas où l'url de la technique est valide -->
                                                            <div v-if="technique[1].startsWith('http') || technique[1].startsWith('https')" class="label-technique">
                                                                <a :href="technique[1]" target="_blank" class="label-technique">{{ technique[0] }}</a>
                                                            </div>

                                                            <!--Affichage de la difficulté de la technqiue si existante -->
                                                            <div id="difficulté">
                                                                <span class="label-difficulty">Difficulté : {{translatedDifficulty(technique[2])}}</span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <!-- Il n'en existe pas -->
                                        <div v-else class="module_default-results" style="text-align: justify">
                                            <span class="p3">Malheureusement il n'y a pour l'instant aucune technique de réparation disponible pour votre {{ uiParams.selectedModele }} sur le site de notre partenaire. Nous faisons au plus vite pour y remédier ! N'hésitez pas à passer par un réparateur labellisé afin de faire diagnostiquer votre téléphone.</span>
                                        </div>
                                    </div>

                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>
                                    <div class="spacer-1"></div>

                                    <!-- Les tutoriels annexes -->
                                    <div id="tutoAnnexe">

                                        <div class="module-select-info" id="tech">
                                            <span class="bullet-1"></span>
                                            <span class="p3" style="font-weight: bold">Diagnostic et tutoriels annexes</span>
                                        </div>

                                        <div class="spacer-1"></div>

                                        <!-- Il existe des techniques -->
                                        <div  v-if="uiParams.listrelatedtutos.length>0" class="module_default-results-1">

                                            <div class="p2" style="display: flex; flex-wrap: wrap;">

                                                <div v-for="(technique,index) in Object.values(uiParams.listrelatedtutos)" :key="index" class="technique-item">

                                                    <div class="p2" style="display: flex; align-items: center;">

                                                        <!-- Si l'image existe -->
                                                        <div v-if="technique[2]!=0&&technique[2]">
                                                            <img :src="technique[2]" class="picture-thumbnail-1"/>
                                                        </div>

                                                        <!-- Si elle n'existe pas -->
                                                        <div v-else>
                                                            <img :src="'./src/pictures/not-found.png'" class="picture-thumbnail-1"/>
                                                        </div>

                                                        <!-- Affichage des techniques -->
                                                        <div class="wrapper-price-tools">

                                                            <!-- Cas où l'url de la technique est valide -->
                                                            <div v-if="technique[1].startsWith('http') || technique[1].startsWith('https')" class="label-technique">
                                                                <a :href="technique[1]" target="_blank" class="label-technique">{{ technique[0] }}</a>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <!-- Il n'en existe pas -->
                                        <div v-else class="module_default-results" style="text-align: justify">
                                            <span class="p3">Malheureusement il n'y a pour l'instant aucun diagnostic disponible pour votre {{ uiParams.selectedModele }} sur le site de notre partenaire. Nous faisons au plus vite pour y remédier ! N'hésitez pas à passer par un réparateur labellisé afin de faire diagnostiquer votre téléphone.</span>
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
    import { computed, watch } from 'vue';
    import { bonnes_pratiques_bugs, annees, difficultyTranslationDic } from '@/config/uiParams.js';
    import uiParams from '@/config/uiParams.js';
    import { uncheckOthersGarantie,openRepairerLink,toggleSection, showSuggestions, selectCP,handleClickChgt,handleClickRepar, } from '@/controller/controller';
    import { cpVilles } from '@/model/model.js';
    import { os_api,getMarquesForOSAPI,getModelesForMarqueAndOSAPI,updateGuide, updateScore, getLinkScorePictures, updateListTechniquesForModel, updateListReplacementForModel, updateRelatedGuide, updateListTutoAnnexeForModel} from '@/model/modelAPI';

   

    // 1 - Fonctions nécessaires pour l'affichage des OS / Marques /modèles 

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

    // 2 - Les watch pour mettre à jour les informations de réparations et de recherche sur l'API dans le cas où le modèle de téléphne est changé

    // Utiliser un watch pour surveiller les changements de selectedModel et donc mettre à jour uiParams.guide si maj
    watch(() => uiParams.selectedModele, async (newMarque) => {
        await updateGuide(newMarque,uiParams);
    });

    // Utiliser un watch pour surveiller les changements de selectedModel et donc mettre à jour uiParams.relatedGuide si maj
    watch(() => uiParams.selectedModele, async (newMarque) => {
        await updateRelatedGuide(newMarque,uiParams);
    });

    // Utiliser un watch pour surveiller les changements de selectedModel et donc mettre à jour le score  si maj
    watch(() => uiParams.selectedModele, async (newMarque) => {
        await updateScore(newMarque,uiParams);
    });

    // Utiliser un watch pour surveiller les changements de selectedModel et donc mettre à jour uiParams.listTechniques si maj
    watch (()=>{
        if (uiParams.guide){
            updateListTechniquesForModel(uiParams)
        }
    });

    // Utiliser un watch pour surveiller les changements de selectedModel et donc mettre à jour uiParams.listReplacement si maj
    watch (()=>{
        if (uiParams.guide){
            updateListReplacementForModel(uiParams)
        }
    });

    // Utiliser un watch pour surveiller les changements de selectedModel et donc mettre à jour uiParams.listrelatedtutos si maj
    watch (()=>{
        if (uiParams.relatedGuide){
            updateListTutoAnnexeForModel(uiParams)
        }
    });



    // 3 - Création du lien image pour l'affihage du score iFixit
    const link_picture = computed (()=>{
        if (uiParams.selectedModele!=''){
            return getLinkScorePictures(uiParams);
        } else {
            return null;
        }
    });

    // 4 - Fonctions gérant certaines restrictions sur les clicks
    
    /**
     * Assure qu'une seule cache de la catégorie "votre téléphone est-il encore sous garantie" est cochée
     * @param index 
     */
    const handleClickGarantie = (index) => {
        uncheckOthersGarantie(uiParams,index);
    }  ;


    // 5 - Fonctions pour gérer l'affichage des CP

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

    // 6 - Fonction traduction

   /**
     * Traduit le paramètre difficulté
     */
     const translatedDifficulty = (param) =>{
        const difficultyEN = param.toLowerCase();
        return difficultyTranslationDic[difficultyEN] || param
    };

</script>

<style setup>

.technique-item {
    display: flex;
    flex-direction: row;
    background-color: white;
    width:45%;
    margin : 5px 2px;
    border-radius: 10px;
    position: relative;
    border: solid 2px var(--blue-back);
    padding:18px;
    position : relative;
    transition: transform 0.3s ease; 
    overflow: hidden;
}

.technique-item:hover{
    transform: scale(1.01);
}


.picture-thumbnail-1{
    margin-right: 15px; 
    width:100px ;
}

.wrapper-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.label-technique {
    color: var(--blue-back);
}

.label-difficulty {
    color: var(--blue-back);
    font-style: italic;
    font-size: 15px;
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

