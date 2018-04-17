<template>
  <div class="confirmOrderContainer">
    <section v-if="!showLoading">
      <head-top head-title="确认订单" goBack="true"></head-top>
      <router-link :to='{path: "/confirmOrder/chooseAddress", query: {id: "", sig: ""}}' class="address_container">
        <div class="address_empty_left">
          <svg class="location_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
          </svg>
          <div class="add_address" v-if="!choosedAddress">请添加一个收货地址</div>
          <div v-else class="address_detail_container">
            <header>
              <span>{{choosedAddress.name}}</span>
              <span>{{choosedAddress.sex == 1? '先生':'女士'}}</span>
              <span>{{choosedAddress.phone}}</span>
            </header>
            <div class="address_detail">
              <p>{{choosedAddress.address_detail}}</p>
            </div>
          </div>
        </div>
        <svg class="address_empty_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
      <section class="delivery_model container_style">
        <p class="deliver_text">送达时间</p>
        <section class="deliver_time">
          <p>尽快送达 | 预计 </p>
          <p>蜂鸟专送</p>
        </section>
      </section>
      <section class="pay_way container_style">
        <header class="header_style">
          <span>支付方式</span>
          <div class="more_type" @click="showPayWayFun">
            <span>在线支付</span>
            <svg class="address_empty_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </header>
        <section class="hongbo">
          <span>红包</span>
          <span>暂时只在饿了么 APP 中支持</span>
        </section>
      </section>
      <section class="food_list">
        <header>
          <img :src="imgBaseUrl">
          <span></span>
        </header>
        <ul class="food_list_ul">
          <li class="food_item_style">
            <p class="food_name ellipsis"></p>
            <div class="num_price">
              <span>x </span>
              <span>¥</span>
            </div>
          </li>
        </ul>
        <div class="food_item_style">
          <p class="food_name ellipsis"></p>
          <div class="num_price">
            <span></span>
            <span>¥ </span>
          </div>
        </div>
        <div class="food_item_style">
          <p class="food_name ellipsis">配送费</p>
          <div class="num_price">
            <span></span>
            <span>¥ </span>
          </div>
        </div>
        <div class="food_item_style total_price">
          <p class="food_name ellipsis">订单 ¥</p>
          <div class="num_price">
            <span>待支付 ¥</span>
          </div>
        </div>
      </section>
      <section class="pay_way container_style">
        <router-link :to='{path: "/confirmOrder", query: {id: "", sig: ""}}' class="header_style">
          <span>订单备注</span>
          <div class="more_type">
            <span class="ellipsis">口味、偏好等</span>
            <svg class="address_empty_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </router-link>
      </section>
      <section class="confrim_order">
        <p>待支付 ¥</p>
        <p @click="confirmOrder">确认下单</p>
      </section>
      <transition name="fade">
        <div class="cover" v-if="showPayWay" @click="showPayWayFun"></div>
      </transition>
      <transition name="slid_up">
        <div class="choose_type_Container" v-if="showPayWay">
          <header>支付方式</header>
          <ul>
            <li class="choose">
              <span>在线支付<span>（商家仅支持在线支付）</span></span>
              <svg class="address_empty_right">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
              </svg>
            </li>
          </ul>
        </div>
      </transition>
    </section>
    <loading v-if="showLoading"></loading>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <transition name="move" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import headTop from '../../components/header/head.vue'
import alertTip from '../../components/common/alertTip'
import loading from '../../components/common/loading'
import { checkout, getAddress, placeOrders, getAddressList } from '../../service/getData.js'
import { imgBaseUrl } from '../../config/env.js'

