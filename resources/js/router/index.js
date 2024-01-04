import {createRouter, createWebHistory} from 'vue-router'
import routes from '@js/router/routes.js'
// import {useUserStore} from "@js/stores/user.js";
import {useAuthStore} from "@js/stores/auth.js";
import User from "@js/axios/User.js";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated){
        await authStore.getUser();
    }
    if (authStore.isAuthenticated){
        if (to.name === 'login' || to.name === 'register'){
            next({name: 'home'});
        }else next();
    } else{
        if (to.meta.requireAuth){
            next({name: 'login'})
        } else next()
    }


    document.title = to.meta.title;
})
export default router
