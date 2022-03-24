// 将用户等数据保存在 localStorage 中，持久化存储
const storage = {
  set(key, value) {
    window.localStorage.setItem(key, value)
  },

  get(key) {
    return window.localStorage.getItem(key)
  },

  remove(key) {
    window.localStorage.removeItem(key)
  }
}

export default storage