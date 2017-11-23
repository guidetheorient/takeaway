<template>
  <div id="cartcontrol" @click.stop>
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click.stop="increaseCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {},
  methods: {
    increaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      // console.log(event.target);
      this.$emit('increment', event.target);
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count > 0) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="scss">
#cartcontrol {
  font-size: 0;
  .cart-decrease,
  .cart-increase {
    vertical-align: bottom;
    font-size: 0.24rem;
    color: rgb(0, 160, 220);
  }
  .cart-decrease {
    display: inline-block;
    .inner{
      display: inline-block;
      vertical-align: bottom;
      transform: translate3d(0, 0, 0);
    }
    &.move-enter-active, &.move-leave-active{
      transition: all 0.4s linear;
      .inner{
        transition: all 0.4s linear;
      }
    }
    &.move-enter, &.move-leave-to{
      opacity: 0;
      transform: translate3d(0.24rem, 0, 0);
      .inner{
        transform: rotate(-180deg);
      }
    }
  }
  .cart-count {
    display: inline-block;
    width: 0.24rem;
    text-align: center;
    font-size: 0.1rem;
    color: rgb(147, 153, 159);
    line-height: 0.24rem;
  }
  .cart-increase {
    display: inline-block;
    // padding-left: 0.12rem;
  }
}
</style>
