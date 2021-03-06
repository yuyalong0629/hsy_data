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
            style="width: 120px"
          >
            <a-select-option value="1">标题 + 简介</a-select-option>
            <a-select-option value="2">标签 + 评论</a-select-option>
            <a-select-option value="3">评论</a-select-option>
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
import { mapGetters } from 'vuex'

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
          insearchData
            .call(this, {
              kolId: this.$route.query.kolId,
              pageNo: 0,
              ...this.searchValue,
              keyword: encodeURI(encodeURI(this.searchValue.keyword))
            })
            .then(() => {
              if (this.searchValue.type === '3') {
                this.defaultComment = true
              } else {
                this.defaultComment = false
              }
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
          // 非会员用户
          if (this.userInfo && this.userInfo.userType !== 1) {
            const _this = this
            this.$warning({
              title: '权限受限',
              content: '该功能仅VIP及以上会员使用，您可以购买或升级会员',
              okText: '立即升级',
              closable: true,
              onOk() {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    _this.$router.push({ path: '/pay' })
                    resolve()
                  }, 1000)
                }).catch(() => console.log('Oops errors!'))
              }
            })
            return
          }
          //  return
          insearchData
            .call(this, {
              kolId: this.$route.query.kolId,
              pageNo: 0,
              ...this.searchValue,
              keyword: encodeURI(encodeURI(this.searchValue.keyword))
            })
            .then(() => {
              if (this.searchValue.type === '3') {
                this.defaultComment = true
              } else {
                this.defaultComment = false
              }
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
  computed: {
    // userinfo
    ...mapGetters({
      userInfo: 'userStorage'
    })
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
.ant-modal-content .ant-modal-close .ant-modal-close-x i {
  color: rgba(0, 0, 0, 0.45);
}
</style>
