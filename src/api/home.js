import { axios } from 'utils/request.js'
// import qs from 'qs'

/**
 * @description: 用户信息API统一管理
 * @param {Object} rank [排行榜]
 * @return: api
 * @author yylong 2019/09/05
 */

const api = {
  pkData: '/api/index',
  newsContentInfoList: '/api/newsContentInfoList',
  newsContentInfoDetail: '/api/newsContentInfoDetail'
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

/**
 * @description: 火烧云课堂
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: newsContentInfoList
 */

export function newsContentInfoList(parameter) {
  return axios({
    method: 'get',
    url: api.newsContentInfoList,
    params: parameter
  })
}

/**
 * @description: 火烧云课堂详情
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: newsContentInfoDetail
 */

export function newsContentInfoDetail(parameter) {
  return axios({
    method: 'get',
    url: api.newsContentInfoDetail,
    params: parameter
  })
}
