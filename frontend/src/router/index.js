import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import locale from 'iview/dist/locale/en-US'

const routerOptions = [
  { path: '/', component: 'Home' },
  { path: '/about', component: 'About' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)
Vue.use(iView, { locale })

export default new Router({
  routes,
  mode: 'history'
})
