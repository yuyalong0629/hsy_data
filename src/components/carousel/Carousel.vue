<template>
  <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide v-for="(item, index) of list" :key="index">
      <div class="inner">
        <div class="gallery-item-desc">
          <h3 class="typography-label">{{ item.title }}</h3>
          <p class="typography-body">{{ item.text }}</p>
        </div>
        <figure class="gallery-item-img">
          <img :src="item.img" />
        </figure>
      </div>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import carousel from './index.js'

export default {
  name: 'carrousel',
  data() {
    return {
      list: carousel,
      swiperOption: {
        loop: true,
        speed: 500,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: true,
          disableOnInteraction: true
        },
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 10,
          modifier: 10,
          slideShadows: false
        },
        effect: 'coverflow',
        slidesPerView: 2,
        on: {
          init: function() {
            this.slides.removeClass('init')
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style lang="less" scope>
.inner {
  height: 640px;
  border: 1px solid #e8e8e8;
  border-radius: 2px 2px 0 0;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  .gallery-item-desc {
    flex: 0 0 100px;
    padding: 24px;
    .typography-label {
      font-size: 24px;
      text-align: center;
      line-height: 40px;
      margin-bottom: 12px;
    }
    .typography-body {
      line-height: 24px;
      text-align: center;
    }
  }
  .gallery-item-img {
    flex: 1;
    img {
      width: 100%;
      height: 96%;
    }
  }
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    border-color: rgba(0, 0, 0, 0.09);
  }
}

.swiper-container-3d .swiper-slide-shadow-left {
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
}
.swiper-container-3d .swiper-slide-shadow-right {
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0)
  );
}
</style>
