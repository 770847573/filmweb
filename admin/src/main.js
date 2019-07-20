import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import './registerServiceWorker'
import axios from 'axios'

import Header from '@/components/header'


Vue.component('my-header',Header)
axios.defaults.baseURL='http://localhost:81';
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
