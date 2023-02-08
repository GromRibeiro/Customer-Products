import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gprodutos',
    name: 'Produtos',
    component: () => import(/* webpackChunkName: "about" */ '../views/GProdutos.vue')
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Clientes.vue')
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Produtos.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
