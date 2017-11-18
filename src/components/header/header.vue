<template>
  <div id="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" class="avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <div class="detail" v-show="detailShow">

    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data(){
    return{
      detailShow:false
    }
  },
  methods:{
    showDetail(){
      this.detailShow = true
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  }
};
</script>

<style lang="scss">
@import "../../common/scss/mixin";

#header {
  position: relative;
  color: #fff;
  font-weight: 200;
  background-color: rgba(7, 17, 27, 0.2);
  .content-wrapper {
    position: relative;
    padding: 0.24rem 0 0.18rem 0.24rem;
    font-size: 0;
    .avatar {
      display: inline-block;
      height: 0.64rem;
      width: 0.64rem;
      border-radius: 2px;
    }
    .content {
      display: inline-block;
      margin-left: 0.16rem;
      padding: 0.02rem 0;
      vertical-align: top;
      font-size: 0.16rem;
      .title {
        font-size: 0;
        .brand {
          @include bg-img("brand");
          display: inline-block;
          width: 0.3rem;
          height: 0.18rem;
          background-size: 0.3rem;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 0.06rem;
          vertical-align: top;
          line-height: 0.18rem;
          font-size: 0.16rem;
          font-weight: bold;
        }
      }
      .description {
        margin-top: 0.08rem;
        line-height: 0.12rem;
        font-size: 0.12rem;
      }
      .support {
        margin-top: 0.1rem;
        font-size: 0;
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 0.12rem;
          height: 0.12rem;
          background-size: 0.12rem;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-img("decrease_1");
          }
          &.discount {
            @include bg-img("discount_1");
          }
          &.guarantee {
            @include bg-img("guarantee_1");
          }
          &.invoice {
            @include bg-img("invoice_1");
          }
          &.special {
            @include bg-img("special_1");
          }
        }
        .text {
          margin-left: 0.04rem;
          line-height: 0.12rem;
          font-size: 0.1rem;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 0.12rem;
      bottom: 0.12rem;
      padding: 0.07rem 0.08rem;
      height: 0.24rem;
      line-height: 0.1rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 0.16rem/0.14rem;
      .count {
        vertical-align: top;
        font-size: 0.1rem;
      }
      .icon-keyboard_arrow_right {
        margin-left: 0.02rem;
        line-height: 0.1rem;
        font-size: 0.1rem;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 0.28rem;
    line-height: 0.28rem;
    padding: 0 0.22rem 0 0.12rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      display: inline-block;
      width: 0.22rem;
      height: 0.12rem;
      background-size: 0.22rem 0.12rem;
      background-repeat: no-repeat;
      @include bg-img("bulletin");
    }
    .bulletin-text {
      margin: 0 0.04rem;
      vertical-align: top;
      font-size: 0.1rem;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      right: 0.12rem;
      line-height: 0.28rem;
      font-size: 0.1rem;
    }
  }
  .background{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    overflow: hidden;
    img{
      width: 100%;
      filter: blur(10px);
    }
  }
  .detail{
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.8);
  }
}
</style>