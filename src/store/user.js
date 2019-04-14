
import AuthService from '../services/auth';
import { STATUS_CODES } from '../constants';

export default {
  namespaced: true,

  state: {
    username: undefined,
    authorized: false,
    initialized: false
  },

  mutations: {

    initialize(state) {
      if (!state.initialized) state.initialized = true;
    },

    set(state, user) {
      state.username = user.username;
      state.authorized = true;
    },
    unset(state) {
      state.username = undefined;
      state.authorized = false;
    }
  },

  actions: {

    register({ commit }, credentials) {
      return AuthService
        .register(credentials)
    },

    require({ commit }) {
      
      return AuthService
        .require()
        .then(user => {
          commit('set', user);
        })
        .catch(reason => {
          if (reason == STATUS_CODES.FORBIDDEN) {
            commit('unset');
          } else debugger;
        })
        .finally(() => {
          commit('initialize');
        });
    },

    login( { commit }, credentials) {

      return AuthService
        .login(credentials)
        .then(user => {
          commit('set', user);
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
}