const routes = [
    {
        path: '/',
        name: 'home',
        meta: {requireAuth: true, title: 'Notes'},
        component: () => import('@js/layouts/DefaultLayout.vue')
    },
    {
        path: '/auth',
        redirect: '/login',
        component: () => import('@js/layouts/Auth.vue'),
        children: [
            {
                path: '/login',
                name: 'login',
                meta: {requireAuth: false, title: 'Sign In'},
                // route level code-splitting
                // this generates a separate chunk (About.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('@views/Authentication/Login.vue')
            },
            {
                path: '/register',
                name: 'register',
                meta: {requireAuth: false, title: 'Register'},
                component: () => import('@views/Authentication/Register.vue')
            }
        ]
    },

];

export default routes;
