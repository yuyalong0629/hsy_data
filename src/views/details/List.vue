<template>
  <div class="list">
    <div class="list-radio">
      <a-radio-group :value="radioValue" @change="onChangeRadio" buttonStyle="solid">
        <a-radio-button value="1">历史作品内容</a-radio-button>
        <a-radio-button value="2">历史数据统计</a-radio-button>
      </a-radio-group>
      <div v-if="radioValue === '1'">
        <a-input
          placeholder="号内搜索请输入关键词"
          :value="searchValue.keyword"
          @change="changeInput"
          @pressEnter="enterInput"
        >
          <a-select
            slot="addonBefore"
            :value="searchValue.type"
            @change="changeLabel"
            style="width: 90px"
          >
            <a-select-option value="1">标签</a-select-option>
            <a-select-option value="2">简介</a-select-option>
            <a-select-option value="3">标题</a-select-option>
            <a-select-option value="4">评论</a-select-option>
          </a-select>
          <a-icon slot="addonAfter" @click="search" type="search" />
        </a-input>
      </div>
    </div>
    <div class="list-info">
      <component
        :is="componentId"
        @pageNo="pageNo"
        :defaultComment="defaultComment"
        @changeComment="changeComment"
      ></component>
    </div>
  </div>
</template>

<script>
import ListContent from './ListContent'
import ListStatistics from './ListStatistics'
import { getDetails, insearchData } from './index'

export default {
  name: 'List',
  data() {
    return {
      radioValue: '1',
      componentId: 'ListContent',
      searchValue: {
        keyword: '',
        type: '1'
      },
      timeout: null,
      defaultComment: false
    }
  },
  methods: {
    // radio
    onChangeRadio(e) {
      this.radioValue = e.target.value
      if (e.target.value === '1') {
        this.componentId = 'ListContent'
      } else {
        this.componentId = 'ListStatistics'
      }
    },
    // change input
    changeInput(e) {
      this.searchValue.keyword = e.target.value
      // 清空查看全部
      if (e.target.value === '') {
        this.searchValue.type = '1'
        getDetails.call(this, {
          kolId: this.$route.query.kolId,
          pageNo: 0
        })
      }
    },
    // enter input
    enterInput(e) {
      // 函数节流
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        if (this.searchValue.keyword) {
          if (this.searchValue.type === '4') {
            this.defaultComment = true
          } else {
            this.defaultComment = false
          }
          insearchData.call(this, {
            kolId: this.$route.query.kolId,
            pageNo: 0,
            ...this.searchValue,
            keyword: encodeURI(encodeURI(this.searchValue.keyword))
          })
        } else {
          this.$message.warn('关键词不能为空')
        }
      }, 500)
    },
    // change select
    changeLabel(value) {
      this.searchValue.type = value
    },
    // 搜索
    search(value) {
      // 函数节流
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        if (this.searchValue.keyword) {
          if (this.searchValue.type === '4') {
            this.defaultComment = true
          } else {
            this.defaultComment = false
          }
          insearchData.call(this, {
            kolId: this.$route.query.kolId,
            pageNo: 0,
            ...this.searchValue,
            keyword: encodeURI(encodeURI(this.searchValue.keyword))
          })
        } else {
          this.$message.warn('关键词不能为空')
        }
      }, 500)
    },
    changeComment(val) {
      if (!val) {
        this.defaultComment = val
      }
    },
    pageNo(val) {
      insearchData.call(this, {
        kolId: this.$route.query.kolId,
        pageNo: val,
        ...this.searchValue,
        keyword: encodeURI(encodeURI(this.searchValue.keyword))
      })
    }
  },
  components: {
    ListContent,
    ListStatistics
  }
}
</script>

<style lang="less" scope>
.list {
  margin: 15px 0;
  .list-radio {
    display: flex;
    justify-content: space-between;
    .ant-input-group-addon {
      line-height: 1.2;
    }
  }

  .list-info {
    border: 1px solid #ececec;
    padding: 20px;
    margin-top: 15px;
  }
}
</style>
