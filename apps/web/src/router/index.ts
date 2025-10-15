import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/request',
    name: 'Request',
    component: () => import('../views/RequestView.vue')
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import('../views/StatusView.vue')
  },
  {
    path: '/status/:reference',
    name: 'StatusDetail',
    component: () => import('../views/StatusDetailView.vue'),
    props: true
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('../views/TermsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