export default {
  data() {
    return {
      geohash: '', //geohash位置信息
      shopId: null, //商店id值
      showLoading: true, //显示加载动画
      checkoutData: null, //数据返回值
      shopCart: null, //购物车数据
      imgBaseUrl, //图片域名
      showPayWay: false, //显示付款方式
      payWayId: 1, //付款方式
      showAlert: false, //弹出框
      alertText: null, //弹出框内容
    }
  },
  created() {
    //获取上个页面传递过来的geohash值
    this.geohash = this.$route.query.geohash;
    //获取上个页面传递过来的shopid值
    this.shopId = this.$route.query.shopId;
  },
  mounted() {
    if (this.geohash) {
      this.initData();
      // this.SAVE_GEOHASH(this.geohash);
    }
    if (!(this.userInfo && this.userInfo.user_id)) {
      // this.showAlert = true;
      // this.alertText = '您还没有登录';
    }
  },
  components: {
    headTop,
    alertTip,
    loading,
  },
  computed: {
    ...mapState([
      'userInfo', 'choosedAddress'
    ]),
  },
  methods: {
    //初始化数据
    async initData() {
      let newArr = new Array;
      // this.checkoutData = await checkout(this.geohash, [newArr], this.shopId);
      this.showLoading = false;
    },
    //显示付款方式
    showPayWayFun() {
      this.showPayWay = !this.showPayWay;
    },
    //确认订单
    async confirmOrder() {
      //用户未登录时弹出提示框
      if (!(this.userInfo && this.userInfo.user_id)) {
        this.showAlert = true;
        this.alertText = '请登录';
        return
        //未选择地址则提示
      } else if (!this.choosedAddress) {
        this.showAlert = true;
        this.alertText = '请添加一个收货地址';
        return
      }
      //保存订单
      this.SAVE_ORDER_PARAM({
        user_id: this.userInfo.user_id,
        cart_id: this.checkoutData.cart.id,
        address_id: this.choosedAddress.id,
        description: this.remarklist,
        entities: this.checkoutData.cart.groups,
        geohash: this.geohash,
        sig: this.checkoutData.sig,
      });
      //发送订单信息
      let orderRes = await placeOrders(this.userInfo.user_id, this.checkoutData.cart.id, this.choosedAddress.id, this.remarklist, this.checkoutData.cart.groups, this.geohash, this.checkoutData.sig);
      //第一次下单的手机号需要进行验证，否则直接下单成功
      if (orderRes.need_validation) {
        this.NEED_VALIDATION(orderRes);
        this.$router.push('/confirmOrder/userValidation');
      } else {
        this.ORDER_SUCCESS(orderRes);
        this.$router.push('/confirmOrder/payment');
      }
    },
  },
  watch: {}
}

</script>
<style lang="scss" scoped>
.confirmOrderContainer {
  padding-top: 2.0rem;
  padding-bottom: 3rem;
  background-color: #F5F5F5;
}

.confirmOrderContainer p {
  font-family: Helvetica Neue, Tahoma, Arial;
}

.confirmOrderContainer span {
  font-family: Helvetica Neue, Tahoma, Arial;
}

.container_style {
  background-color: #fff;
  margin-top: .4rem;
  padding: 0 .7rem;
}

.address_container {
  min-height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.6rem;
  background: url(../../images/address_bottom.png) left bottom repeat-x;
  background-color: #fff;
  background-size: auto .12rem;
  .address_empty_left {
    display: flex;
    align-items: center;
    .location_icon {
      width: .8rem;
      height: .8rem;
      fill: #3190e8;
      margin-right: .2rem;
    }
    .add_address {
      font-size: .7rem;
      color: #333;
    }
    .address_detail_container {
      margin-left: .2rem;
      header {
        font-size: .65rem;
        color: #333;
        span:nth-of-type(1) {
          font-size: .8rem;
          font-weight: bold;
        }
      }
      .address_detail {
        width: 100%;
        display: flex;
        align-items: center;
        span {
          font-size: .5rem;
          color: #fff;
          border-radius: .15rem;
          background-color: #ff5722;
          height: .6rem;
          line-height: .6rem;
          padding: 0 .2rem;
          margin-right: .3rem;
        }
        p {
          font-size: .55rem;
          color: #777;
        }
      }
    }
  }
}

