import {createStore} from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import user from './modules/user'
import catalog from './modules/catalog'

export default createStore({
    modules: {
        user,
        catalog
    },
    plugins: [
        createPersistedstate({
          key: 'saveInfo',
          paths: ['user', 'catalog']
        })
      ]
})