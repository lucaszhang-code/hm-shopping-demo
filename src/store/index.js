import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    //获取token
    token(state){
      return state.user.userInfo.token
    }
  },
  mutations: {

  },
  actions: {
  },
  modules: {
      user
  }
})
