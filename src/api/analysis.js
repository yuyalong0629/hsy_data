import { axios } from 'utils/request.js'
// import qs from 'qs'

/**
 * @description: 排行榜图标信息
 * @param {Object} similar [相似号]
 * @return: api
 * @author yylong 2019/09/18
 */

const api = {
  videoData: '/api/videoData',
  fansPortrait: '/api/fansPortrait',
  videoDayData: '/api/videoDayData'
}

/**
 * @description: 排行榜图标信息
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: videoData
 */

export function videoData(parameter) {
  return axios({
    method: 'get',
    url: api.videoData,
    params: parameter
  })
}

/**
 * @description: 粉丝画像分析
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: videoData
 */

export function fansPortrait(parameter) {
  return axios({
    method: 'get',
    url: api.fansPortrait,
    params: parameter
  })
}

/**
 * @description: 粉丝数据趋势
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: videoDayData
 */

export function videoDayData(parameter) {
  return axios({
    method: 'get',
    url: api.videoDayData,
    params: parameter
  })
}
