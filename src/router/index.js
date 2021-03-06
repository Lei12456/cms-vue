import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Article from '../pages/Article.vue'
import Category from '../pages/Category.vue'
import Comment from '../pages/Comment.vue'
import User from '../pages/User.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/article'
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/category',
    name: 'Category',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Category
  },
  {
    path: '/comment',
    name: 'Comment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Comment
  },
  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
