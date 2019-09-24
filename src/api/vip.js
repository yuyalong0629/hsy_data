import { axios } from 'utils/request.js'
import qs from 'qs'

/**
 * @description: 相似号
 * @param {Object} similar [相似号]
 * @return: api
 * @author yylong 2019/09/16
 */

const api = {
  payQuery: '/api/pay/payQuery',
  buyPrice: '/api/buy/buyPrice',
  confirmPay: '/api/pay/confirmPay',
  alipayReturn: '/api/notify/alipay_return'
}

/**
 * @description: 支付价格列表
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: similarKolList
 */

export function buyPrice(parameter) {
  return axios({
    method: 'get',
    url: api.buyPrice,
    params: parameter
  })
}

/**
 * @description: 支付创建订单
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: confirmPay
 */

export function confirmPay(parameter) {
  return axios({
    method: 'post',
    url: api.confirmPay,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 支付宝订单回调
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: alipayReturn
 */

export function alipayReturn(parameter) {
  return axios({
    method: 'post',
    url: api.alipayReturn,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 微信订单回调
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: similarKolList
 */

export function payQuery(parameter) {
  return axios({
    method: 'get',
    url: api.payQuery,
    params: parameter
  })
}
