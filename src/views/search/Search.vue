<template>
  <div class="search">
    <!-- radio -->
    <div class="search-input-container">
      <div class="search-input">
        <a-row>
          <a-col :span="24" class="search-radio">
            <a-radio-group name="radioGroup" :value="params.type" @change="changeRadio">
              <a-radio :value="1">关键词搜索</a-radio>
              <a-radio :value="2">高级搜索</a-radio>
              <a-radio :value="3">作品内容搜索</a-radio>
            </a-radio-group>
          </a-col>
          <a-col :span="18">
            <a-input
              placeholder="请输入内容"
              size="large"
              :value="params.keyword"
              @change="changeInput"
              @pressEnter="enterInput"
            >
              <a-select
                v-if="isSearch"
                slot="addonBefore"
                @change="changeLabel"
                :value="params.sType"
                style="width: 90px"
              >
                <a-select-option value="1">标签</a-select-option>
                <a-select-option value="2">简介</a-select-option>
                <a-select-option value="3">标题</a-select-option>
                <a-select-option value="4">评论</a-select-option>
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
          <a-col :span="24" class="search-list" v-if="themeInfos.length">
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
          <a-col :span="24" class="search-list" v-if="basicDatas.length">
            <strong :style="{ marginRight: 8 }">粉丝数量:</strong>
            <div class="rank-list-item">
              <template v-for="(tag, index) in basicDatas">
                <a-checkable-tag
                  :key="tag.dataFlag"
                  :checked="index === params.fansIndex"
                  @change="(checked) => handleChangeFans(tag, checked, index, tag.dataFlag)"
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
          <hsy-skeleton v-if="!skeleton" />
          <component
            v-if="skeleton"
            :is="componentId"
            :pages="pages"
            :loading="loading"
            @pageNo="pageNo"
          ></component>
        </div>
      </a-spin>

      <hsy-permisson />
    </div>
  </div>
</template>

<script>
import { search } from 'api/search'
import Similar from '../similar/Similar'
import SearchList from './SearchList.vue'
import ContentList from './ContentList.vue'
import Permisson from '@/components/permisson/Permisson'
import Skeleton from '@/components/skeleton/Skeleton'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isSearch: false,
      timeout: null,
      platformInfos: [],
      themeInfos: [],
      basicDatas: [],
      pages: {},
      loading: false,
      spinning: false,
      componentId: 'hsy-search',
      params: {
        keyword: '', // 关键词
        type: 1, // 1关键字搜索；2高级搜索；3内容搜索
        pId: '1', // 平台Id
        pIndex: 0,
        tId: '', // 题材Id
        themeIndex: 0,
        fansNum: '', // 粉丝数据区间
        fansIndex: 0,
        grade: '', // 会员等级
        pageNo: 0,
        sType: '1' // 标签
      }
    }
  },
  mounted() {
    // storage
    if (this.$ls.get('searchInfo')) {
      this.params = this.$ls.get('searchInfo')
      this.searchInfo({
        ...this.params,
        keyword: encodeURI(encodeURI(this.params.keyword))
      })
      if (this.params.type === 3) {
        this.componentId = 'hsy-content'
        this.isSearch = true
        return
      }
      this.isSearch = false
      this.componentId = 'hsy-search'
    }
  },
  methods: {
    changeRadio(e) {
      // radio 赋值
      this.params.type = e.target.value
      if (e.target.value === 1) {
        this.componentId = 'hsy-search'
        this.isSearch = false
      }
      if (e.target.value === 2) {
        if (!this.hasLogin) {
          this.$store.commit('loginModal', true)
          return
        }
        this.componentId = 'hsy-search'
        this.isSearch = false
      }
      if (e.target.value === 3) {
        if (!this.hasLogin) {
          this.$store.commit('loginModal', true)
          return
        }
        // 显示内容搜索框
        this.isSearch = true
        // 切换 template
        this.componentId = 'hsy-content'
      }
      // 切换判断Input是否有值
      if (this.params.keyword) {
        // 节流
        if (this.timeout) {
          clearTimeout(this.timeout)
          this.timeout = null
        }
        this.timeout = setTimeout(() => {
          this.$ls.set('searchInfo', this.params)
          this.searchInfo({
            ...this.params,
            keyword: encodeURI(encodeURI(this.params.keyword))
          })
        }, 300)
      } else {
        // 没有关键词 清空数据
        this.pages = {}
      }
    },
    handleChangePlatform(tag, checked, index, id) {
      //
    },
    // 粉丝数量 change
    handleChangeFans(tag, checked, index, id) {
      console.log(id)
      this.params.fansIndex = index

      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        this.params.fansNum = id
        this.$ls.set('searchInfo', this.params)
        this.searchInfo({
          ...this.params,
          keyword: encodeURI(encodeURI(this.params.keyword))
        })
      }, 300)
    },
    // 行业分类
    handleChangeTheme(tag, checked, index, id) {
      this.params.themeIndex = index

      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        this.params.tId = id
        this.$ls.set('searchInfo', this.params)
        this.searchInfo({
          ...this.params,
          keyword: encodeURI(encodeURI(this.params.keyword))
        })
      })
    },
    // change input
    changeInput(e) {
      this.params.keyword = e.target.value
      // 无关键词清空缓存
      if (!e.target.value) {
        this.$ls.remove('searchInfo')
        this.platformInfos = []
        this.themeInfos = []
        this.basicDatas = []
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
        this.$ls.set('searchInfo', this.params)
      })
    },
    // change select
    changeLabel(value) {
      this.params.sType = value
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
        console.log(this.params)
        this.$ls.set('searchInfo', this.params)
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
      return search(params)
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            this.platformInfos = res.platformInfos || []
            this.themeInfos = res.themeInfos || []
            this.basicDatas = res.basicDatas || []
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
    // 判断是否有数据显示组件
    skeleton() {
      return Object.keys(this.pages).length
    },
    // userinfo
    ...mapGetters({
      userInfo: 'userStorage',
      hasLogin: 'hasLogin'
    })
  },
  components: {
    'hsy-search': SearchList,
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
    flex: 0 0 150px;
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
