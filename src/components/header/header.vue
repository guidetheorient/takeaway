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
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>  
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item, index) in seller.supports" :key="index" class="support-item">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from "../star/star";

export default {
  components: {
    star
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    closeDetail() {
      this.detailShow = false;
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
  .background {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    overflow: hidden;
    img {
      width: 100%;
      filter: blur(10px);
    }
  }
  .detail {
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);
    -webkit-backdrop-filter: blur(10px);
    &.fade-enter-active,&.fade-leave-active{
      transition: all 0.5s;
    }
    &.fade-enter,&.fade-leave-to{
      opacity: 0;
    }
    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      .detail-main {
        margin-top: 0.64rem;
        padding-bottom: 0.64rem;
        .name {
          line-height: 0.16rem;
          text-align: center;
          font-size: 0.16rem;
          font-weight: 700;
        }
        .star-wrapper {
          margin-top: 0.16rem;
          text-align: center;
        }
        .title {
          display: flex;
          align-items: center;
          padding: 0.28rem 0.36rem 0.24rem 0.36rem;
          .line {
            flex: 1;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.2);
          }
          .text {
            padding: 0 0.12rem;
            font-size: 0.14rem;
            font-weight: 700;
          }
        }
        .supports {
          padding: 0 0.48rem;
          .support-item {
            margin-bottom: 0.12rem;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              margin-right: 0.06rem;
              vertical-align: top;
              width: 0.16rem;
              height: 0.16rem;
              background-size: 0.16rem;
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
              line-height: 0.16rem;
              font-size: 0.12rem;
              font-weight: 200;
            }
          }
        }
        .bulletin {
          padding: 0 0.48rem;
          p {
            line-height: 0.24rem;
            font-size: 0.12rem;
            font-weight: 200;
          }
        }
      }
    }
    .detail-close {
      // position: relative;
      margin-top: -0.64rem;
      text-align: center;
      .icon-close {
        font-size: 0.32rem;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>