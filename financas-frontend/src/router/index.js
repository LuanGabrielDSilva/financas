import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Cadastro from '../views/Cadastro.vue';
import Dashboard from '../views/Dashboard.vue';
import Transacoes from '../views/Transacoes.vue';
import Investimentos from '../views/Investimentos.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/cadastro', component: Cadastro },
  { 
    path: '/dashboard', 
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) next();
      else next('/login');
    }
  },
  { 
    path: '/transacoes', 
    component: Transacoes,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) next();
      else next('/login');
    }
  },
  { 
    path: '/investimentos', 
    component: Investimentos,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) next();
      else next('/login');
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
