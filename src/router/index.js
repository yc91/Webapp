import Vue from 'vue'
import Router from 'vue-router'
import Webapp from '@/components/Webapp'
import CollectionList from '@/components/CollectionList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Webapp',
      component: Webapp
    },
    {
      path:'/collection',
      name:'collection',
      component: CollectionList
    },
  ]
  })
