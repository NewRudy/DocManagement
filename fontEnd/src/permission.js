import router from '@/router'
import storage from '@/utils/storage'
import { useStore } from "vuex";

// router.beforeEach((to, from, next) => {
//   const user = JSON.parse(storage.get('user'))
//   console.log('user: ', user)
//   if(!user && (to.name != 'register' || to.name !='login')) {
//     window.location.href = '/login'
//   }
//   next()
// })