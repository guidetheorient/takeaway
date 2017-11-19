<template>
  <div id="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        <div class="price">￥0</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        ￥{{minPrice}}起送
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
      background-color: rgb(43, 52, 60);
      color: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
