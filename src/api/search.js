import { axios } from 'utils/request.js'
// import qs from 'qs'

/**
 * @description: 账号搜索
 * @param {Object} similar [相似号]
 * @return: api
 * @author yylong 2019/09/16
 */

const api = {
  searchKol: '/api//searchKol',
  searchFilter: '/api/searchFilter',
  searchContent: '/api/searchContent'
}

/**
 * @description: 账号搜索
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: search
 */

export function searchKol(parameter) {
  return axios({
    method: 'get',
    url: api.searchKol,
    params: parameter
  })
}

/**
 * @description: 账号搜索 分类显示
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @param {Number} type [1账号搜索 / 2内容搜索]
 * @return: searchFilter
 */

export function searchFilter(parameter) {
  return axios({
    method: 'get',
    url: api.searchFilter,
    params: parameter
  })
}

/**
 * @description: 内容搜索
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @param {Number} cType [1标题+简介 / 2标签+评论 / 3评论]
 * @return: searchContent
 */

export function searchContent(parameter) {
  return axios({
    method: 'get',
    url: api.searchContent,
    params: parameter
  })
}
