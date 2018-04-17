import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  geohash: '',
  userInfo: null, //用户信息
  login: true, //是否登录
  newAddress: [], //确认订单页新的地址
  searchAddress: null, //搜索并选择的地址
  choosedAddress: null, //选择地址
  addressIndex: null, //选择地址的索引值
}


export default new Vuex.Store({
  state,
  mutations
})
