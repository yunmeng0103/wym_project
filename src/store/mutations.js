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
  },
  ['OUT_LOGIN'](state) {
    state.userInfo = {};
    state.login = false;
  },
  //选择的地址（chooseAddress页）
  ['CHOOSE_ADDRESS'](state, {
    address,
    index
  }) {
    state.choosedAddress = address;
    state.addressIndex = index;
  },
  //保存选择搜索的地址（搜索地址页）
  ['CHOOSE_SEARCH_ADDRESS'](state, place) {
    state.searchAddress = place;
  },
  //确认订单页添加新的的地址
  ['CONFIRM_ADDRESS'](state, newAddress) {
    state.newAddress.push(newAddress);
  },
}
