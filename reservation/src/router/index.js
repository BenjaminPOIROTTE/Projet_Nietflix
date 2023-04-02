import {createRouter, createWebHistory} from "vue-router";
import Films from "@/components/Films.vue";
import Seances from "@/components/Seances.vue";
import Salle from "@/components/Salle.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Films
        },
        {
            path: '/film/:id',
            component: Seances
        },
        {
            path: '/salle',
            component: Salle
        },

    ]
})
export default router;