
import AuthService from '../services/auth';
import { STATUS_CODES } from '../constants';

export default {
  state: {
    username: undefined,
    authorized: false
  },

mutations: {
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

    return AuthService //Experiment
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