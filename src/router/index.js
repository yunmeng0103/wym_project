import Vue from 'vue'
import Router from 'vue-router'
const city = r => require.ensure([], () => r(require('../pages/city/city.vue')), 'city')
const address = r => require.ensure([], () => r(require('../pages/address/address.vue')), 'address')
const home = r => require.ensure([], () => r(require('../pages/home/home.vue')), 'home')
const food = r => require.ensure([], () => r(require('../pages/food/food.vue')), 'food')
const shopDetail = r => require.ensure([], () => r(require('../pages/shopDetail/shopDetail.vue')), 'shopDetail')
const goods = r => require.ensure([], () => r(require('../pages/shopDetail/children/goods.vue')), 'goods')
const ratings = r => require.ensure([], () => r(require('../pages/shopDetail/children/ratings.vue')), 'ratings')
const confirmOrder = r => require.ensure([], () => r(require('../pages/confirmOrder/confirmOrder.vue')), 'confirmOrder')
const chooseAddress = r => require.ensure([], () => r(require('../pages/confirmOrder/children/chooseAddress.vue')), 'chooseAddress')
const addAddress = r => require.ensure([], () => r(require('../pages/confirmOrder/children/children/addAddress.vue')), 'addAddress')
const searchAddress = r => require.ensure([], () => r(require('../pages/confirmOrder/children/children/children/searchAddress.vue')), 'searchAddress')
const order = r => require.ensure([], () => r(require('../pages/order/order.vue')), 'order')
const mine = r => require.ensure([], () => r(require('../pages/mine/mine.vue')), 'mine')
const balance = r => require.ensure([], () => r(require('../pages/mine/children/balance.vue')), 'balance')
const benefit = r => require.ensure([], () => r(require('../pages/mine/children/benefit.vue')), 'benefit')
const points = r => require.ensure([], () => r(require('../pages/mine/children/points.vue')), 'points')
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
    //主页头部详情
    {
      path: '/food',
      component: food
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
    //确认订单
    {
      path: '/confirmOrder',
      component: confirmOrder,
      children: [{
        path: 'chooseAddress', //选择地址
        component: chooseAddress,
        children: [{
          path: 'addAddress', //添加地址
          component: addAddress,
          children: [{
            path: 'searchAddress', //搜索地址
            component: searchAddress,
          }]
        }, ]
      }]
    },
    //订单
    {
      path: '/order',
      component: order
    },
    //我的
    {
      path: '/mine',
      component: mine,
      children: [{
        path: 'balance', //余额
        component: balance,
      }, {
        path: 'benefit', //优惠
        component: benefit,
      }, {
        path: 'points', //积分
        component: points,
      }]
    },
    //登录
    {
      path: '/login',
      component: login
    },

  ]
})
