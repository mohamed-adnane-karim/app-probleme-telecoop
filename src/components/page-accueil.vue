<template id="page-accueil">
    <body>
        <header class="wrapper-titre">
                <h1>
                    <span>Réparons</span> <span>ensemble</span> <span>votre</span> <span>smartphone !</span>
                </h1>
        </header>

        <header class="wrapper-sous-titre">
                <p class="p1">
                    <span>TeleCoop vous accompagne pour conserver votre mobile le plus longtemps possible ! Quel problème rencontrez-vous avez votre téléphone actuel ?</span>
                </p>
        </header>

        <div class="module_default">
            <div class="button-wrapper-1">
                <div class="screen-buttons-blue-5">
                    <router-link to='/pageEcran' style="text-decoration: none; width:100%">
                        <button>{{ titresPages.titrePageEcran }}</button>
                    </router-link>
                </div>
                <div class="screen-buttons-white-5">
                    <router-link to='/pageVitreArriere' style="text-decoration: none;width:100%">
                        <button>{{ titresPages.titrePageVitre }}</button>
                    </router-link>
                </div>
            </div>

            <div class="button-wrapper-1">
                <div class="screen-buttons-white-4">
                    <router-link to='/pageAutonomie' style="text-decoration: none;width:100%">
                        <button>{{ titresPages.titrePageAutonomie }}</button>
                    </router-link>
                </div>
                <div class="screen-buttons-blue-4">
                    <button>{{ titresPages.titrePageCharge }}</button>
                </div>
            </div>

            <div class="button-wrapper-1">
                <div class="screen-buttons-blue-5">
                    <button>{{ titresPages.titrePageMicrophone }}</button>
                </div>
                <div class="screen-buttons-white-5">
                    <button>{{ titresPages.titrePageHautParleur }}</button>
                </div>
            </div>

            <div class="button-wrapper-1">
                <div class="screen-buttons-white-4">
                    <button>{{ titresPages.titrePageCamera }}</button>
                </div>
                <div class="screen-buttons-blue-4">
                    <button>{{ titresPages.titrePageBoutons }}</button>
                </div>
                
            </div>

            <div class="button-wrapper-1">
                <div class="screen-buttons-blue-5">
                    <button>{{ titresPages.titrePageConnexion }}</button>
                </div>
                <div class="screen-buttons-white-5">
                    <button>{{ titresPages.titrePageStockage }}</button>
                </div>
                
            </div>

            <div class="button-wrapper-2">
                <div class="screen-buttons-white-4">
                    <router-link to='/pageBugs' style="text-decoration: none;width:100%">
                        <button>{{ titresPages.titrePageBugs }}</button>
                    </router-link>
                </div>
                <div class="screen-buttons-blue-4">
                    <router-link to='/pageAutres' style="text-decoration: none;width:100%">
                        <button>{{ titresPages.titrePageAutre }}</button>
                    </router-link>
                </div>
            </div>
        </div>
    </body> 
</template> 

<script setup>
    import { titresPages } from '@/config/uiParams';
</script>