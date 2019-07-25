import Vue from 'vue'
import Router from 'vue-router'
import admincenter from './views/admincenter.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Signup from './views/signup.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
   {
       path: '/',
       name: 'home',
       component: Home
   },
	{
      path: '/login',
      name: 'login',
      component: Login
    },
	{
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
