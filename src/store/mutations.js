import { setStore, getStore } from '../config/mUtils'

export default {
  //记录当前位置
  ['RECORD_ADDRESS'](state, {
    latitude,
    longitude
  }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  //保存geohash
  ['SAVE_GEOHASH'](state, geohash) {
    state.geohash = geohash;
  },
  // 记录用户信息
  ['RECORD_USERINFO'](state, info) {
    state.userInfo = info;
    state.login = true;
    //永久储存localStorage
    setStore('user_id', info.user_id);
  }
}
