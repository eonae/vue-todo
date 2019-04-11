// router

import Vue from 'vue'
import VueRouter from 'vue-router'

import TasksScreen from '../views/TasksScreen.vue'
import StartScreen from '../views/StartScreen.vue'
import RegisterScreen from '../views/RegisterScreen.vue'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
      { path: '/tasks', component: TasksScreen },
      { path: '/home', component: StartScreen },
      { path: '/register', component: RegisterScreen},
      { path: '/', redirect: '/home' }
    ]
})