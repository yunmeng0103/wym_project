import Vue from 'vue'
import Router from 'vue-router'
const city = r => require.ensure([], () => r(require('../pages/city/city.vue')), 'city')
const address = r => require.ensure([], () => r(require('../pages/address/address.vue')), 'address')
const home = r => require.ensure([], () => r(require('../pages/home/home.vue')), 'home')
const shopDetail = r => require.ensure([], () => r(require('../pages/shopDetail/shopDetail.vue')), 'shopDetail')
const goods = r => require.ensure([], () => r(require('../pages/shopDetail/children/goods.vue')), 'goods')
const ratings = r => require.ensure([], () => r(require('../pages/shopDetail/children/ratings.vue')), 'ratings')
const order = r => require.ensure([], () => r(require('../pages/order/order.vue')), 'order')
const mine = r => require.ensure([], () => r(require('../pages/mine/mine.vue')), 'mine')
const login = r => require.ensure([], () => r(require('../pages/login/login.vue')), 'login')

Vue.use(Router)

export default new Router({
  routes: [{
      path: '',
      redirect: '/home'
    },
    //当前选择城市页
    {
      path: '/city',
      component: city
    },
    //选择详细地址
    {
      path: '/address/:cityid',
      component: address
    },
    //主页
    {
      path: '/home',
      component: home
    },
    //详情
    {
      path: '/shopDetail',
      component: shopDetail,
      children: [{
        path: '/', //默认商品列表
        component: goods,
      }, {
        path: 'goods', //商品列表
        component: goods,
      }, {
        path: 'ratings', //商品评价
        component: ratings,
      }, ]
    },
    //订单
    {
      path: '/order',
      component: order
    },
    //我的
    {
      path: '/mine',
      component: mine
    },
    //登录
    {
      path: '/login',
      component: login
    },

  ]
})
