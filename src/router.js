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
        {
            path: '/',
            name: 'MaifitHome',
            component: MaifitHome
        },
        {
            path: '/about',
            name: 'AppAbout',
            component: AppAbout
        },
        {
            path: '/maifit/product_info',
            name: 'MaifitProductInfo',
            component: MaifitProductInfo,
            props: true
        },
        {
            path: '/maifit/result',
            name: 'MaifitResult',
            component: MaifitResult
        },
        {
            path: '/maifit/loading',
            name: 'MaifitLoading',
            component: MaifitLoading
        },
        {
            path: '/maifit/user',
            name: 'MaifitUser',
            component: MaifitUser
        },
    ]
});
    
export default router;