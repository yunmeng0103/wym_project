<template>
  <div class="page">
    <v-headTop head-title="我的积分" go-back='true'></v-headTop>
    <section class="content_container">
      <section class="content">
        <header class="content_header">
          <span class="content_title_style">当前积分</span>
          <section class="contetn_description">
            <img src="../../../images/description.png" height="24" width="24">
            <router-link to="/points/detail" class="content_title_style">积分说明</router-link>
          </section>
        </header>
        <p class="content_num">
          <span>0</span>
          <span>分</span>
        </p>
        <div class="promit_button" @click="usePoint">积分兑换商品</div>
      </section>
    </section>
    <p class="deal_detail">最近30天积分纪录</p>
    <div class="no_log">
      <img src="../../../images/no-log.png">
      <p>最近30天无积分纪录</p>
      <p>快去下单赚取大量积分吧</p>
    </div>
    <v-alertTip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></v-alertTip>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import headTop from '../../../components/header/head.vue'
import alertTip from '../../../components/common/alertTip.vue'

export default {
  data() {
    return {
      showAlert: false,
      alertText: null,
    }
  },
  mounted() {

  },
  components: {
    'v-headTop':headTop,
    'v-alertTip':alertTip,
  },
  computed: {

  },
  methods: {
    usePoint() {
      this.showAlert = true;
      this.alertText = '快去下单赚取大量积分吧';
    }
  }
}

</script>
<style lang="scss" scoped>
.page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 204;
  overflow-y: auto;
  padding-top: 2.0rem;
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.content_container {
  padding: .3rem;
  background-color: #3190e8;
  .content {
    padding: .4rem;
    background-color: #fff;
    border-radius: .15rem;
    .content_header {
      display: flex;
      justify-content: space-between;
      font-size: .55rem;
      .contetn_description {
        display: flex;
        align-items: center;
        img {
          width: .6rem;
          height: .6rem;
          margin-right: .2rem;
        }
        .content_title_style {
          color: #3190e8;
        }
      }
      .content_title_style {
        color: #666;
      }
    }
    .content_num {
      span:nth-of-type(1) {
        font-size: 1.8rem;
        color: #333;
      }
      span:nth-of-type(2) {
        font-size: .7rem;
        color: #333;
      }
    }
    .promit_button {
      width: 100%;
      height: 2rem;
      font-size: .8rem;
      color: #fff;
      border-radius: 0.15rem;
      line-height: 2rem;
      margin-top: 1rem;
      text-align: center;
      background-color: #fe6d47;
    }
  }
}

.deal_detail {
  font-size: .6rem;
  color: #999;
  line-height: 2rem;
  padding-left: .5rem;
}

.no_log {
  text-align: center;
  margin-top: 1rem;
  img {
    width: 8rem;
    height: 5rem;
  }
  p {
    margin-top: .5rem;
    font-size: .7rem;
    color: #666;
  }
  p:nth-of-type(2) {
    font-size: .5rem;
    color: #999;
  }
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
