import storage from '@/utils/storage'
// 用户
export default {
    namespaced: true,
    // 数据保存在state内，在任何组件内通过this.$store.state.XX来读取
    state: {
        user: '',
    },
    // 用来直接修改state内的数据；在组件内，通过this.$store.commit(方法名)来执行mutations
    mutations: {
        init(state) {
            state.user = ''
            storage.remove('user')
        },
        setUser(state, user) {
            state.user = user
            storage.set('user', state.user)
        },
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getUserId(state) {
            return state.user ? state.user.id : ''
        },
        getCatalogId(state) {
            return state.user ? state.user.catlogId : ''
        },
        getName(state) {
            return state.user ? state.user.name : ''
        },
        getInstitution(state) {
            return state.user ? state.user.institution : ''
        },
        getDate(state) {
            return state.user ? state.user.date : ''
        },
    }
}