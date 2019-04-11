// store

import Vue from 'vue'
import Vuex from 'vuex'

import AuthService from '../services/auth';
import { STATUS_CODES } from '../constants';

// import tasks from './tasks'
import user from './user'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  }
})