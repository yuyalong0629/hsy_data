import { axios } from 'utils/request.js'
// import qs from 'qs'

/**
 * @description: 用户信息API统一管理
 * @param {Object} rank [排行榜]
 * @return: api
 * @author yylong 2019/09/05
 */

const api = {
  pkData: '/api/pkData'
}

/**
 * @description: 首页榜单粉丝数
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: pkData
 */

export function pkData(parameter) {
  return axios({
    method: 'get',
    url: api.pkData,
    params: parameter
  })
}
