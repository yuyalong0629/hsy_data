<template>
  <div class="rank-list">
    <div class="rank-list-item">
      <strong :style="{ marginRight: 8 }">支持平台:</strong>
      <template v-for="tag in platformInfos">
        <a-checkable-tag :key="tag.id" :checked="true">{{ tag.name }}</a-checkable-tag>
      </template>
    </div>
    <div class="rank-list-item">
      <strong :style="{ marginRight: 8 }">行业分类:</strong>
      <div class="rank-list-item-tags">
        <template v-for="(tag, index) in themeInfos">
          <a-checkable-tag
            :key="tag.id"
            :checked="index === themeIndex"
            @change="(checked) => handleChangeTheme(tag, checked, index, tag.id)"
          >{{ tag.name }}</a-checkable-tag>
        </template>
      </div>
    </div>
    <div class="rank-list-item">
      <strong :style="{ marginRight: 8 }">排序方式:</strong>
      <template v-for="(tag, index) in sorts">
        <a-checkable-tag
          :key="tag.sortId"
          :checked="index === sortsIndex"
          @change="(checked) => handleChangeSorts(tag, checked, index, tag.sortId)"
        >{{ tag.sortName }}</a-checkable-tag>
      </template>
    </div>
  </div>
</template>

<script>
import { mixinBasic } from '@/utils/mixin.js'
import { searchKol, searchFilter } from 'api/search'

export default {
  name: 'ranklist',
  mixins: [mixinBasic],
  data() {
    return {
      platformInfos: [],
      themeInfos: [],
      sorts: [],
      themeIndex: 0,
      sortsIndex: 0,
      params: [
        {
          pid: 1,
          tId: 0,
          sort: 0
        }
      ]
    }
  },
  created() {
    searchFilter({ type: 0 }).then(res => {
      if (res.code === 200) {
        // 支持平台信息
        this.platformInfos = res.platformInfos || []
        // 行业分类
        this.themeInfos = res.themeInfos || []
        // 排序方式
        this.sorts = res.sorts || []
      }
    })
  },
  mounted() {
    // 初始化
    this.presenceSession()
  },
  methods: {
    // 行业分类 change
    handleChangeTheme(tag, checked, index, id) {
      this.themeIndex = index
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        // storage
        // this.$ls.set('themeParam', {
        //   index: this.themeIndex,
        //   id: id
        // })
        const target = this.params.map(item => ({
          ...item,
          tId: id
        }))
        this.$emit('listParam', { ...target })
        this.params = [...target]
      }, 300)
    },
    // 排序方式 change
    handleChangeSorts(tag, checked, index, id) {
      this.sortsIndex = index
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        // storage
        // this.$ls.set('sortsParam', {
        //   index: this.sortsIndex,
        //   id: id
        // })
        const target = this.params.map(item => ({
          ...item,
          sort: id
        }))
        this.$emit('listParam', ...target)
        this.params = [...target]
      }, 300)
    },
    // 初始化判断是否存在session
    presenceSession() {
      // const getTheme = this.$ls.get('themeParam')
      // const getSorts = this.$ls.get('sortsParam')
      // if (getTheme) {
      //   this.themeIndex = getTheme.index || 0
      //   const target = this.params.map(item => ({
      //     ...item,
      //     tId: getTheme.id
      //   }))
      //   this.params = [...target]
      // }
      // if (getSorts) {
      //   this.sortsIndex = getSorts.index || 0
      //   const target = this.params.map(item => ({
      //     ...item,
      //     sort: getSorts.id
      //   }))
      //   this.params = [...target]
      // }
      this.$emit('sessionParam', ...this.params)
    }
  }
}
</script>

<style lang="less" scope>
.rank-list {
  margin: 30px 0;
  .rank-list-item {
    margin: 15px 0;
    display: flex;
    flex-wrap: wrap;
    strong {
      flex: 0 0 80px;
      padding-top: 2px;
      font-size: 14px;
      line-height: 16px;
    }
    .rank-list-item-tags {
      flex: 1;
      .ant-tag {
        margin: 0 10px 10px 0;
      }
    }
    &:nth-child(2) {
      margin-bottom: -10px;
    }
  }
}
</style>
