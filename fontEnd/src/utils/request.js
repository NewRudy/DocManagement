import axios from 'axios'
import {
  ElMessage
} from 'element-plus'
import {
  useStore
} from 'vuex'
import {
  useRoute
} from 'vue-router'
import {
  emitter
} from '@/utils/bus'

const service = axios.create({
  baseURL: '/api',
  timeout: 99999
})


let activeAxios = 0
let timer
const showLoading = () => {
  activeAxios++
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    if (activeAxios > 0) {
      emitter.emit('showLoading')
    }
  }, 400)
}
const closeLoading = () => {
  activeAxios--
  if (activeAxios <= 0) {
    clearTimeout(timer)
    emitter.emit('closeLoading')
  }
}

// http request 拦截器
service.interceptors.request.use(
  config => {
    // const store = useStore()
    // config.headers = {
    // ...config.headers
    // }
    return config
  },
  error => {
    closeLoading()
    ElMessage({
      showClose: true,
      message: error,
      type: 'error'
    })
    return error
  }
)
service.interceptors.response.use(
  response => {
    closeLoading()
    if (response.data.code === 0) {
      return response.data
    } else {
      return new Error(res.message)
    }
  },
  error => {
    closeLoading()
    switch (error.response.status) {
      case 400:
        ElMessage({
          type: 'error',
          message: '请求参数错误！',
          showClose: true
        })
      case 404:
        ElMessage({
          type: 'error',
          message: '接口错误，请求资源不存在！',
          showClose: true
        });
        break;
      case 500:
        ElMessage({
          type: 'error',
          message: '服务器内部报错！',
          showClose: true
        });
        break;
    }
    return error
  }
)

export default service