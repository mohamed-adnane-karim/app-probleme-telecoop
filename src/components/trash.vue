<!-- Cas où le téléphone n'est plus sous garantie -->
<div v-else class="module-1">

    <!-- Si le modèle de téléphone est dans la BDD -->
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
                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_component }} €</span><span> pour racheter un nouvel écran pour votre </span><span>{{ uiParams.selectedModele }}.</span>
                </span>
            </div>

            <!-- Prix pas enregistré  -->
            <div v-else>
                <span class="p2">
                    <span>Malheureusement nous n'avons pas le prix moyen d'un écran pour votre </span><span>{{ uiParams.selectedModele }}</span><span>. Nous faisons tout pour remédier à cela au plus vite!</span>
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
                    <span>A ce jour, il n'y malheureusement aucun tutoriel sur le site de notre partenaire iFixit pour vous aider à changer vous même l'écran de votre </span><span>{{ uiParams.selectedModele }}.</span><span> Nous faisons tout pour remédier à cela au plus vite ! En attendant, n'hésitez pas à consulter les informations fournies sur le site de </span><span>{{ uiParams.selectedMarque }}.</span><span> Vous pouvez aussi passer par un réparateur agréé si vous ne souhaitez prendre aucun risque.</span>
                </span>
            </div>

            <!-- Tuto dans la BDD -->
            <div v-else>
                <span class="p2">
                    <span>Vous pouvez consulter le tutoriel pour changer l'écran de votre </span><span>{{ uiParams.selectedModele }} </span> <span></span>
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
                <span class="p2">Malheureusement le site de notre partenaire iFixit ne recense pas à ce jour la liste du matériel nécessaire pour changer l'écran de votre {{ uiParams.selectedModele }}. Nous faisons tout pour remédier à cela au plus vite!</span>
            </div>

            <!-- Pas besoin d'outils -->
            <div v-if="liste_outils==0" style="text-align:justify">
                <span class="p2">
                    <span style="font-weight:bold">Bonne nouvelle !</span><span>Aucun matériel n'est nécessaire pour changer l'écran de votre {{ uiParams.selectedModele }}. On s'y met maintenant ?</span>
                </span>
            </div>

            <!-- Besoin d'outils et on a la liste -->
            <div v-if="liste_outils!==0&&liste_outils!==-1">
                <div class="p2" style="text-align: center">
                    <span>Afin de vous lancer dans la réparation de votre écran, vous aurez besoin de :</span>
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

    <div class="spacer-1"></div>                                

</div>