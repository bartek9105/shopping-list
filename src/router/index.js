import Vue from 'vue'
import VueRouter from 'vue-router'
import Categories from '../views/Categories.vue'
import Products from '../views/Products.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
