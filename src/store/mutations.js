//记录当前位置
const record_address = (state, {
  latitude,
  longitude
}) => {
  state.latitude = latitude;
  state.longitude = longitude;
}

//保存geohash
const save_geohash = (state, geohash) => {
  state.geohash = geohash;
}
export default {
  record_address,
  save_geohash
}
