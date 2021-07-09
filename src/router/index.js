import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export const constRoutes = [{
  path: "/login",
  component: () => import('../views/Login.vue')
}]
export const asyncRoutes = [{
  path: '/',
  redirect: '/gestionManuel'
}, {
  path: "/",
  component: () => import('../views/Home.vue'),
  meta: {
    roles: ['admin']
  },
  children: [{
      path: "",
      redirect: "ajouter"
    }, {
      path: '/details/:id/:ids',
      name: 'details',
      component: () => import('../views/CentreProduits/Details.vue'),
      meta: {
        title: '产品详细'
      }
    },
    {
      path: '/editer/:id/:ids',
      name: 'editer',
      component: () => import('../views/CentreProduits/Editer.vue'),
      meta: {
        title: '编辑手册'
      }
    },
    {
      path: '/entreposage',
      name: 'entreposage',
      component: () => import('../views/CentreProduits/Entreposage.vue'),
      meta: {
        title: '产品列表'
      }
    },
    {
      path: '/gestion',
      name: 'gestion',
      component: () => import('../views/CentreProduits/Gestion.vue'),
      meta: {
        title: '产品管理'
      }
    },
    {
      path: '/ajouter',
      name: 'ajouter',
      component: () => import('../views/ManuelProduits/Ajouter.vue'),
      meta: {
        title: '新增手册'
      }
    },
    {
      path: '/detailsManuel/:id',
      name: 'detailsManuel',
      component: () => import('../views/ManuelProduits/Details.vue'),
      meta: {
        title: "手册详情"
      }
    },
    {
      path: '/editerManuel/:id',
      name: 'editerManuel',
      component: () => import('../views/ManuelProduits/Editer.vue'),
      meta: {
        title: '编辑手册'
      }
    },
    {
      path: '/gestionManuel',
      name: 'gestionManuel',
      component: () => import('../views/ManuelProduits/Gestion.vue'),
      meta: {
        title: '手册管理'
      }
    },
  ]
}, ]

export default new VueRouter({
  mode: 'history',
  routes: constRoutes
})