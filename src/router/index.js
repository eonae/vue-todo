// router

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import TasksScreen from '../views/TasksScreen.vue'
import StartScreen from '../views/StartScreen.vue'
import RegisterScreen from '../views/RegisterScreen.vue'
import ProfileScreen from '../views/ProfileScreen.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/tasks', component: TasksScreen,
      beforeEnter: checkUser
    },
    { path: '/profile', component: ProfileScreen,
      beforeEnter: checkUser
    },
    { path: '/home', component: StartScreen },
    { path: '/register', component: RegisterScreen},
    { path: '/', redirect: '/home' }
  ]
})

function checkUser(to, from, next) {

  if (!store.state.user.initialized) {
    store
      .dispatch('user/require')
      .then(() => {

        if (!store.state.user.authorized) {

          next(from.path == '/' ? '/home' : false);
        } next();
      })
      .catch(() => {

        next(false);
      })
  } else {
    if (!store.state.user.authorized) {
      next(from.path('/') ? '/home' : false);
    } next();
  }
}

export default router;