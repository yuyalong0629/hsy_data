import axios from 'axios'
import { notification } from 'ant-design-vue'
import router from '../router'
import store from '../store/index'

const service = axios.create({
  timeout: 10000 // 请求超时时间
})

const err = error => {
  if (error.response) {
    if (error.response.status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: error.response.statusText
      })
    }
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: '你没有权限访问，请联系管理员咨询'
      })
      router.replace({ path: '/403' })
    }
    if (error.response.status === 404) {
      notification.error({
        message: 'Not Found',
        description: '客户端不存在'
      })
      router.replace({ path: '/404' })
    }
    if (error.response.status === 500 || error.response.status === 502) {
      notification.error({
        message: 'Server Error',
        description: '内部服务器错误'
      })
      router.replace({ path: '/500' })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  return config
}, err)

// response interceptor
service.interceptors.response.use(response => {
  if (response.data.code === 0) {
    setTimeout(() => {
      store.commit('logout', false)
      // 未登录状态显示登录 Modal
      store.commit('loginModal', true)
      router.replace({ path: '/home' })
      // notification.error({
      //   message: '用户未登录或登录失效'
      // })
      // resolve()
    }, 1000)
  }
  if (response.data.isLogin === 0) {
    setTimeout(() => {
      store.commit('logout', false)
      // resolve()
    }, 1000)
  }
  return response.data
}, err)

export { service as axios }
