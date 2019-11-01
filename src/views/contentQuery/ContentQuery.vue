<template>
  <div class="search">
    <!-- radio -->
    <div class="search-input-container">
      <div class="search-input">
        <a-row>
          <a-col :span="18">
            <a-input
              placeholder="请输入商品,品牌名称等关键词搜索"
              size="large"
              :value="params.keyword"
              @change="changeInput"
              @pressEnter="enterInput"
            >
              <a-select
                slot="addonBefore"
                @change="changeLabel"
                :value="params.cType"
                style="width: 120px"
              >
                <a-select-option value="1">标题 + 简介</a-select-option>
                <a-select-option value="2">标签 + 评论</a-select-option>
                <a-select-option value="3">评论</a-select-option>
              </a-select>
              <template slot="addonAfter">
                <span class="search-search-btn" @click="onSearch">搜索</span>
              </template>
            </a-input>
          </a-col>
          <a-col :span="24" class="search-list" v-if="platformInfos.length">
            <strong :style="{ marginRight: 8 }">支持平台:</strong>
            <div class="rank-list-item">
              <template v-for="(tag, index) in platformInfos">
                <a-checkable-tag
                  :key="tag.id"
                  :checked="index === params.pIndex"
                  @change="(checked) => handleChangePlatform(tag, checked, index, tag.id)"
                >{{ tag.name }}</a-checkable-tag>
              </template>
            </div>
          </a-col>
          <a-col :span="24" class="search-list" v-if="themeInfos.length > 1">
            <strong :style="{ marginRight: 8 }">行业分类:</strong>
            <div class="rank-list-item">
              <template v-for="(tag, index) in themeInfos">
                <a-checkable-tag
                  :key="tag.id"
                  :checked="index === params.themeIndex"
                  @change="(checked) => handleChangeTheme(tag, checked, index, tag.id)"
                >{{ tag.name }}</a-checkable-tag>
              </template>
            </div>
          </a-col>
          <a-col :span="24" class="search-list" v-if="fansBasicDatas.length > 1">
            <strong :style="{ marginRight: 8 }">粉丝数量:</strong>
            <div class="rank-list-item">
              <template v-for="(tag, index) in fansBasicDatas">
                <a-checkable-tag
                  :key="tag.dataFlag"
                  :checked="index === params.fansIndex"
                  @change="(checked) => handleChangeFans(tag, checked, index, tag.dataFlag)"
                >{{ tag.dataName }}</a-checkable-tag>
              </template>
            </div>
          </a-col>
          <a-col :span="24" class="search-list" v-if="playBasicDatas.length > 1">
            <strong :style="{ marginRight: 8 }">播放数量:</strong>
            <div class="rank-list-item">
              <template v-for="(tag, index) in playBasicDatas">
                <a-checkable-tag
                  :key="tag.dataFlag"
                  :checked="index === params.playIndex"
                  @change="(checked) => handleChangePlay(tag, checked, index, tag.dataFlag)"
                >{{ tag.dataName }}</a-checkable-tag>
              </template>
            </div>
          </a-col>
          <a-col :span="24" class="search-list" v-if="praiseBasicDatas.length > 1">
            <strong :style="{ marginRight: 8 }">点赞数量:</strong>
            <div class="rank-list-item">
              <template v-for="(tag, index) in praiseBasicDatas">
                <a-checkable-tag
                  :key="tag.dataFlag"
                  :checked="index === params.praiseIndex"
                  @change="(checked) => handleChangePraise(tag, checked, index, tag.dataFlag)"
                >{{ tag.dataName }}</a-checkable-tag>
              </template>
            </div>
          </a-col>
          <a-col :span="24" class="search-list" v-if="publishTimeBasicDatas.length > 1">
            <strong :style="{ marginRight: 8 }">发布时间:</strong>
            <div class="rank-list-item">
              <template v-for="(tag, index) in publishTimeBasicDatas">
                <a-checkable-tag
                  :key="tag.dataFlag"
                  :checked="index === params.timeIndex"
                  @change="(checked) => handleChangeTime(tag, checked, index, tag.dataFlag)"
                >{{ tag.dataName }}</a-checkable-tag>
              </template>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="search-container">
      <!-- list -->
      <a-spin :spinning="spinning">
        <div class="search-list">
          <component
            v-if="this.pages && this.pages.result"
            :is="componentId"
            :pages="pages"
            :loading="loading"
            @pageNo="pageNo"
          ></component>
          <hsy-skeleton v-if="!this.pages.result || !this.pages.result.length" />
        </div>
      </a-spin>
      <hsy-permisson />
    </div>
  </div>
