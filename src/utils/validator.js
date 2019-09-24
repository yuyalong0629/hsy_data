/**
 * @description: 验证手机号规则
 * @param {Object} rule [规则]
 * @param {String} value [验证目标]
 * @param {function} callback [回调]
 * @return: validateUsername
 * @author yylong 2019/03/24
 */

export function validateUsername(rule, value, callback) {
  const regex = /^1[3456789]\d{9}$/
  if (!value) {
    callback(new Error('手机号不能为空'))
    return false
  }
  if (!regex.test(value)) {
    callback(new Error('请输入正确的手机号'))
    return false
  }
  callback()
}

/**
 * @description: 验证密码规则
 * @param {Object} rule [规则]
 * @param {String} value [验证目标]
 * @param {function} callback [回调]
 * @return: validatePassword
 * @author yylong 2019/03/24~
 */

export function validatePassword(rule, value, callback) {
  const regex = /[^0-9a-zA-Z_]/
  if (!value) {
    callback(new Error('密码不能为空'))
    return false
  }
  if (value.length < 6 || value.length > 18) {
    callback(new Error('请输入6~18位密码'))
    return false
  }
  if (regex.test(value)) {
    callback(new Error('密码不能有特殊字符'))
    return false
  }
  callback()
}
