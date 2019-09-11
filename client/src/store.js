import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

// 給browser檢視工具用的
const type = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_USER: 'SET_USER'
};

const state = {
  isAuthenticated: false,
  user:{}
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
}

const mutations = {
  [type.SET_AUTHENTICATED](state,isAuthenticated){
    if(isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },

  [type.SET_USER](state, user){
    if(user) state.user = user;
    else state.user = {};
  }

}

const actions = {
  setAuthenticated:({commit},isAuthenticated) => {
    commit(type.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser:({commit}, user) =>{
    commit(type.SET_USER, user);
  },
  clearCurrentState:({commit}) => {
    commit(type.SET_AUTHENTICATED, false);
    commit(type.SET_USER, null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
