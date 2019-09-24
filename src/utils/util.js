/**
 * @description: 短信验证码倒计时
 * @param {Number} 倒计时
 * @method factory
 * @return: factorySendCode
 * @author yylong 2019/03/24
 */

export function factorySendCode(num) {
  if (this.remaining === 0) {
    this.disabled = false
    this.remaining = num
    this.btnText = '发送验证码'
    this.btnType = 'primary'
    return false
  } else {
    this.disabled = true
    this.btnText = '重新发送' + this.remaining
    this.remaining--
    setTimeout(() => {
      factorySendCode.call(this, num)
    }, 1000)
  }
}

/**
 * @description: 登录提示
 * @param {type} null
 * @return: timeFix
 * @author yylong 2019/09/02
 */

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? '早上好'
    : hour <= 11
      ? '上午好'
      : hour <= 13
        ? '中午好'
        : hour < 20
          ? '下午好'
          : '晚上好'
}
/**
 * @description: 关键词高亮
 * @param {String} value [目标字符串]
 * @param {String} keyword [关键词]
 * @return: light
 */

export function light(value, keyword) {
  return value.replace(
    new RegExp(keyword, 'gi'),
    `<span style="color: red;">${keyword}</span>`
  )
}
