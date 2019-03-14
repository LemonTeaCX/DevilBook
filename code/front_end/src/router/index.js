import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/index'
import Login from '../pages/login'
import Register from '../pages/register'
import Account from '../pages/system/account'
import AccountEdit from '../pages/system/accountEdit'
import Auth from '../pages/system/auth'
import BlogList from '../pages/blogs/blogList'
import BlogDetail from '../pages/blogs/blogDetail'
import CompList from '../pages/blogs/compList'
import CompDetail from '../pages/blogs/compDetail'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/system/account',
          component: Account
        },
        {
          path: '/system/accountEdit',
          component: AccountEdit
        },
        {
          path: '/system/auth',
          component: Auth
        },
        {
          path: '/blogs/blogList',
          component: BlogList
        },
        {
          path: '/blogs/blogDetail',
          component: BlogDetail
        },
        {
          path: '/blogs/compList',
          component: CompList
        },
        {
          path: '/blogs/compDetail',
          component: CompDetail
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
});
