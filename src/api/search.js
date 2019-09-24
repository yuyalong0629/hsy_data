import { axios } from 'utils/request.js'
// import qs from 'qs'

/**
 * @description: 账号搜索
 * @param {Object} similar [相似号]
 * @return: api
 * @author yylong 2019/09/16
 */

const api = {
  search: '/api/search'
}

/**
 * @description: 账号搜索
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: search
 */

export function search(parameter) {
  return axios({
    method: 'get',
    url: api.search,
    params: parameter
  })
}
