import { createWebHashHistory , createRouter } from 'vue-router';


import routes from './routes';

const vueRouter = createRouter({
    routes,
    linkActiveClass: 'active',
    mode: 'history',
    history: createWebHashHistory(),
});



export default vueRouter;
