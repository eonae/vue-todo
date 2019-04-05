import Vue from 'vue'
import App from './App.vue'
import VueBar from 'vuebar'
import VueRouter from 'vue-router'

import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'

Vue.use(VueRouter);
Vue.use(VueBar);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
