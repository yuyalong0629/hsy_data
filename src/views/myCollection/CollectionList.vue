<template>
  <a-table
    class="rank-tab"
    :loading="loading"
    :columns="columns"
    :rowKey="record => record.id"
    :dataSource="getTabData"
    :pagination="pagination"
    @change="handleTableChange"
  >
    <template slot="media" slot-scope="text">
      <img v-lazy="text.kolImg" alt />
      <p>{{ text.kolName }}</p>
    </template>
    <template slot="kolId" slot-scope="text">
      <router-link :to="{ path: '/details', query: { kolId: text } }">查看详情</router-link>
    </template>
    <template slot="id" slot-scope="text">
      <a href="javascript:;" style="padding: 0 12px;">
        <a-icon type="delete" @click="remove(text)" />
      </a>
    </template>
  </a-table>
</template>

<script>
import { columns } from './index'
import { myCollectDelete } from 'api/collection'

export default {
  name: 'CollectionList',
  data() {
    return {
      columns,
      pagination: {
        pageSize: 20,
        hideOnSinglePage: true,
        total: 0
      }
    }
  },
  props: {
    tabData: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    // Tab change
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination)
      this.$emit('pageParam', pagination.current)
    },
    remove(id) {
      const that = this
      this.$confirm({
        title: '您是否要删除此收藏?',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000)
          })
            .then(() => {
              // 删除收藏
              myCollectDelete({
                userCollectKolInfoId: id
              }).then(res => {
                if (res.code === 200) {
                  that.$message.success(res.message)
                  that.$emit('update', '')
                } else {
                  that.$message.error(res.message)
                }
              })
            })
            .catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
    }
  },
  computed: {
    // Props tab 数据
    getTabData() {
      if (this.tabData.result) {
        return this.tabData.result.map((item, index) => {
          return {
            ...item,
            media: {
              kolImg: item.kolImg,
              kolName: item.kolName
            }
          }
        })
      }
    }
  },
  watch: {
    // 监听分页总页数
    tabData(val) {
      if (val) {
        this.pagination.total = val.count
      }
    }
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';
@import '~assets/styles/variable.less';

.rank-tab {
  margin: 20px 0;
  img {
    border: 0;
    margin-right: 8px;
    height: 42px;
    float: left;
  }
  p {
    display: inline-block;
    height: 42px;
    line-height: 42px;
  }
}
</style>