.address_empty_right {
  width: .6rem;
  height: .6rem;
  fill: #999;
}

.delivery_model {
  border-left: .2rem solid #3190e8;
  min-height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .deliver_text {
    font-size: .8rem;
    color: #333;
    font-weight: bold;
    padding-left: .3rem;
  }
  .deliver_time {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: .7rem;
    color: #3190e8;
  }
  p:nth-of-type(2) {
    font-size: .5rem;
    color: #fff;
    background-color: #3190e8;
    width: 2.4rem;
    margin-top: .5rem;
    text-align: center;
    border-radius: 0.12rem;
    padding: .1rem;
  }
}

.pay_way {
  .header_style {
    display: flex;
    justify-content: space-between;
    line-height: 2rem;
    span:nth-of-type(1) {
      font-size: .7rem;
      color: #666;
    }
    .more_type {
      span:nth-of-type(1) {
        font-size: .6rem;
        color: #aaa;
        width: 10rem;
        display: inline-block;
        text-align: right;
        vertical-align: middle;
      }
      svg {
        width: .5rem;
        height: .5rem;
        fill: #ccc;
      }
    }
  }

  .hongbo {
    display: flex;
    justify-content: space-between;
    border-top: 0.025rem solid #f5f5f5;
    span {
      font-size: .6rem;
      color: #aaa;
      line-height: 2rem;
      svg {
        width: .5rem;
        height: .5rem;
        vertical-align: middle;
        fill: #ccc;
      }
    }
    span:nth-of-type(2) {
      color: #aaa;
    }
  }

  .support_is_available {
    span {
      color: #666;
    }
  }
}

.food_list {
  background-color: #fff;
  margin-top: .4rem;
  header {
    padding: .7rem;
    border-bottom: 0.025rem solid #f5f5f5;
    img {
      width: 1.2rem;
      height: 1.2rem;
      vertical-align: middle;
    }
    span {
      font-size: .8rem;
      color: #333;
    }
  }

  .food_list_ul {
    padding-top: .5rem;
  }

  .food_item_style {
    display: flex;
    justify-content: space-between;
    line-height: 1.8rem;
    padding: 0 .7rem;
    span,
    p {
      font-size: .65rem;
      color: #666;
    }
    .food_name {
      width: 11rem;
    }
    .num_price {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span:nth-of-type(1) {
        color: #f60;
      }
    }
  }

  .total_price {
    border-top: 0.025rem solid #f5f5f5;
  }
}

.confrim_order {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2rem;
  p {
    line-height: 2rem;
    font-size: .75rem;
    color: #fff;
  }

  p:nth-of-type(1) {
    background-color: #3c3c3c;
    flex: 5;
    padding-left: .7rem;
  }

  p:nth-of-type(2) {
    flex: 2;
    background-color: #56d176;
    text-align: center;
  }
}

.cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .3);
  z-index: 203;
}

.choose_type_Container {
  min-height: 10rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 204;
  header {
    background-color: #fafafa;
    font-size: .7rem;
    color: #333;
    text-align: center;
    line-height: 2rem;
  }

  ul {
    li {
      display: flex;
      justify-content: space-between;
      padding: 0 .7rem;
      line-height: 2.5rem;
      align-items: center;
      span {
        font-size: .7rem;
        color: #ccc;
      }
      svg {
        width: .8rem;
        height: .8rem;
        fill: #eee;
      }
    }
    .choose {
      span {
        color: #333;
      }
      svg {
        fill: #4cd964;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.slid_up-enter-active,
.slid_up-leave-active {
  transition: all .3s;
}

.slid_up-enter,
.slid_up-leave-active {
  transform: translate3d(0, 10rem, 0)
}

.move-enter-active,
.move-leave-active {
  transition: all .2s linear;
  transform: translate3d(0, 0, 0);
}

.move-enter,
.move-leave-active {
  transform: translate3d(100%, 0, 0);
}

</style>
