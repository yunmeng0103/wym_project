<template>
  <div class="home">
    <v-headTop signin-up='msite'>
      <router-link to="/city" slot="msite-title" class="msite_title">
        <svg class="msite_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
        </svg>
        <span class="title_text ellipsis">{{msietTitle}}</span>
      </router-link>
    </v-headTop>
    <div class="home-scroll" ref="homeScroll">
      <div class="search_box">
        <router-link :to="'/search/' + geohash" class="search_area">
          <svg class="link_search" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <circle cx="8" cy="8" r="6" stroke="#666" stroke-width="1" fill="none" />
            <line x1="12" y1="12" x2="18" y2="18" style="stroke:#666;stroke-width:2" />
          </svg>
          <span>搜索</span>
        </router-link>
      </div>
      <nav class="msite_nav">
        <div class="swiper-container" v-if="foodTypes.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
              <router-link :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
                <figure>
                  <img :src="imgBaseUrl + foodItem.image_url">
                  <figcaption>{{foodItem.title}}</figcaption>
                </figure>
              </router-link>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
      </nav>
      <div class="shop_list_container">
        <header class="shop_header">
          <svg class="shop_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
          </svg>
          <span class="shop_header_title">附近商家</span>
        </header>
        <v-shopList v-if="hasGetData" :geohash="geohash"></v-shopList>
      </div>
      <v-footGuide></v-footGuide>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import headTop from '../../../src/components/header/head.vue'
import footGuide from '../../../src/components/footer/footGuide.vue'
import shopList from '../../../src/components/common/shoplist.vue'
import { msiteAddress, msiteFoodTypes, cityGuess } from '../../../src/service/getData'
import Swiper from '../../../static/lib/swiper.min.js'
import '../../../static/lib/swiper.min.css';

export default {
  data() {
    return {
      geohash: '', //页面传递过来的地址geohash
      msietTitle: '请选择地址...', // msiet页面头部标题
      foodTypes: [], // 食品分类列表
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: 'https://fuss10.elemecdn.com',
    }
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      const address = await cityGuess();
      this.geohash = address.latitude + ',' + address.longitude;
    } else {
      this.geohash = this.$route.query.geohash
    }
    //保存geohash 到vuex
    this.SAVE_GEOHASH(this.geohash);
    // //获取位置信息
    let res = await msiteAddress(this.geohash);
    this.msietTitle = res.name;
    // // 记录当前经度纬度
    this.RECORD_ADDRESS(res);
    this.hasGetData = true;
  },
  mounted() {
    //获取导航食品类型列表
    msiteFoodTypes(this.geohash).then(res => {
      let resLength = res.length;
      let resArr = [...res]; // 返回一个新的数组
      let foodArr = [];
      //8个为一组
      for (let i = 0, j = 0; i < resLength; i += 8, j++) {
        foodArr[j] = resArr.splice(0, 8);
      }
      this.foodTypes = foodArr;
    }).then(() => {
      //初始化swiper
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        loop: false,
        slidesPerView: 1,
        // autoplay: 2500,
        paginationClickable: true,
      });
    });
  },
  components: {
    'v-headTop': headTop,
    'v-footGuide': footGuide,
    'v-shopList': shopList,
  },
  computed: {},
  methods: {
    ...mapMutations([
      'RECORD_ADDRESS', 'SAVE_GEOHASH'
    ]),
    
    //点击图标刷新页面
    reload() {
      window.location.reload();
    },
    //解码url地址，求去restaurant_category_id值
    getCategoryId(url) {
      let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id
      } else {
        return ''
      }
    }
  },
}

</script>
<style scoped>
.home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
}

.msite_title {
  position: absolute;
  top: 50%;
  left: .8rem;
  transform: translateY(-50%);
  width: 7.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  font-size: .72rem;
}

.msite_title .msite_icon {
  fill: #fff;
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
}

.search_box {
  height: 1.8rem;
  background-color: #3190e8;
  padding: 2.0rem .8rem 0;
}

.search_area {
  position: relative;
  display: block;
  width: 100%;
  height: 1.28rem;
  margin: 0 auto;
  background-color: #fff;
  color: #666;
  border-radius: 1.0rem;
  font-size: .6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.link_search {
  width: .9rem;
  height: .9rem;
  margin-right: .1rem;
}

.msite_nav {
  background-color: #fff;
  border-bottom: 0.025rem solid #e4e4e4;
}

.msite_nav .swiper-container {
  width: 100%;
  height: auto;
  padding-bottom: 0.8rem;
  box-sizing: border-box;
}

.msite_nav .swiper-container .swiper-pagination {
  bottom: 0.2rem;
  box-sizing: border-box;
}

.msite_nav .fl_back {
  width: 100%;
  height: 100%;
}

.food_types_container {
  display: flex;
  flex-wrap: wrap;
}

.food_types_container .link_to_food {
  width: 25%;
  padding: 0.3rem 0rem;
  display: flex;
  justify-content: center;
}

.food_types_container .link_to_food figure img {
  margin-bottom: 0.3rem;
  width: 1.8rem;
  height: 1.8rem;
}

.food_types_container .link_to_food figure figcaption {
  text-align: center;
  font-size: 0.55rem;
  color: #666;
}

.shop_list_container {
  margin-top: .4rem;
  border-top: 0.025rem solid #e4e4e4;
  background-color: #fff;
}


.shop_list_container .shop_header .shop_icon {
  fill: #999;
  margin-left: 0.6rem;
  vertical-align: middle;
  width: .6rem;
  height: .6rem;
}

.shop_list_container .shop_header .shop_header_title {
  color: #999;
  font: 0.55rem/1.6rem 'Microsoft YaHei';
}

.loading-enter-active,
.loading-leave-active {
  transition: opacity 1s
}

.loading-enter,
.loading-leave-active {
  opacity: 0
}

</style>
