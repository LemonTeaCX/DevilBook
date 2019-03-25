import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/index'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import Edit from '../pages/edit'
import Account from '../pages/system/account'
import AccountEdit from '../pages/system/accountEdit'
import Menu from '../pages/system/menu'
import BlogList from '../pages/blogs/blogList'
import BlogDetail from '../pages/blogs/blogDetail'
import CompList from '../pages/blogs/compList'
import CompDetail from '../pages/blogs/compDetail'

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/home',
          component: Home
        },
        {
          path: '/system/account',
          component: Account
        },
        {
          path: '/system/accountEdit',
          component: AccountEdit
        },
        {
          path: '/system/menu',
          component: Menu
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
    },
    {
      path: '/edit',
      component: Edit
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (window._hmt) {
    if (to.path) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath]);
    }
  }
  next();
});

export default router;
