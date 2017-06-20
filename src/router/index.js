import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/Layout.vue'
import Home from '../components/Home.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: {name: 'home'},
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
        },
        {
          path: '/personal',
          name: 'personal',
          component: Personal,
        }
      ]
    }
  ]
})
