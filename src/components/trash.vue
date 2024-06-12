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
                        <span>Malheureusement nous ne pouvons vous fournir le prix moyen d'une réparation d'un écran pour votre téléphone. Nous faisons tout pour remédier à cela au plus vite!</span>
                </span>
            </div>

            <!-- On a à la fois le prix MO et le prix composant -->
            <div v-else>
                <span class="p2">
                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_repa }} €</span><span> pour faire réparer l'écran de votre téléphone par un professionnel agréé.</span>
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
                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_component }} €</span><span> pour racheter un nouvel écran pour votre téléphone.</span>
                </span>
            </div>

            <!-- Prix pas enregistré  -->
            <div v-else>
                <span class="p2">
                    <span>Malheureusement nous n'avons pas le prix moyen d'un écran pour votre téléphone. Nous faisons tout pour remédier à cela au plus vite!</span>
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
                    <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_MO }} €</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer l'écran de votre téléphone.</span>
                </span>
            </div>

            <!-- Prix pas enregistré  -->
            <div v-else>
                <span class="p2">
                    <span>Malheureusement nous n'avons pas le prix moyen de main d'oeuvre nécessaire pour réparer l'écran de votre téléphone. Nous faisons tout pour remédier à cela au plus vite!</span>
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
                            <span>Malheureusement nous ne pouvons vous fournir le prix moyen d'une réparation d'un écran pour votre </span><span>{{ uiParams.selectedModele }}</span><span>. Nous faisons tout pour remédier à cela au plus vite!</span>
                    </span>
                </div>

                <!-- On a à la fois le prix MO et le prix composant -->
                <div v-else>
                    <span class="p2">
                            <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_repa }} €</span><span> pour faire réparer l'écran de votre </span><span>{{ uiParams.selectedModele }} par un professionnel agréé.</span>
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
                        <span>En moyenne, comptez </span><span style="font-weight: bold">{{ price_MO }} €</span><span> de frais de main d'oeuvre chez un réparateur agréé pour réparer l'écran de votre </span><span>{{ uiParams.selectedModele }}.</span>
                    </span>
                </div>

                <!-- Prix pas enregistré  -->
                <div v-else>
                    <span class="p2">
                        <span>Malheureusement nous n'avons pas le prix moyen de main d'oeuvre nécessaire pour réparer l'écran de votre </span><span>{{ uiParams.selectedModele }}</span><span>. Nous faisons tout pour remédier à cela au plus vite!</span>
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