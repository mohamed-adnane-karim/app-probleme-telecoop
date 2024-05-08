<template id="page-accueil">
    <body>
        <header class="wrapper-titre">
                <h1>
                    <span>Réparons</span> <span>ensemble</span> <span>votre</span> <span>smartphone !</span>
                </h1>
        </header>

        <header class="wrapper-sous-titre">
                <p class="p1">
                    <span>TeleCoop vous accompagne pour conserver votre mobile le plus longtemps possible ! Quel problème rencontrez-vous avez votre smartphone actuel ?</span>
                </p>
        </header>

        <div class="module_default">
            <div class="button-wrapper-1">
                <div class="screen-buttons-blue-1">
                    <button>{{ titresPages.titrePageEcran }}</button>
                </div>
                <div class="screen-buttons-white-1">
                    <button>{{ titresPages.titrePageVitre }}</button>
                </div>
            </div>

            <div class="button-wrapper-1">
                <div class="screen-buttons-white-2">
                    <button>{{ titresPages.titrePageAutonomie }}</button>
                </div>
                <div class="screen-buttons-blue-2">
                    <button>{{ titresPages.titrePageCharge }}</button>
                </div>
            </div>

            <div class="button-wrapper-1">
                <div class="screen-buttons-blue-3_1">
                    <button>{{ titresPages.titrePageMicrophone }}</button>
                </div>
                <div class="screen-buttons-white-3">
                    <button>{{ titresPages.titrePageHautParleur }}</button>
                </div>
                <div class="screen-buttons-blue-3_2">
                    <button>{{ titresPages.titrePageCamera }}</button>
                </div>
            </div>

            <div class="button-wrapper-1">
                <div class="screen-buttons-white-4">
                    <button>{{ titresPages.titrePageBoutons }}</button>
                </div>
                <div class="screen-buttons-blue-4">
                    <button>{{ titresPages.titrePageConnexion }}</button>
                </div>
            </div>

            <div class="button-wrapper-1">
                <div class="screen-buttons-blue-5">
                    <button>{{ titresPages.titrePageStockage }}</button>
                </div>
                <div class="screen-buttons-white-5">
                    <button>{{ titresPages.titrePageBugs }}</button>
                </div>
            </div>

            <div class="button-wrapper-2">
                <div class="screen-buttons-green">
                    <button>{{ titresPages.titrePageAutre }}</button>
                </div>
            </div>
        </div>
    </body> 
</template> 

<script setup>
    import { titresPages } from '@/config/uiParams';
</script>