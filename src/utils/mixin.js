/**
 * @description: mixins basic
 * @param {Boolean} visible [Modal显示/隐藏]
 * @param {Boolean} loading [出发Loading状态]
 * @return: mixinBasic
 * @author yylong 2019/09/05
 */

export const mixinBasic = {
  data() {
    return {
      visible: false,
      loading: false,
      timeout: null
    }
  }
}
