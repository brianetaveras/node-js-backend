import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import('../views/Home.vue'),
      meta:{
        routeGuard: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(rec=> rec.meta.routeGuard)){
    let token = localStorage.getItem('token');
    if(token){
      next()
    } else {
      next({
        name: 'login'
      })
    }

  }  else {
    next()
  }
})

export default router;
