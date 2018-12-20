import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Navigation from '@/components/Navigation'
import Login from '@/components/Login'
import Content from '@/components/Content'
import AddUser from '@/components/AddUser'
import Details from '@/components/Details'
import NewUser from '@/components/NewUser'
import TheMap from '@/components/Map'
import Search from '@/components/Search'
import Association from '@/components/Association'
import Order from '@/components/Order'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      // component: Home,
      redirect:'/content'
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
      component: Content,
      children:[
        {
          path: 'adduser',
          name: 'AddUser',
          component: AddUser
        },
        {
          path: 'details/:id',
          name: 'Details',
          component: Details,
        },
         {
          path: 'newuser',
          name: 'NewUser',
          component: NewUser
        },
        {
          path: 'map',
          name: 'Map',
          component:TheMap
        },
        {
          path: 'search',
          name: 'Search',
          component:Search
        },
        {
          path: 'association',
          name: 'Association',
          component:Association
        },
        {
          path: 'order',
          name: 'Order',
          component:Order
        }
      ]
    },
  ]
})
