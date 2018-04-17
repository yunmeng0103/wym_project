<template>
  <div class="cartcontrol">
    <transition name="showReduce">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop="decreaseCart"></div>
    </transition>
    <transition name="fade">
      <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    </transition>
    <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      // 如果不是BScroll派发的点击事件就返回掉
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};

</script>
<style scoped>
.cartcontrol {
  font-size: 0
}

.cartcontrol .cart-decrease {
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0, 160, 220);
}

.cartcontrol .cart-count {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  padding-top: 6px;
  line-height: 24px;
  text-align: center;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.cartcontrol .cart-add {
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0, 160, 220);
}

/*fade-enter-active：进入过渡的结束状态，元素被插入时就生效，在过渡过程完成之后移除；*/
/*fade-leave-active：离开过渡的结束状态，元素被删除时生效，离开过渡完成之后被删除；*/
.fade-enter-active,
.fade-leave-active {
  transition: all .3s;
}
/*fade-enter：进入过渡的开始状态，元素被插入时生效，只应用一帧后立即删除；*/
/*fade-leave：离开过渡的开始状态，元素被删除时触发，只应用一帧后立即删除；*/
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.showReduce-enter-active,
.showReduce-leave-active {
  transition: all .3s ease-out;
}

.showReduce-enter,
.showReduce-leave-active {
  opacity: 0;
  transform: translateX(1rem);
}

</style>
