import { details, insearch } from '@/api/detail'

/**
 * @description: 历史作品内容
 * @param {objec} params [params]
 * @return: getDetails
 */

export function getDetails(params) {
  this.$store.commit('loading', true)
  return details(params)
    .then(res => {
      if (res.code === 200) {
        // 用户信息
        this.kolInfo =
          { ...res.kolInfo, indexNum: res.kolTotalData.indexNum } || {}
        // fans
        this.kolTotalData = res.kolTotalData || {}
        // 用户详细信息
        const pageInfo = { ...res.page, isSearch: false } || {}
        // 列表分页详情信息
        this.$store.commit('pageInfo', pageInfo)
        // loading status
        this.$store.commit('loading', false)
      } else if (res.code === 403) {
        this.$router.go(-1)
        this.$message.warn(res.message)
      } else {
        this.$store.commit('loading', false)
      }
    })
    .catch(err => {
      this.$message.error(err)
      this.$store.commit('loading', false)
    })
}

/**
 * @description: 好内搜索
 * @param {objec} params [params]
 * @return: insearchData
 */

export function insearchData(params) {
  this.$store.commit('loading', true)
  return insearch(params)
    .then(res => {
      if (res.code === 200) {
        const searchInfo = { ...res.page, isSearch: true, ...this.searchValue }
        this.$store.commit('pageInfo', searchInfo)
        this.$store.commit('loading', false)
      } else {
        this.$message.error(res.message)
        this.$store.commit('loading', false)
      }
    })
    .catch(err => {
      this.$store.commit('loading', false)
      this.$message.error(err)
    })
}
