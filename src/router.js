import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'
import Exception from '@/components/layout/Exception.vue'
import Layout from '@/components/layout/BasicLayout.vue'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // basic
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        // 首页
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/home/Home.vue')
        },
        // 排行榜
        {
          path: '/rank',
          name: 'rank',
          component: () => import('./views/rank/Rank.vue')
        },
        // 详情
        {
          path: '/details',
          name: 'details',
          component: () => import('./views/details/Details.vue')
        },
        // 相似号
        {
          path: '/similar',
          name: 'similar',
          component: () => import('./views/similar/Similar.vue')
        },
        // 投前分析
        {
          path: '/analysis',
          name: 'analysis',
          component: () => import('./views/analysis/Analysis.vue')
        },
        // 账号监控
        {
          path: '/monitor',
          name: 'monitor',
          meta: { hidden: true },
          component: () => import('./views/monitor/Monitor.vue')
        },
        // 搜索
        {
          path: '/search',
          name: 'search',
          meta: { hidden: true },
          component: () => import('./views/search/Search.vue')
        },
        // 内容查询
        {
          path: '/contentquery',
          name: 'contentquery',
          meta: { hidden: true },
          component: () => import('./views/contentQuery/ContentQuery.vue')
        },
        // 关于我们
        {
          path: '/mine',
          component: () => import('./views/mine/Mine.vue'),
          children: [
            {
              path: '/',
              redirect: '/mine/list'
            },
            {
              path: '/mine/list',
              component: () => import('./components/classroom/List.vue')
            },
            {
              path: '/mine/detail',
              component: () => import('./components/classroom/Detail.vue')
            }
          ]
        },
        // 会员中心
        {
          path: '/members',
          name: 'members',
          component: () => import('./views/members/Members.vue')
        },
        // 我的收藏
        {
          path: '/myCollection',
          name: 'myCollection',
          component: () => import('./views/myCollection/MyCollection.vue')
        },
        // 升级会员
        {
          path: '/buyMembers',
          name: 'buyMembers',
          component: () => import('./views/buyMembers/BuyMembers.vue')
        },
        // 购买会员
        {
          path: '/pay',
          name: 'pay',
          component: () => import('./views/buyMembers/Pay.vue')
        },
        // 支付协议
        {
          path: '/agreement',
          name: 'agreement',
          component: () => import('./views/agreement/Agreement.vue')
        }
      ]
    },
    // Exception
    {
      path: '/exception',
      redirect: '/404',
      component: Exception,
      children: [
        {
          path: '/403',
          name: 'exception403',
          component: () => import('./views/exception/403.vue')
        },
        {
          path: '/404',
          name: 'exception404',
          component: () => import('./views/exception/404.vue')
        },
        {
          path: '/500',
          name: 'exception500',
          component: () => import('./views/exception/500.vue')
        }
      ]
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import('./views/buyMembers/Apply')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.hidden) {
    if (store.getters.hasLogin) {
      next()
      NProgress.done()
      return
    }
    // message.warning('权限不足,需要登录账号才能查看', 1)
    // 未登录状态显示登录 Modal
    store.commit('loginModal', true)
    next({ path: from.fullPath, query: { redirect: to.fullPath } })
    NProgress.done()
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
