import { createRouter, createWebHistory } from 'vue-router';
import { resetParams } from '@/controller/controller';

import pageBugs from '@/components/page-bugs.vue';
import pageAutomatiseeApi from '@/components/page-automatisee-api.vue';
import pageAccueilAutomatisee from '@/components/page-accueil-automatisee.vue';
import pageAutresProblemesApi from '@/components/page-autres-problemes-api.vue';
import uiParams from '@/config/uiParams';

const routes = [
    { path: '/', name: 'Accueil', component: pageAccueilAutomatisee },
    { path: '/Probleme', name: 'Probleme', component: pageAutomatiseeApi },
    { path: '/AutreProbleme', name: 'AutreProbleme', component: pageAutresProblemesApi },
    { path: '/Bugs', name: 'Bugs', component: pageBugs },

]
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    resetParams(uiParams);
    next();
});

export default router