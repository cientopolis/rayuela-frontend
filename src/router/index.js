import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/actividad/',
      name: 'actividad',
      component: () => import('../views/new/MiActividad.vue')
    },
    {
      path: '/proyecto/:id_proyect',
      name: 'proyecto',
      component: () => import('../views/new/ProyectInfo.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/new/List.vue')
    },
    {
      path: '/checkin',
      name: 'checkin',
      component: () => import('../views/new/Checkin.vue')
    }
  ]
})

export default router
