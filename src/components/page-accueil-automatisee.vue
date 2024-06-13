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
            <router-link to="/Probleme" style="text-decoration: none; width:100%">
              <button class="accueil-buttons" :class="getButtonClass(index)" @click="handleButtonClick(page)">
                {{ page[0] }}
              </button>
            </router-link>
          </div>

          <div class="bouton-accueil-container">
            <button class="accueil-buttons" :class="getButtonClass(pages.length)" @click="handleButtonClick('stockage')">
              Je manque de stockage sur mon téléphone
            </button>
          </div>

          <div class="bouton-accueil-container">
            <router-link to="/Bugs" style="text-decoration: none; width:100%">
              <button class="accueil-buttons" :class="getButtonClass(pages.length + 1)" @click="handleButtonClick('bugs')">
                Je rencontre des bugs sur mon téléphone
              </button>
            </router-link>
          </div>

          <div class="bouton-accueil-container">
            <router-link to="/AutreProbleme" style="text-decoration: none; width:100%">
              <button class="accueil-buttons" :class="getButtonClass(pages.length + 2)" @click="handleButtonClick('autre')">
                Je rencontre un autre type de problème
              </button>
            </router-link>
          </div>

        </div>
      </div>

    </body>
</template>
  
<script setup>
    import { getAllPagesForAccueil } from '@/config/automatisation';
    import { getIDpage, getButtonClass, resetParams } from '@/controller/controller';
    import uiParams from '@/config/uiParams';

    const pages = getAllPagesForAccueil();

    function handleButtonClick(page) {
        resetParams(uiParams);
        getIDpage(uiParams, page);
    }
</script>

