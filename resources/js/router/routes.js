const routes = [
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../Pages/Inicio.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../Pages/About.vue'),
    }
];

export default routes;
