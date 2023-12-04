import Vue from 'vue';
import VueRouter from 'vue-router';
import AppHome from './views/AppHome.vue';
import AppAbout from './views/AppAbout.vue';
import MaifitHome from './views/MaifitHome.vue';
import MaifitProductInfo from './views/MaifitProductInfo.vue';
import MaifitResult from './views/MaifitResult.vue';
import MaifitLoading from './views/MaifitLoading.vue';
import Maifituser from './views/Maifituser.vue';


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: AppHome },
        { path: '/about', component: AppAbout },
        { path: '/maifit/home', component: MaifitHome },
        { path: '/maifit/product_info', component: MaifitProductInfo },
        { path: '/maifit/result', component: MaifitResult },
        { path: '/maifit/loading', component: MaifitLoading },
        { path: '/maifit/user', component: Maifituser },
    ]
});
    
export default router;