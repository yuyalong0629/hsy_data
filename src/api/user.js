import { axios } from 'utils/request.js'
import qs from 'qs'

/**
 * @description: 用户信息API统一管理
 * @param {Object} login [登录]
 * @return: api
 * @author yylong 2019/09/05
 */

const api = {
  login: '/api/gologin',
  verificationCode: '/api/valicode.jpg?+Math.round(Math.random()*10000)',
  verifyCode: '/api/smsVerifyCode',
  register: '/api/goregister',
  userInfo: '/api/user/userInfo',
  updatePhone: '/api/user/updatePhone',
  verifyOldPhone: '/api/user/verifyOldPhone',
  logout: '/api/logout',
  weixinLogin: '/api/weixinLogin',
  weixinBinding: '/api/user/weixinBinding',
  setCoverImage: '/api/user/setCoverImage'
}

/**
 * @description: 用户登录api
 * @param {String} url [请求url]
 * @param {string} method [请求方式]
 * @param {object} data [传入参数]
 * @return: login
 */

export function login(parameter) {
  return axios({
    url: api.login,
    method: 'post',
    data: qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * @description: 用户注册获取图片验证码
 * @param {type} null
 * @return: verificationCode
 */

export function verificationCode() {
  return axios({
    method: 'get',
    url: api.verificationCode,
    responseType: 'arraybuffer'
  })
}

/**
 * @description: 用户注册获取短信验证码
 * @param {object} parameter [验证用户名/验证码]
 * @return: verificationCode
 */

export function verifyCode(parameter) {
  return axios({
    method: 'post',
    url: api.verifyCode,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 用户注册提交
 * @param {Object} parameter [注册信息]
 * @return: verificationCode
 */

export function register(parameter) {
  return axios({
    method: 'post',
    url: api.register,
    data: qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * @description: 获取用户信息
 * @param {Object} parameter [注册信息]
 * @return: userInfo
 */

export function userInfo(parameter) {
  return axios({
    method: 'get',
    url: api.userInfo,
    params: parameter
  })
}

/**
 * @description: 微信扫码登录回调
 * @param {Object} parameter [注册信息]
 * @return: weixinLogin
 */

export function weixinLogin(parameter) {
  return axios({
    method: 'get',
    url: api.weixinLogin,
    params: parameter
  })
}

/**
 * @description: 微信绑定回调
 * @param {Object} parameter [注册信息]
 * @return: weixinBinding
 */

export function weixinBinding(parameter) {
  return axios({
    method: 'get',
    url: api.weixinBinding,
    params: parameter
  })
}

/**
 * @description: 退出登录
 * @param {Object} parameter [注册信息]
 * @return: userInfo
 */

export function logout(parameter) {
  return axios({
    method: 'get',
    url: api.logout,
    params: parameter
  })
}

/**
 * @description: 验证原手机号
 * @param {Object} parameter [注册信息]
 * @return: erifyOldPhone
 */

export function verifyOldPhone(parameter) {
  return axios({
    method: 'post',
    url: api.verifyOldPhone,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 更新手机号
 * @param {Object} parameter [注册信息]
 * @return: updatePhone
 */

export function updatePhone(parameter) {
  return axios({
    method: 'post',
    url: api.updatePhone,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 更新头像
 * @param {Object} parameter [注册信息]
 * @return: setCoverImage
 */

export function setCoverImage(parameter) {
  return axios({
    method: 'post',
    url: api.setCoverImage,
    data: qs.stringify(parameter)
  })
}
