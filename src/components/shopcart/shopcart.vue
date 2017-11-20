<template>
  <div id="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight: totalCount > 0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div :class="{number: totalCount > 0}">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight: totalPrice > 0}">￥{{totalPrice}}</div>
        <div v-show="deliveryPrice > 0" class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div v-for="(ball, index) in balls" v-show="ball.show" class="ball" :key="index">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 选择的商品，计算价格
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBall: []
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.map(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.map(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    }
  },
  methods: {
    // 由goods.vue调用
    drop(el) {
      // 得到没做动画的第一个ball
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          // v-show触发动画
          ball.show = true;
          ball.el = el;
          this.dropBall.push(ball);
          return;
        }
      }
    },
    // 找出所有show:true的ball
    beforeEnter(el) {
      let count = this.balls.length;
      let fontSize = parseInt(document.documentElement.style.fontSize);
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          console.log(rect.left);
          let x = rect.left - 0.32 * fontSize;
          let y = -(window.innerHeight - rect.top - (0.22 + 0.16) * fontSize);
          el.style.display = '';
          el.style.webKitTransform = `translate3d(0, ${y}px, 0)`;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webKitTransform = `translate(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      }
    },
    enter(el) {
      // 触发重绘
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;

      this.$nextTick(() => {
        el.style.webKitTransform = 'translate3d(0, 0, 0)';
        el.style.transform = 'translate3d(0, 0, 0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webKitTransform = 'translate3d(0, 0, 0)';
        inner.style.transform = 'translate3d(0, 0, 0)';
      });
    },
    afterEnter(el) {
      let ball = this.dropBall.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    }
  }
};
</script>

<style lang="scss">
#shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 0.48rem;
  .content {
    display: flex;
    font-size: 0;
    .content-left {
      flex: 1;
      background-color: #141d27;
      color: rgba(255, 255, 255, 0.4);
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        bottom: 0.08rem;
        margin: 0 0.12rem;
        padding: 0.06rem;
        height: 0.56rem;
        width: 0.56rem;
        background-color: #141d27;
        border-radius: 50%;
        .logo {
          height: 100%;
          width: 100%;
          border-radius: 50%;
          text-align: center;
          background-color: rgb(43, 52, 60);
          .icon-shopping_cart {
            line-height: 0.44rem;
            font-size: 0.24rem;
            color: rgba(255, 255, 255, 0.4);
          }
          &.highlight {
            background-color: rgb(0, 160, 220);
            .icon-shopping_cart {
              color: #fff;
            }
          }
        }
        .number {
          position: absolute;
          top: 0;
          right: 0;
          width: 0.24rem;
          height: 0.16rem;
          line-height: 0.16rem;
          text-align: center;
          border-radius: 0.16rem;
          font-size: 0.09rem;
          color: #fff;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        margin-top: 0.12rem;
        padding-right: 0.12rem;
        vertical-align: top;
        line-height: 0.24rem;
        font-size: 0.16rem;
        font-weight: 700;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        padding-left: 0.12rem;
        font-size: 0.1rem;
        line-height: 0.48rem;
      }
    }
    .content-right {
      width: 1.05rem;
      line-height: 0.48rem;
      text-align: center;
      font-size: 0.12rem;
      font-weight: 700;
      .pay {
        &.not-enough {
          background-color: #2b333b;
          color: rgba(255, 255, 255, 0.4);
        }
        &.enough {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ball-container{
    .ball{
      position: fixed;
      left: 0.32rem;
      bottom: 0.22rem;
      z-index: 200;
      &.drop-leave-active, &.drop-enter-active{
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width: 0.16rem;
          height: 0.16rem;
          border-radius: 50%;
          background-color: rgb(0, 160, 220);
          transition: all 0.4s;
        }
      }
      
    }
  }
}
</style>
