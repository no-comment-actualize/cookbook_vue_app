import Vue from 'vue'
import Router from 'vue-router'
import RecipesIndex from './views/recipes/Index.vue'
import Signup from './views/Signup.vue'
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import RecipesNew from './views/recipes/New.vue'
import RecipesShow from './views/recipes/Show.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/recipes',
      name: 'recipes-index',
      component: RecipesIndex
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/recipes/new',
      name: 'recipes-new',
      component: RecipesNew
    },
    {
      path: '/recipes/:id',
      name: 'recipes-show',
      component: RecipesShow
    }
  ]
})
