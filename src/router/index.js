import { createRouter, createWebHistory } from 'vue-router'

import pageAccueil from '@/components/page-accueil.vue';
import pageEcran from '@/components/page-ecran.vue';
import pageAutonomie from '@/components/page-autonomie.vue';
import pageVitreArriere from '@/components/page-vitre-arriere.vue';
import pageAutres from '@/components/page-autres-problemes.vue';
import pageBugs from '@/components/page-bugs.vue';

const routes = [
    { path: '/', name: 'Problèmes', component: pageAccueil },
    { path: '/pageEcran', name: 'Ecran', component: pageEcran },
    { path: '/pageAutonomie', name: 'Autonomie', component: pageAutonomie },
    { path: '/pageVitreArriere', name: 'VitreArriere', component: pageVitreArriere },
    { path: '/pageAutres', name: 'Autres', component: pageAutres },
    { path: '/pageBugs', name: 'Bugs', component: pageBugs },

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router