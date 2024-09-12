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
      component: () => import('../views/DashboardView.vue'),
      beforeEnter: (to, from) => {
        window.scrollTo(0, 0);
    }
    },
    {
      path: '/actividad/:id',
      name: 'actividad',
      component: () => import('../views/new/MiActividad.vue'),
      beforeEnter: (to, from) => {
        window.scrollTo(0, 0);
    }
   
    },
    {
      path: '/proyecto/:id_proyect',
      name: 'proyecto',
      component: () => import('../views/new/ProyectInfo.vue'),
      beforeEnter: (to, from) => {
        window.scrollTo(0, 0);
    }
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/new/List.vue')
    },
    {
      path: '/checkin/:id',
      name: 'checkin',
      component: () => import('../views/new/Checkin.vue')
    }
  ]
})

export default router
