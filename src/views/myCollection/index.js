import { myCollect, myCollectDelete } from 'api/collection'

// rank tabs
export const columns = [
  {
    title: '特权功能',
    dataIndex: 'media',
    scopedSlots: { customRender: 'media' },
    width: 300
  },
  {
    title: '分组',
    dataIndex: 'sortFlag',
    width: 320
  },
  {
    title: '收藏',
    dataIndex: 'createTime'
  },
  {
    title: '查看详情',
    dataIndex: 'kolId',
    scopedSlots: { customRender: 'kolId' }
  },
  {
    title: '其他操作',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  }
]

/**
 * @description:收藏列表
 * @param {type}
 * @return:
 */

export function collectionlist(params) {
  this.loading = true
  return myCollect(params)
    .then(res => {
      if (res.code === 200) {
        console.log(res)
        this.userThemeInfos = res.userThemeInfos || []
        this.tabData = res.page || {}
      } else {
      }
    })
    .then(() => {
      this.loading = false
    })
    .catch(() => {
      this.loading = false
    })
}
