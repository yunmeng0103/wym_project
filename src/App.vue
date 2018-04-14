<template>
  <div>
    <transition name="router-fade">
      <router-view/>
    </transition>
    <svg-icon></svg-icon>
  </div>
</template>
<script>
import svgIcon from './components/common/svg.vue';
export default {
  components: {
    svgIcon
  },
}

</script>
<style>
@import './style/common';
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity .5s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}

</style>
