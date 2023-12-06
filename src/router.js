import Vue from 'vue';
import VueRouter from 'vue-router';
import AppAbout from './views/AppAbout.vue';
import MaifitHome from './views/MaifitHome.vue';
import MaifitProductInfo from './views/MaifitProductInfo.vue';
import MaifitResult from './views/MaifitResult.vue';
import MaifitLoading from './views/MaifitLoading.vue';
import MaifitUser from './views/MaifitUser.vue';


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: MaifitHome },
        { path: '/about', component: AppAbout },
        { path: '/maifit/product_info', component: MaifitProductInfo },
        { path: '/maifit/result', component: MaifitResult },
        { path: '/maifit/loading', component: MaifitLoading },
        { path: '/maifit/user', component: MaifitUser },
    ]
});
    
export default router;