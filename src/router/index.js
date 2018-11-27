import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Navigation from '@/components/Navigation'
import Login from '@/components/Login'
import Content from '@/components/Content'
import AddUser from '@/components/AddUser'
import Details from '@/components/Details'






Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/navigation',
      name: 'Navigation',
      component: Navigation
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    },
    {
      path: '/adduser',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    }
  ]
})