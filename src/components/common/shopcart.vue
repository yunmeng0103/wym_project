<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrap">
          <div class="logo" :class="{'highlight':totalCount > 0}">
            <span class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></span>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <!-- 计算属性计算总和 -->
        <div class="price" :class="{'highlight':totalPrice > 0}">{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <!-- 购物列表 -->
    <transition name="toggle-cart">
      <div class="shopcart-list" v-show="showList">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <!-- 控制组件复用 -->
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="screen_cover" v-show="showList" @click="toggleList"></div>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll';
import cartcontrol from './cartcontrol.vue';
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data() {
    return {
      flag: false,
      shopId: null, //商店id值
    }
  },
  mounted() {
  },
  computed: {
    ...mapState([
      'geohash'
    ]),
    // 总价格
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    // 购买数量
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `还差${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    showList() {
      // 实时计算
      if (!this.totalCount) {
        return false
      } else {
        return this.flag
      }
    }
  },
  methods: {
    toggleList() {
      // alert(this.totalCount)
      if (!this.totalCount) {
        this.flag = false;
      } else {
        let show = !this.flag

        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              // alert(this.$refs.listContent)
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        this.flag = show
      }
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      let geohash = this.geohash;
      let shopId = this.shopId;
      this.$router.push({ path: '/confirmOrder', query: { geohash, shopId } })
      // window.alert(`支付${this.totalPrice}元`);
    }
  },
  components: {
    cartcontrol
  }
};

</script>
<style scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
}

.shopcart .content {
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 13;
  background: #141d27;
  font-size: 0;
  width: 100%;
  color: rgba(255, 255, 255, 0.4);
}

.shopcart .content .content-left {
  flex: 1;
}

.shopcart .content .content-left .logo-wrap {
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: -10px;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  box-sizing: border-box;
  border-radius: 50%;
  background: #141d27;
}

.shopcart .content .content-left .logo-wrap .logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  background: #2b343c;
}

.shopcart .content .content-left .logo-wrap .logo.highlight {
  background: rgb(0, 160, 220);
}

.shopcart .content .content-left .logo-wrap .logo .icon-shopping_cart {

  line-height: 44px;
  font-size: 24px;
  color: #80858a;
}

.shopcart .content .content-left .logo-wrap .logo .icon-shopping_cart.highlight {
  color: #fff;
}

.shopcart .content .content-left .logo-wrap .num {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 16px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: rgb(240, 20, 20);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}

.shopcart .content .content-left .price {
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  line-height: 24px;
  padding-right: 12px;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 16px;
  font-weight: 700;
}

.shopcart .content .content-left .price.highlight {
  color: #fff;
}

.shopcart .content .content-left .desc {
  display: inline-block;
  vertical-align: top;
  margin: 12px 0 0 12px;
  line-height: 24px;
  font-size: 10px;
}

.shopcart .content .content-right {
  flex: 0 0 105px;
  width: 105px;
}

.shopcart .content .content-right .pay {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
}

.shopcart .content .content-right .pay.not-enough {
  background: #2b333b;
}

.shopcart .content .content-right .pay.enough {
  background: #00b43c;
  color: #fff;
}

.shopcart .shopcart-list {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 12;
  width: 100%;
  padding-bottom: 48px;
  box-shadow: 0 -2px 5px rgba(7, 17, 27, 0.3);
}

.shopcart .shopcart-list .list-header {
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.shopcart .shopcart-list .list-header .title {
  float: left;
  font-size: 14px;
  color: rgb(7, 17, 27);
}

.shopcart .shopcart-list .list-header .empty {
  float: right;
  font-size: 12px;
  color: rgb(0, 160, 220);
}

.shopcart .shopcart-list .list-content {
  padding: 0 18px;
  max-height: 217px;
  overflow: auto;
  background: #fff;
}

.shopcart .shopcart-list .list-content .food {
  position: relative;
  padding: 12px 0;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.shopcart .shopcart-list .list-content .food .name {
  line-height: 24px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}

.shopcart .shopcart-list .list-content .food .price {
  position: absolute;
  right: 90px;
  bottom: 12px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(240, 20, 20);
}

.shopcart .shopcart-list .list-content .food .cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 6px;
}


.screen_cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .3);
  z-index: 11;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.toggle-cart-enter-active,
.toggle-cart-leave-active {
  transition: all .3s ease-out;
}

.toggle-cart-enter,
.toggle-cart-leave-active {
  transform: translateY(100%);
}

</style>
