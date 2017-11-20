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
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
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
}
</style>
