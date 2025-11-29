import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAppStore } from '@/stores/app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/gerenciar',
      name: 'gerenciar',
      component: () => import('../views/GerenciarView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/gerenciar/:id',
      name: 'editar',
      component: () => import('../views/GerenciarView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/anime/:id',
      name: 'detalhes',
      component: () => import('../views/AnimeDetailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()

  // Inicializar o estado de autenticação apenas uma vez
  if (!appStore.isLogged) {
    appStore.initializeAuth()
  }

  if (to.meta.requiresAuth && !appStore.isLogged) {
    next('/login')
  } else {
    next()
  }
})

export default router
