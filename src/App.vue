<template lang="pug">

  div#app
  
    todo-header

    router-view

    todo-footer

</template>

<script>

import VueRouter from 'vue-router'

import TodoHeader from './components/Header.vue'
import TodoFooter from './components/Footer.vue'

import TasksScreen from './views/TasksScreen.vue'
import StartScreen from './views/StartScreen.vue'

export default {
  name: 'app',

  components: {
    TodoHeader,
    TodoFooter 
  },

  router: new VueRouter({
    routes: [
      // { path: '/tasks', component: TaskScreen },
      { path: '/tasks', component: TasksScreen },
      { path: '/home', component: StartScreen },
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

</style>
