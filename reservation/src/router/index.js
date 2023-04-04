import {createRouter, createWebHistory} from "vue-router";
import Films from "@/components/Films.vue";
import Seances from "@/components/Seances.vue";
import Salle from "@/components/Salle.vue";
import Cinemas from "@/components/Cinemas.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Cinemas
        },
        {
            path: '/cinema/:id',
            component: Films
        },
        {
            path: '/film/:id',
            component: Seances
        },
        {
            path: '/salle/:id',
            component: Salle
        },

    ]
})
export default router;