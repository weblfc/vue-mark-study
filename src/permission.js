import router from './router'
import store from "./store"

// 白名单
const whiteList = ['/login']
//保存路由
let routeList = []
// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.name) {
    store.commit('tab/setTabList', to)
    store.commit('tab/setincludeList')
  }
  // 获取token
  const hasToken = localStorage.getItem('token')
  if (hasToken) { //已登录
    if (to.path == '/login') {
      // 如果已经登录，就不去登录页，直接进入
      next('/')
    } else {
      store.dispatch('user/getInfo').then(result => {
        const {
          roles
        } = result
        store.dispatch('permission/generateRoutes', roles).then(res => {
          if (routeList.length == 0) {
            routeList = routeList.concat(res)
            router.addRoutes(routeList)
          }
        })
      })
      next()
    }
  } else { // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 是白名单
      next()
    } else { // 不是白名单
      next('/login')
      // next()
    }
  }
})

router.afterEach((to, from) => {
  let idx = store.state.tab.tabList.findIndex(ele => {
    return ele.fullPath == to.fullPath
  })
  store.commit('tab/setTabIdx', idx)
  // store.dispatch("tab/arrive", to);
})