</template>

<script>
import { searchContent, searchFilter } from 'api/search'
import Similar from '../similar/Similar'
import ContentList from './ContentList.vue'
import Permisson from '@/components/permisson/Permisson'
import Skeleton from '@/components/skeleton/Skeleton'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      timeout: null,
      platformInfos: [],
      themeInfos: [],
      fansBasicDatas: [],
      playBasicDatas: [],
      praiseBasicDatas: [],
      publishTimeBasicDatas: [],
      pages: {},
      loading: false,
      spinning: false,
      componentId: 'hsy-content',
      params: {
        keyword: '', // 关键词
        pId: '1', // 平台Id
        pIndex: 0,
        tId: '', // 题材Id
        themeIndex: 0,
        fansNum: '', // 粉丝数据区间
        fansIndex: 0,
        grade: '', // 会员等级
        pageNo: 0,
        playIndex: 0, // 播放数 index
        playNum: '',
        praiseIndex: 0, // 播放数 index
        praiseNum: '',
        timeIndex: 0, // 播放数 index
        publishTime: '',
        cType: '1' // 标签
      }
    }
  },
  created() {
    // storage
    // if (this.$ls.get('searchContent')) {
    //   this.params = this.$ls.get('searchContent')
    //   this.searchInfo({
    //     ...this.params,
    //     keyword: encodeURI(encodeURI(this.params.keyword))
    //   })
    // }
  },
  mounted() {
    // 初始化分类
    searchFilter({ type: 2 }).then(res => {
      if (res.code === 200) {
        this.platformInfos = res.platformInfos || []
        this.themeInfos = res.themeInfos || []
        this.fansBasicDatas = res.fansBasicDatas || []
        // 播放数
        this.playBasicDatas = res.playBasicDatas || []
        // 点赞数
        this.praiseBasicDatas = res.praiseBasicDatas || []
        // 发布时间
        this.publishTimeBasicDatas = res.publishTimeBasicDatas || []
      }
    })
  },
  methods: {
    handleChangePlatform(tag, checked, index, id) {
      //
    },
    // 粉丝数量 change
    handleChangeFans(tag, checked, index, id) {
      if (!this.params.keyword) {
        this.$message.warning('关键词不能为空')
        return
      }
      // 判断是否会员
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
          },
          onCancel() {}
        })
        return
      }
      this.params.fansIndex = index

      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        this.params.fansNum = id
        // this.$ls.set('searchContent', this.params)
        this.searchInfo({
          ...this.params,
          keyword: encodeURI(encodeURI(this.params.keyword))
        })
      }, 300)
    },
    // 行业分类
    handleChangeTheme(tag, checked, index, id) {
      if (!this.params.keyword) {
        this.$message.warning('关键词不能为空')
        return
      }
      // 判断是否会员
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
          },
          onCancel() {}
        })
        return
      }
      this.params.themeIndex = index
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        this.params.tId = id
        // this.$ls.set('searchContent', this.params)
        this.searchInfo({
          ...this.params,
          keyword: encodeURI(encodeURI(this.params.keyword))
        })
      })
    },
    // 播放数 change
    handleChangePlay(tag, checked, index, id) {
      if (!this.params.keyword) {
        this.$message.warning('关键词不能为空')
        return
      }
      // 判断是否会员
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

      this.params.playIndex = index

      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        this.params.playNum = id

        this.searchInfo({
          ...this.params,
          keyword: encodeURI(encodeURI(this.params.keyword))
        })
      }, 300)
    },

    // 点赞数 change
    handleChangePraise(tag, checked, index, id) {
      console.log(id)
      if (!this.params.keyword) {
        this.$message.warning('关键词不能为空')
        return
      }
      // 判断是否会员
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

      this.params.praiseIndex = index

      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        this.params.praiseNum = id

        this.searchInfo({
          ...this.params,
          keyword: encodeURI(encodeURI(this.params.keyword))
        })
      }, 300)
    },
    // 发布时间 change
    handleChangeTime(tag, checked, index, id) {
      if (!this.params.keyword) {
        this.$message.warning('关键词不能为空')
        return
      }
      // 判断是否会员
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

      this.params.timeIndex = index

      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        this.params.publishTime = id

        this.searchInfo({
          ...this.params,
          keyword: encodeURI(encodeURI(this.params.keyword))
        })
      }, 300)
    },
    // change input
    changeInput(e) {
      this.params.keyword = e.target.value
      // 无关键词清空缓存
      if (!e.target.value) {
        // this.$ls.remove('searchContent')
        this.pages = {}
      }
    },
    // enter input
    enterInput(e) {
      // storage
      if (!this.params.keyword) {
        this.$message.warn('关键词不能为空')
        return
      }
      this.searchInfo({
        ...this.params,
        keyword: encodeURI(encodeURI(this.params.keyword))
      }).then(() => {
        // storage
        // this.$ls.set('searchContent', this.params)
      })
    },
    // change select
    changeLabel(value) {
      this.params.cType = value
    },
    // page
    pageNo(val) {
      this.searchInfo({
        ...this.params,
        keyword: encodeURI(encodeURI(this.params.keyword)),
        pageNo: val
      })
    },
    // 搜索 BTN
    onSearch() {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        // this.$ls.set('searchContent', this.params)
        if (!this.params.keyword) {
          this.$message.warn('关键词不能为空')
          return
        }
        this.searchInfo({
          ...this.params,
          keyword: encodeURI(encodeURI(this.params.keyword))
        })
      }, 300)
    },
    // 搜索 function
    searchInfo(params) {
      this.loading = true
      this.spinning = true
      return searchContent(params)
        .then(res => {
          if (res.code === 200) {
            // 处理评论单条数据显示
            const target = res.page.result.map(item => {
              const matchStr = JSON.parse(item.commentContent).filter(cItem => {
                return cItem.ct
                  ? cItem.ct.indexOf(this.params.keyword) !== -1
                  : cItem.indexOf(this.params.keyword) !== -1
              })
              return {
                ...item,
                commentContent: matchStr.length
                  ? matchStr[0]
                  : JSON.parse(item.commentContent)[0]
              }
            })

            this.pages = {
              ...res.page,
              keyword: this.params.keyword,
              counts: res.count,
              result: [...target]
            }

            this.loading = false
            this.spinning = false
          } else {
            this.$message.error(res.message)
            this.loading = false
            this.spinning = false
          }
        })
        .catch(() => {
          this.loading = false
          this.spinning = false
        })
    }
  },
  computed: {
    // userinfo
    ...mapGetters({
      userInfo: 'userStorage',
      hasLogin: 'hasLogin'
    })
  },
  components: {
    'hsy-content': ContentList,
    'hsy-permisson': Permisson,
    'hsy-skeleton': Skeleton
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';

.search {
  width: 100%;
  height: 100%;
  background: #f1f5f6;
  display: flex;
  flex-direction: column;
  .search-input-container {
    background: #fff;
    flex: 1;
  }
  .search-input {
    .basicWidth();
    padding: 24px 0;
    background: #fff;
    .search-radio {
      margin: 24px 0;
    }
    .search-search-btn {
      width: 100%;
      height: 100%;
      display: inline-block;
      line-height: 36px;
    }
    .ant-input-group-addon:last-child {
      color: #fff;
      background-color: #da5054;
      border-color: #da5054;
      cursor: pointer;
      width: 80px;
      height: 36px;
      padding: 0;
    }
    .search-list {
      display: flex;
      margin: 24px 0 0;
      strong {
        flex: 0 0 80px;
        padding-top: 2px;
        font-size: 14px;
        line-height: 16px;
      }
      .rank-list-item {
        display: flex;
        flex-wrap: wrap;
        .ant-tag {
          margin: 0 10px 10px 0;
          font-size: 14px;
        }
        &:nth-child(2) {
          margin-bottom: -10px;
        }
      }
    }
  }
  .search-container {
    flex: 1;
    .basicWidth();
    padding-bottom: 12px;
  }
}
</style>
