<template lang="pug">

  div#app
  
    todo-header(:user="user")

    .content-wrapper
      transition(name="router" appear)
        router-view

    todo-footer

</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoHeader from './components/Header.vue'
import TodoFooter from './components/Footer.vue'
import ModalWindow from './components/ModalWindow.vue'
import ModalActions from './components/ModalActions.vue'

import TasksScreen from './views/TasksScreen.vue'
import StartScreen from './views/StartScreen.vue'
import RegisterScreen from './views/RegisterScreen.vue'


import auth from './services/auth.js';

Vue.component('modal-window', ModalWindow);
Vue.component('modal-actions', ModalActions);

export default {
  name: 'app',

  computed: {
    user() {
      return auth.user;
    }
  },

  components: {
    TodoHeader,
    TodoFooter
  },

  router: new VueRouter({
    routes: [
      { path: '/tasks', component: TasksScreen },
      { path: '/home', component: StartScreen },
      { path: '/register', component: RegisterScreen},
      { path: '/', redirect: '/home' }
    ]
  })
}
</script>

<style>

body {
  background: #FCFCFC;
  height: 100vh;
}

#app {
  max-width: 1140px;
  padding: 0 2%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
}

.content-wrapper {
  padding-top: calc(56px + 2vh);
  padding-bottom: calc(25px + 2vh);
  height: 100vh;
  overflow: hidden;
}
.content-wrapper > .card {
  margin: 0;
}

.router-enter-active, .router-leave-active {
  transition: 2s !important;
}

.router-enter, .router-leave {
  opacity: 0;
}



</style>
