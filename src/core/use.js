import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// copy
import VueClipboard from 'vue-clipboard2'

// lazyload
import VueLazyload from 'vue-lazyload'

// swiper styles
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import animate from 'animate.css'

import VueParticles from 'vue-particles'

Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
Vue.use(VueLazyload)
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(animate)
Vue.use(VueParticles)
