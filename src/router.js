import Vue from 'vue';
import VueRouter from 'vue-router';
import AppAbout from './views/AppAbout.vue';
import MaifitProductLink from './views/MaifitProductLink.vue';
import MaifitProductInfo from './views/MaifitProductInfo.vue';
import MaifitResult from './views/MaifitResult.vue';
import MaifitLoading from './views/MaifitLoading.vue';
import MaifitUser from './views/MaifitUser.vue';


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/maifit/product_link',
            name: 'MaifitProductLink',
            component: MaifitProductLink
        },
        {
            path: '/about',
            name: 'AppAbout',
            component: AppAbout
        },
        {
            path: '/maifit/product_info/:productId',
            name: 'MaifitProductInfo',
            component: MaifitProductInfo,
            props: true
        },
        {
            path: '/maifit/result/:productId',
            name: 'MaifitResult',
            component: MaifitResult
        },
        {
            path: '/maifit/loading',
            name: 'MaifitLoading',
            component: MaifitLoading
        },
        {
            path: '/',
            name: 'MaifitUser',
            component: MaifitUser
        },
    ]
});
    
export default router;