import { monitorHistory } from 'api/monitor'

/**
 * @description: 监控历史
 * @param {Object} pageNo [页数]
 * @return: monitorHistory
 */

export function monitorHistoryInfo(params) {
  this.loading = true
  this.spinning = true
  return monitorHistory(params)
    .then(res => {
      if (res.code === 200) {
        console.log(res)
        this.loading = false
        this.spinning = false
        this.monitorInfo = res.page
      } else {
        this.loading = false
        this.spinning = false
        this.$message.error(res.message)
      }
    })
    .catch(err => {
      this.loading = false
      this.spinning = false
      this.$message.error(err)
    })
}
