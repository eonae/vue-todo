// store

import Vue from 'vue'
import Vuex from 'vuex'

import AuthService from '../services/auth';
import { STATUS_CODES } from '../constants';

// import tasks from './tasks'
import user from './user'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: undefined,
      authorized: false
    }
  },

mutations: {
  set(state, user) {
    state.user.username = user.username;
    state.user.authorized = true;
  },
  unset(state) {
    state.user.username = undefined;
    state.user.authorized = false;
  }
},

actions: {

  require({ commit }) {
    
    AuthService
      .require()
      .then(user => {
        commit('set', user);
      })
      .catch(reason => {
        if (reason == STATUS_CODES.FORBIDDEN) {
          commit('unset');
        } else debugger;
      })
  },

  login( { commit }, credentials) {

    AuthService
      .login(credentials)
      .then(user => {
        commit('set', user);
      })
      .catch(reason => {
        if (reason == STATUS_CODES.FORBIDDEN) {
          debugger;
        } else debugger;
      })
  },

  logout({ commit }) {

    AuthService
      .logout()
      .then(() => {
        commit('unset');
      })
      .catch(reason => {
        debugger;
      })
  }
}
})