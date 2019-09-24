// 会员权限Tab Title
export const columns = [
  {
    slots: { title: 'permissionlTitle' },
    dataIndex: 'permission',
    align: 'center',
    key: 'permission'
  },
  {
    slots: { title: 'normalTitle' },
    dataIndex: 'member',
    align: 'center',
    key: 'member'
  },
  {
    slots: { title: 'vipTitle' },
    dataIndex: 'vip',
    align: 'center',
    key: 'vip'
  }
]

// 会员权限Tab Data
export const data = [
  {
    key: '1',
    permission: '高级搜索',
    member: 'Top20',
    vip: '不限次'
  },
  {
    key: '2',
    permission: '全网作品内容搜索',
    member: 'Top20',
    vip: '不限次'
  },
  {
    key: '3',
    permission: '账号内作品内容搜索',
    member: '无权',
    vip: '不限次'
  },
  {
    key: '4',
    permission: '搜索结果展示数量',
    member: 'Top20',
    vip: 'Top200'
  },
  {
    key: '5',
    permission: '投前分析次数',
    member: '无权',
    vip: '200次/月'
  },
  {
    key: '6',
    permission: '对发布作品即时间监控',
    member: '3次/月',
    vip: '200次/月'
  },
  {
    key: '7',
    permission: '对账号预约监控',
    member: '3次/月',
    vip: '100次/月'
  },
  {
    key: '8',
    permission: '数据监控时长',
    member: '24h',
    vip: '48h'
  },
  {
    key: '9',
    permission: '账号排行展示数量',
    member: 'Top20',
    vip: 'Top200'
  },
  {
    key: '10',
    permission: '收藏账号数量',
    member: '20个',
    vip: '200个'
  },
  {
    key: '11',
    permission: '相似账号查看数量',
    member: 'Top20',
    vip: 'Top200'
  }
]
