import { axios } from 'utils/request.js'
// import qs from 'qs'

/**
 * @description: 详情信息API统一管理
 * @param {Object} detail [详情]
 * @return: api
 * @author yylong 2019/09/10
 */

const api = {
  details: '/api/koldetails',
  collectGroupList: '/api/user/collectGroupList',
  insearch: '/api/insearch',
  histordatas: '/api/histordatas'
}

/**
 * @description: 详情用户信息
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: details
 */

export function details(parameter) {
  return axios({
    method: 'get',
    url: api.details,
    params: parameter
  })
}

/**
 * @description: 号内搜索
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: search
 */

export function insearch(parameter) {
  return axios({
    method: 'get',
    url: api.insearch,
    params: parameter
  })
}

/**
 * @description: 历史作品数据统计
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: histordatas
 */

export function histordatas(parameter) {
  return axios({
    method: 'get',
    url: api.histordatas,
    params: parameter
  })
}
