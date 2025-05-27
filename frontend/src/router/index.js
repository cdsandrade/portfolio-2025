import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import HelloWorld from '../components/HelloWorld.vue'
import CodeSubmit from '../components/CodeSubmit.vue'
import EpochToUuid from '../components/EpochToUuid.vue'
import ZettelToUuid from '../components/ZettelToUuid.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/hello', component: HelloWorld },
  { path: '/code-submit', component: CodeSubmit },
  { path: '/epoch-to-uuid', component: EpochToUuid },
  { path: '/zettel-to-uuid', component: ZettelToUuid },
  { path: '/:pathMatch(.*)', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
