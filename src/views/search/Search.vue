<template>
  <div class="search">
    <!-- radio -->
    <div class="search-input-container" v-if="platformInfos.length">
      <div class="search-input">
        <a-row>
          <a-col :span="18">
            <a-input
              placeholder="请输入账号名称,达人名等关键词搜索"
              size="large"
              :value="params.keyword"
              @change="changeInput"
              @pressEnter="enterInput"
            >
              <template slot="addonAfter">
                <span class="search-search-btn" @click="onSearch">搜索</span>
              </template>
            </a-input>
          </a-col>
          <a-col :span="24" class="search-list">
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
import { searchKol, searchFilter } from 'api/search'
import Similar from '../similar/Similar'
import SearchList from './SearchList.vue'
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
      pages: {},
      loading: false,
      spinning: false,
      componentId: 'hsy-search',
      params: {
        keyword: '', // 关键词
        pId: '1', // 平台Id
        pIndex: 0,
        tId: '', // 题材Id
        themeIndex: 0,
        fansNum: '', // 粉丝数据区间
        fansIndex: 0,
        grade: '', // 会员等级
        playIndex: 0, // 播放数 index
        playNum: '',
        praiseIndex: 0, // 播放数 index
        praiseNum: '',
        pageNo: 0
      }
    }
  },
  created() {
    // storage
    // if (this.$ls.get('searchInfo')) {
    //   this.params = this.$ls.get('searchInfo')
    //   this.searchInfo({
    //     ...this.params,
    //     keyword: encodeURI(encodeURI(this.params.keyword))
    //   })
    // }
  },
  mounted() {
    searchFilter({ type: 1 }).then(res => {
      if (res.code === 200) {
        this.platformInfos = res.platformInfos || []
        this.themeInfos = res.themeInfos || []
        this.fansBasicDatas = res.fansBasicDatas || []
        // 播放数
        this.playBasicDatas = res.playBasicDatas || []
        // 点赞数
        this.praiseBasicDatas = res.praiseBasicDatas || []
      }
    })
  },
  methods: {
    handleChangePlatform(tag, checked, index, id) {
      //
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
        // this.$ls.set('searchInfo', this.params)
        this.searchInfo({
          ...this.params,
          keyword: encodeURI(encodeURI(this.params.keyword))
        })
      })
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
          }
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
        // this.$ls.set('searchInfo', this.params)
        this.searchInfo({
          ...this.params,
          keyword: encodeURI(encodeURI(this.params.keyword))
        })
      }, 300)
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
    // change input
    changeInput(e) {
      this.params.keyword = e.target.value
      // 无关键词清空缓存
      if (!e.target.value) {
        // this.$ls.remove('searchInfo')
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
        // this.$ls.set('searchInfo', this.params)
      })
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
        // this.$ls.set('searchInfo', this.params)
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
      return searchKol(params)
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            this.pages = {
              ...res.page,
              keyword: this.params.keyword,
              counts: res.count
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
    'hsy-search': SearchList,
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
