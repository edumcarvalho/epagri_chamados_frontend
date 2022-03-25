import Vue from 'vue'
import VueRouter from 'vue-router'

import QueryPages from '@/components/home/QueryPages'

Vue.use(VueRouter)

const routes = [{
    name: 'queryPages',
    //Quando for rodar localmente
    path: '/',

    //Quando for rodar no servidor
    //path: '/portal_frontend',

    component: QueryPages
}]

const router =  new VueRouter({
    mode: 'history',
    routes
})

export default router

