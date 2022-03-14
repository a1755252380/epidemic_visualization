import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //记录创建图片的序号  避免id冲突
    id:0,
  },
  mutations: {
    setid (state) {
      state.id++
     }
  },
  actions: {
  },
  modules: {
  }
})
