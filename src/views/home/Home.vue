<template>
  <div class="home">
    <!-- 榜首 -->
    <div class="for-top">
      <hsy-forTop @newsContentInfoList="newsContentInfoList" @helpUserData="helpUserData" />
    </div>

    <!-- 火烧云核心功能 -->
    <div class="home-core" ref="core">
      <home-rote />
    </div>

    <!-- 你可以做什么 -->
    <div class="home-select">
      <home-work :autoplay="autoplay" :getHelpUserData="getHelpUserData" />
    </div>

    <!-- Carousel -->
    <div class="home-carousel">
      <h3 class="home-carousel-title">海量账号 随意搜索</h3>
      <hsy-carousel />
    </div>

    <div class="home-more">
      <home-more />
    </div>

    <!-- 火烧云课堂 -->
    <div class="home-classroom">
      <div class="classroom-container">
        <h2 class="banner-h2-title">火烧云课堂</h2>
        <div class="classroom-content">
          <a-card
            hoverable
            style="width: 240px"
            v-for="(item, index) in  contentInfoList"
            :key="index"
            @click="handleDetail(item.id, item.type)"
          >
            <template slot="cover">
              <div class="ant-card-actions">
                <img class="classroom-content-img" alt="example" :src="item.coverImage" />
                <div class="classroom-content-hot">{{ index === 0 ? '最热' : '热文' }}</div>
              </div>
            </template>
            <a-card-meta :title="item.title">
              <template slot="description">{{ item.summary }}</template>
            </a-card-meta>
          </a-card>
        </div>
        <div class="now">
          <a-button size="large" type="primary" style="background: #ff5847;">
            <router-link :to="{path: '/mine', query: {index: 0}}">查看更多内容</router-link>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { morelist } from './list'
import Carousel from '@/components/carousel/Carousel'
import HomeRote from '@/components/homeRote/HomeRote'
import HomeWork from '@/components/homeWork/HomeWork'
import HomeMore from '@/components/homeMore/HomeMore'
import ForTop from '@/components/forTop/ForTop'

export default {
  name: 'home',
  data() {
    return {
      morelist: morelist,
      autoplay: false,
      contentInfoList: [],
      getHelpUserData: {}
    }
  },
  mounted() {
    // 滚动滚动监听事件
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    // 移除监听事件
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      const offsetTop = this.$refs.core.offsetTop
      if (scrollTop > offsetTop) {
        this.autoplay = true
      } else {
        this.autoplay = false
      }
    },
    newsContentInfoList(val) {
      this.contentInfoList = val
    },
    helpUserData(val) {
      this.getHelpUserData = val
    },
    handleDetail(index, type) {
      this.$router.push({
        path: '/mine/detail',
        query: { id: index, type: type }
      })
    }
  },
  components: {
    'hsy-carousel': Carousel,
    'hsy-forTop': ForTop,
    'home-rote': HomeRote,
    'home-work': HomeWork,
    'home-more': HomeMore
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/variable.less';
@import '~assets/styles/mixins.less';

.home {
  .for-top {
    background: url('../../assets/image/pkbanner.png') no-repeat center;
    background-size: cover;
    height: 540px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .home-core {
    .basicWidth();
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .home-select {
    width: 100%;
    height: 580px;
    background: url('../../assets/image/banner.png') no-repeat center;
    background-size: cover;
  }

  .home-carousel {
    width: 100%;
    padding: 48px 0 120px;
    .basicWidth();
    .home-carousel-title {
      font-size: @h3;
      text-align: center;
      padding: 12px 0 60px;
    }
  }

  .home-more {
    min-height: 600px;
    background: url('../../assets/image/banner2.png') no-repeat center;
    background-size: cover;
  }

  .home-classroom {
    width: 100%;
    margin: 50px 0;
    .classroom-container {
      .basicWidth();
      width: 1200px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .now {
        padding: 48px 0 0;
        text-align: center;
      }
      .banner-h2-title {
        font-size: @h3;
        line-height: 100px;
        text-align: center;
      }
      .classroom-content {
        display: flex;
        justify-content: space-around;
        .ant-card-actions {
          position: relative;
          .classroom-content-img {
            height: 160px;
            width: 100%;
          }
          .classroom-content-hot {
            right: 8px;
            bottom: 8px;
            position: absolute;
            background: #d21306;
            width: 60px;
            height: 24px;
            line-height: 24px;
            font-size: 14px;
            color: #fff;
            text-align: center;
          }
        }
      }

      /deep/ .ant-card-meta-detail .ant-card-meta-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .ant-card-meta-description {
        .ellipisisClamp();
      }
    }
  }
}
</style>
