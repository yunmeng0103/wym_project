import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  geohash: '',
  userInfo: null, //用户信息
  login: true,//是否登录
}


export default new Vuex.Store({
  state,
  mutations
})
