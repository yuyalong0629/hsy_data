// rank tabs
export const columns = [
  {
    title: '排行',
    dataIndex: 'top',
    width: 80
  },
  {
    title: '媒体主',
    dataIndex: 'media',
    className: 'rank-tab-media',
    scopedSlots: { customRender: 'media' },
    width: 320
  },
  {
    title: '粉丝数',
    dataIndex: 'fansNum'
  },
  {
    title: '平均播放数',
    dataIndex: 'avgPlayNum'
  },
  {
    title: '平均评论数',
    dataIndex: 'avgCommentNum'
  },
  {
    slots: { title: 'cloudsTitle' },
    dataIndex: 'indexNum'
  },
  {
    title: '其他操作',
    dataIndex: 'kolId',
    scopedSlots: { customRender: 'kolId' }
  }
]
