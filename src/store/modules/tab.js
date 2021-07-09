import permission from './permission'
import router from '../../router'

const state = {
  tabList: [],
  includeList: [],
  tabIdx: 0,
  fromTab: {}
}

const getters = {

}

const mutations = {
  setTabList(state, tab) {
    if (!state.tabList.length) {
      state.tabList.push({
        fullPath: "/gestionManuel",
        name: "gestionManuel",
        path: "/gestionManuel",
        meta: {
          title: "手册管理"
        }
      })
    }
    const flag = state.tabList.some(ele => {
      if (ele.fullPath == tab.fullPath) return true
    })
    if (!flag) {
      state.tabList.forEach((ele, index) => {
        if (ele.name == tab.name) {
          state.tabList.splice(index, 1)
        }
      })
      state.tabList.push(tab)
    }
  },
  setincludeList(state) {
    state.includeList = []
    state.tabList.forEach(ele => {
      state.includeList.push(ele.name)
    })
  },
  setTabIdx(state, idx) {
    state.tabIdx = idx
  },
  closeTab(state, idx) {
    if (idx != 0) {
      state.tabList.splice(idx, 1)
      state.tabIdx = state.tabList.length - 1
      router.push(state.tabList[state.tabIdx].fullPath)
    }
  },
}
const actions = {}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}