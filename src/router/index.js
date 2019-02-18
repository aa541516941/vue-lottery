import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import main from '@/components/main'
import lizi from '@/components/lizi'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'main',
      component: main
    },

    {
      path: '/lizi',
      name: 'lizi',
      component: lizi
    }
  ]
})
