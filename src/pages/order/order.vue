<template>
  <div class="order">
    <v-headTop head-title="订单列表" go-back='true'></v-headTop>
    <ul class="order_list_ul" v-load-more="loaderMore">
      <li class="order_list_li" v-for="item in orderList" :key="item.id">
        <img :src="imgBaseUrl + item.restaurant_image_url" class="restaurant_image">
        <div class="order_item_right">
          <div @click="showDetail(item)">
            <header class="order_item_right_header">
              <div class="order_header">
                <h4>
                    <span class="ellipsis">{{item.restaurant_name}}</span>
                    <svg fill="#333" class="arrow_right">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </h4>
                <p class="order_time">{{item.formatted_created_at}}</p>
              </div>
              <p class="order_status">
                {{item.status_bar.title}}
              </p>
            </header>
            <div class="order_basket">
              <p class="order_name ellipsis">{{item.basket.group[0][0].name}}{{item.basket.group[0].length > 1 ? ' 等' + item.basket.group[0].length + '件商品' : ''}}</p>
              <p class="order_amount">¥{{item.total_amount.toFixed(2)}}</p>
            </div>
          </div>
          <div class="order_again">
            <compute-time v-if="item.status_bar.title == '等待支付'" :time="item.time_pass"></compute-time>
            <router-link :to="{path: '/shop', query: {geohash, id: item.restaurant_id}}" tag="span" class="buy_again" v-else>再来一单</router-link>
          </div>
        </div>
      </li>
    </ul>
    <v-footGuide></v-footGuide>
    <transition name="loading">
      <v-loading v-show="showLoading"></v-loading>
    </transition>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import adata from '../../../order-list.json'

import { mapState, mapMutations } from 'vuex'
import headTop from '../../components/header/head.vue'
// import computeTime from 'src/components/common/computeTime'
import loading from '../../components/common/loading.vue'
import footGuide from '../../components/footer/footGuide.vue'
import { getOrderList } from '../../service/getData.js'
import { loadMore } from '../../components/common/mixin.js'
import { getImgPath } from '../../components/common/mixin.js'
import { imgBaseUrl } from '../../config/env.js'


export default {
  data() {
    return {
      orderList: adata, //订单列表
      offset: 0,
      preventRepeat: false, //防止重复获取
      showLoading: true, //显示加载动画
      imgBaseUrl
    }
  },
  mounted() {
    this.initData();
  },
  mixins: [loadMore],
  components: {
    'v-headTop': headTop,
    'v-footGuide': footGuide,
    'v-loading': loading,
    // computeTime,
  },
  computed: {
    ...mapState([
      // 'userInfo', 'geohash'
      'geohash'
    ]),
  },
  methods: {
    ...mapMutations([
      // 'SAVE_ORDER'
    ]),
    //初始化获取信息
    async initData() {
      if (this.userInfo && this.userInfo.user_id) {
        // let res = await getOrderList(this.userInfo.user_id, this.offset);
        // this.orderList = [...res];
        this.hideLoading();
      } else {
        this.hideLoading();
      }
    },
    //加载更多
    async loaderMore() {
      if (this.preventRepeat) {
        return
      }
      this.preventRepeat = true;
      this.showLoading = true;
      this.offset += 10;
      //获取信息
      // let res = await getOrderList(this.userInfo.user_id, this.offset);
      // this.orderList = [...this.orderList, ...res];
      this.hideLoading();
      if (res.length < 10) {
        return
      }
      this.preventRepeat = false;
    },
    //显示详情页
    showDetail(item) {
      // this.SAVE_ORDER(item);
      this.preventRepeat = false;
      // this.$router.push('/order/orderDetail');
    },
    //生产环境与发布环境隐藏loading方式不同
    hideLoading() {
      this.showLoading = false;
    },
  },
  watch: {
    // userInfo: function(value) {
    //   if (value && value.user_id && !this.orderList) {
    //     this.initData();
    //   }
    // }
  }
}

</script>
<style scoped>
.order {
  background-color: #f1f1f1;
  padding-bottom: .5rem;
}

.order p,
.order span,
.order h4 {
  font-family: Helvetica Neue, Tahoma, Arial;
}

.order_list_ul {
  padding-top: 2.0rem;
}

.order_list_ul .order_list_li {
  background-color: #fff;
  display: flex;
  margin-bottom: 0.5rem;
  padding: .6rem .6rem 0;
}

.order_list_ul .order_list_li:last-child {
  margin-bottom: 2.0rem;
}

.order_list_ul .order_list_li .restaurant_image {
  width: 2rem;
  height: 2rem;
  margin-right: 0.4rem;
}

.order_list_ul .order_list_li .order_item_right {
  flex: 1;
}

.order_list_ul .order_list_li .order_item_right .order_item_right_header {
  border-bottom: 0.025rem solid #f5f5f5;
  padding-bottom: .3rem;
  display: flex;
  justify-content: space-between;
}


.order_list_ul .order_list_li .order_item_right .order_item_right_header .order_header h4 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: .6rem;
  color: #333;
  line-height: 1rem;
  width: 5rem;
}

.order_list_ul .order_list_li .order_item_right .order_item_right_header .order_header h4 .arrow_right {
  width: .4rem;
  height: .4rem;
  fill: #ccc;
  margin-right: .2rem;
}

.order_list_ul .order_list_li .order_item_right .order_item_right_header .order_header .order_time {
  font-size: .55rem;
  color: #999;
  line-height: .8rem;
}

.order_list_ul .order_list_li .order_item_right .order_item_right_header .order_status {
  font-size: .6rem;
  color: #333;
}

.order_list_ul .order_list_li .order_item_right .order_basket {
  display: flex;
  justify-content: space-between;
  line-height: 2rem;
  border-bottom: 0.025rem solid #f5f5f5;
}

.order_list_ul .order_list_li .order_item_right .order_basket .order_name {
  font-size: .6rem;
  color: #666;
}

.order_list_ul .order_list_li .order_item_right .order_basket .order_amount {
  font-size: .6rem;
  color: #f60;
  font-weight: bold;
}

.order_list_ul .order_list_li .order_item_right .order_again {
  text-align: right;
  line-height: 1.6rem;
}

.order_list_ul .order_list_li .order_item_right .order_again .buy_again {
  font-size: .55rem;
  color: #3190e8;
  border: 0.025rem solid #3190e8;
  padding: .1rem .2rem;
  border-radius: .15rem;
}


.loading-enter-active,
.loading-leave-active {
  transition: opacity .7s
}

.loading-enter,
.loading-leave-active {
  opacity: 0
}

.router-slid-enter-active,
.router-slid-leave-active {
  transition: all .4s;
}

.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}

</style>
