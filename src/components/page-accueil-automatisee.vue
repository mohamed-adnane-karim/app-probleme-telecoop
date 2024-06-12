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

            <div class="button-wrapper-items">

                <div v-for="(page, index) in pages" :key="index" class="bouton-accueil-container">
                    <button class="accueil-buttons" :class="getButtonClass(index)" @click="getIDpage(uiParams,page)">{{ page[0] }}</button>
                </div>
                <div class="bouton-accueil-container">
                    <button class="accueil-buttons" :class="getButtonClass(pages.length)" @click="getIDpage(uiParams,'stockage')">Je manque de stockage sur mon téléphone</button>
                </div>
                <div class="bouton-accueil-container">
                    <button class="accueil-buttons" :class="getButtonClass(pages.length+1)" @click="getIDpage(uiParams,'bugs')">Je rencontre des bugs sur mon téléphone</button>
                </div>
                <div class="bouton-accueil-container">
                    <button class="accueil-buttons" :class="getButtonClass(pages.length+2)" @click="getIDpage(uiParams,'autre')">Je rencontre un autre type de problème</button>
                </div>
                
            </div>
            
        </div>
    </body> 
</template> 

<script setup>
    import { getAllPagesForAccueil } from '@/config/automatisation';
    import { getIDpage, getButtonClass } from '@/controller/controller';
    import uiParams from '@/config/uiParams';

    const pages = getAllPagesForAccueil();

</script>

<style setup>

.button-wrapper-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Centre les éléments horizontalement */
    align-items: center; /* Centre les éléments verticalement */
}

.bouton-accueil-container {
    width: 45%;
    padding: 1px 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: center; /* Centre horizontalement */
    align-items: center; /* Centre verticalement */
}

.accueil-buttons {
    width: 100%;
    padding: 25px 0;
    margin: 2px 0;
    font-size: 1.2em;
    font-weight: bold;
    font-family: Poppins, sans-serif;
    border-radius: 5px;
    cursor: pointer;
    appearance: none;
    transition: transform 0.3s ease, background-color 0.3s ease, border 0.3s ease;
}

.blue-button {
    background-color: var(--blue-back);
    border: 3px solid var(--blue-back);
    color: white;
}

.white-button {
    background-color: white;
    border: 3px solid var(--blue-back);
    color: var(--blue-back);
}

.blue-button:hover {
    transform: scale(1.01);
    background-color: var(--attenuated-blue);
    border: 3px solid var(--attenuated-blue);
}

.white-button:hover {
    transform: scale(1.01);
    border : 3px solid var(--attenuated-blue);
    color: var(--attenuated-blue);
}

    
</style>