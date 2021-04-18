import Vue from 'vue'
import VueRouter from 'vue-router'
import Categories from '../views/Categories.vue'
import Products from '../views/Products.vue'
import Lists from '../views/Lists.vue'
import ProductDetails from '../views/ProductDetails.vue'
import ListDetails from '../views/ListDetails.vue'

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
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: ProductDetails
  },
  {
    path: '/lists',
    name: 'Lists',
    component: Lists
  },
  {
    path: '/lists/:id',
    name: 'ListDetails',
    component: ListDetails
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
