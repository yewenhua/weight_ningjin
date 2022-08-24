import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/'

import PersonalFrame from '@/view/personal/Frame.vue';
import Signin from '@/view/personal/Signin.vue';

import AppFrame from '@/view/app/Frame.vue';
import Home from '@/view/app/home/Index.vue';


Vue.use(Router)
const routes = [
    {
        path: '/app',
        component: AppFrame,
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home,
                meta: {
                    requireAuth: false
                }
            },
        ]
    },
    {
        path: '/personal',
        component: PersonalFrame,
        children: [
            {
                path: '/signin',
                name: 'signin',
                component: Signin,
                meta: {
                    requireAuth: false
                }
            }
        ]
    },
    {
        path: '*',
        redirect: '/home'
    }
];

const router = new Router({
    //mode: 'history',
    scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    routes
});

router.beforeEach((to, from, next) => {
    store.dispatch('showLoading');
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/signin',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
});

router.afterEach(function (to) {
    store.dispatch('hideLoading')
});

export default router;
