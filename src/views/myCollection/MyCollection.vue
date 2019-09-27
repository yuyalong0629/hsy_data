<template>
  <div class="myCollection">
    <div class="myCollection-container">
      <div class="my-grouping">
        <strong :style="{ marginRight: 8 }">我的分组:</strong>
        <div class="rank-list-item-tags">
          <template v-for=" (tag, index) in userThemeInfos">
            <a-checkable-tag
              :key="tag.id"
              :checked="index === themeIndex"
              @change="(checked) => handleChangeTheme(tag, checked, index, tag.id)"
            >{{ tag.themeName }}</a-checkable-tag>
          </template>
        </div>
      </div>
      <h4>收藏列表</h4>
      <a-divider />
      <div class="my-list">
        <hsy-skeleton v-if="Object.keys(tabData).length && !tabData.result.length" />
        <hsy-collectionList
          v-if="Object.keys(tabData).length && tabData.result.length"
          :tabData="tabData"
          :loading="loading"
          @pageParam="pageParam"
          @update="update"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CollectionList from './CollectionList'
import { collectionlist } from './index'
import Skeleton from '@/components/skeleton/Skeleton'

export default {
  name: 'MyCollection',
  data() {
    return {
      userThemeInfos: [],
      themeIndex: 0,
      tabData: {},
      loading: false,
      themeId: ''
    }
  },
  mounted() {
    collectionlist.call(this, {
      themeId: this.themeId,
      pageNo: 0
    })
  },
  methods: {
    handleChangeTheme(tag, checked, index, id) {
      this.themeIndex = index
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        this.themeId = id
        collectionlist.call(this, {
          themeId: this.themeId,
          pageNo: 0
        })
      }, 300)
    },
    pageParam(val) {
      collectionlist.call(this, {
        themeId: this.themeId,
        pageNo: val
      })
    },
    update(val) {
      collectionlist.call(this, {
        themeId: val,
        pageNo: val
      })
    }
  },
  components: {
    'hsy-collectionList': CollectionList,
    'hsy-skeleton': Skeleton
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';
@import '~assets/styles/variable.less';

.myCollection {
  width: 100%;
  .myCollection-container {
    .basicWidth();

    .my-grouping {
      margin: 30px 0;
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
}
</style>
