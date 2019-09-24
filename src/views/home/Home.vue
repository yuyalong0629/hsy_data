<template>
  <div class="home">
    <!-- banner -->
    <div class="banner">
      <h2 class="banner-h2-title animated bounceInLeft">让天下没有难投的新媒体广告</h2>
      <h3 class="banner-h3-title animated bounceInRight">快速找号、轻松辨号、广告价值分析、投放数据监控，投广告快准稳</h3>
      <h3
        class="banner-h3-title"
        style="color: #da5054; margin-top: 24px;"
      >平台升级中，更好体验，敬请期待...26号15:00</h3>
      <ul class="banner-img">
        <li v-for="(item, index) of bannerList" :key="index">
          <!-- <img v-lazy="item" alt /> -->
        </li>
      </ul>
    </div>

    <!-- 榜首 -->
    <div class="for-top">
      <hsy-forTop />
    </div>

    <!-- select -->
    <div class="select" ref="select">
      <div
        class="select-list animated"
        :class="{ pulse: isScroll }"
        v-for="(item, index) of selectlist"
        :key="index"
      >
        <div class="select-list-left">
          <img v-lazy="item.img" alt />
        </div>
        <div class="select-list-right">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <p>{{ item.slogan }}</p>
        </div>
      </div>
    </div>

    <!-- Carousel -->
    <div class="carousel">
      <div class="carousel-container">
        <hsy-carousel />
      </div>
    </div>

    <!-- more -->
    <div class="more">
      <div class="more-container">
        <h2 class="banner-h2-title">更多实用工具</h2>
        <ul class="more-nav">
          <li
            class="more-item animated"
            :class="{heartBeat: isFlip}"
            style="animation-duration: 2000ms"
            v-for="(item, index) of morelist"
            :key="index"
          >
            <div class="fade-in">
              <img v-lazy="item.img" alt />
              <h3>{{ item.title }}</h3>
            </div>
            <div class="fade-out">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </li>
        </ul>
        <div class="now">
          <a-button size="large" type="primary">
            <router-link to="/rank">立即使用</router-link>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { bannerList, selectlist, morelist } from './list'
import Carousel from '@/components/carousel/Carousel'
import ForTop from '@/components/forTop/ForTop'

export default {
  name: 'home',
  data() {
    return {
      bannerList: bannerList,
      selectlist: selectlist,
      morelist: morelist,
      isScroll: false,
      isFlip: true
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
      const offsetTop = this.$refs.select.offsetTop
      if (scrollTop > 500) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
      if (scrollTop > 1500) {
        this.isFlip = true
      } else {
        this.isFlip = false
      }
    }
  },
  components: {
    'hsy-carousel': Carousel,
    'hsy-forTop': ForTop
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/variable.less';
@import '~assets/styles/mixins.less';

.home {
  .banner {
    height: 540px;
    background: url('../../assets/image/banner.png') no-repeat center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    .banner-h2-title {
      font-size: @h2;
      text-align: center;
      color: #ebebeb;
      line-height: 50px;
    }
    .banner-h3-title {
      font-size: @h3;
      text-align: center;
      color: #ebebeb;
      line-height: 40px;
    }
    .banner-img {
      display: flex;
      justify-content: center;
      margin-top: 50px;
      li {
        flex: 0 0 100px;
        text-align: center;
      }
    }
  }

  .for-top {
    .basicWidth();
    padding: 24px 0;
  }

  .select {
    display: flex;
    .basicWidth();
    flex-wrap: wrap;
    justify-content: center;
    .select-list {
      margin: 30px;
      background: #fef9f8;
      width: 45%;
      display: flex;
      padding: 30px;
      .select-list-left {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        img {
          width: 80px;
          height: 80px;
        }
      }
      .select-list-right {
        display: flex;
        flex-direction: column;
        h3 {
          font-size: 22px;
          line-height: 40px;
        }
        p {
          font-size: 16px;
          line-height: 22px;
        }
      }
    }
  }

  .carousel {
    width: 100%;
    margin: 50px 0;
    .carousel-container {
      .basicWidth();
      // width: 1280px;
      // margin: 0 auto;
    }
  }

  .more {
    width: 100%;
    margin: 50px 0;
    .more-container {
      .basicWidth();
      width: 1200px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .now {
        padding: 24px 0 0;
        text-align: center;
      }
      .banner-h2-title {
        font-size: @h2;
        line-height: 100px;
        text-align: center;
      }
      .more-nav {
        display: flex;
        justify-content: space-around;
        .more-item {
          display: flex;
          position: relative;
          min-width: 240px;
          min-height: 300px;
          cursor: pointer;
          .fade-in {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            padding: 30px;
            img {
              display: block;
              margin: 0 auto;
              width: 100px;
              height: 100px;
            }
            h3 {
              text-align: center;
              line-height: 50px;
              font-size: @h3;
            }
          }
          .fade-out {
            display: flex;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            max-width: 240px;
            padding: 60px 30px;
            border-radius: 4px;
            flex-direction: column;
            background: #fff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
            opacity: 0;
            h3 {
              text-align: center;
              line-height: 50px;
              font-size: @h3;
              color: @active;
            }
            p {
              line-height: 26px;
              text-indent: 28px;
            }
          }
          &:hover {
            .fade-out {
              opacity: 1;
              transition: 0.5s;
            }
          }
        }
      }
    }
  }
}
</style>
