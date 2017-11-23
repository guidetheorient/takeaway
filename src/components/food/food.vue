<template>
  <transition name="move">
    <div id="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h3 class="name">{{food.name}}</h3>
          <div class="extra">
            <span class="count">月售{{food.sellCount}}</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol ref="cartcontrol" :food="food" v-show="!showAddToCart" @increment="emitTogoods"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy-wrapper" v-show="showAddToCart">
              <div class="add-to-cart" @click="addToCart">
                <span>加入购物车</span>
              </div>
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h3 class="title">商品信息</h3>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.info"></split>
        <div class="rating">
          <h3 class="title">商品评价</h3>
          <ratingselect @toggleSwitch="toggleSwitch" @changeType="changeType" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating, index) in food.ratings" class="rating-item" :key="index">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" class="avatar" alt="">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol";
import split from "../split/split";
import ratingselect from "../ratingselect/ratingselect";
import {formatDate} from '../../common/js/date';
import Vue from 'vue';

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

Vue.filter('formatDate', function(time) {
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm');
});

export default {
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  computed: {
    showAddToCart() {
      return !this.food.count;
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      // 初始化
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.food, {
          click: true
        });
      });
    },
    hide() {
      this.showFlag = false;
    },
    addToCart() {
      this.$refs.cartcontrol.increaseCart(event);
    },
    emitTogoods() {
      // console.log(event.target,1);
      this.$emit("increment", event.target);
    },
    toggleSwitch(swtichStatus) {
      this.onlyContent = swtichStatus;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    changeType(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        // 显示内容
        return false;
      } else if (this.selectType === ALL) {
        // 全部内容
        return true;
      } else {
        // 评价类型和 选取评价类型一致
        return type === this.selectType;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";

#food {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.48rem;
  z-index: 9;
  background-color: #fff;
  overflow: hidden;
  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.2s linear;
  }
  &.move-enter,
  &.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 0.1rem;
      left: 0;
      .icon-arrow_lift {
        display: block;
        padding: 0.1rem;
        font-size: 0.2rem;
        color: #fff;
      }
    }
  }
  .content {
    position: relative;
    padding: 0.18rem;
    background-color: #fff;
    @include border-1px(rgba(7,17,27,0.1));
    .name {
      font-size: 0.14rem;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: 0.14rem;
    }
    .extra {
      margin-top: 0.08rem;
      line-height: 0.1rem;
      font-size: 0.1rem;
      color: rgb(147, 153, 159);
      .count {
        padding-right: 0.12rem;
      }
    }
    .price {
      margin-top: 0.18rem;
      line-height: 0.24rem;
      font-size: 0;
      .now {
        vertical-align: top;
        font-size: 0.14rem;
        font-weight: 700;
        color: rgb(240, 20, 20);
      }
      .old {
        font-size: 0.1rem;
        text-decoration: line-through;
        font-weight: 700;
        color: rgb(147, 153, 159);
      }
    }
    .buy-wrapper {
      position: absolute;
      z-index: 2;
      right: 0.18rem;
      bottom: 0.18rem;
      .add-to-cart {
        padding: 0.06rem 0.12rem;
        line-height: 0.12rem;
        font-size: 0.1rem;
        color: #fff;
        background-color: rgb(0, 160, 220);
        border-radius: 0.12rem;
      }
      &.fade-enter-active,
      &.fade-leave-active {
        transition: all 0.1s;
      }
      &.fade-enter,
      &.fade-leave-to {
        opacity: 0;
      }
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: 0.18rem;
      bottom: 0.18rem;
      z-index: 1;
      width: 0.74rem;
    }
  }
  .info {
    padding: 0.18rem;
    .title {
      line-height: 0.14rem;
      margin-bottom: 0.06rem;
      font-size: 0.14rem;
      color: rgb(7, 17, 27);
    }
    .text {
      padding: 0 0.06rem;
      line-height: 0.24rem;
      font-size: 0.12rem;
      font-weight: 200;
      color: rgb(77, 85, 93);
    }
  }
  .rating{
    padding-top: 0.18rem;
    .title{
      margin-left: 0.18rem;
      line-height: 0.14rem;
      font-size: 0.14rem;
      color: rgb(7, 17, 27);
    }
    .rating-wrapper{
      .rating-item{
        padding: 0.16rem 0;
        margin: 0 0.18rem;
        @include border-1px(rgba(7,17,27,0.1));
        .user{
          position: absolute;
          right: 0;
          top: 0.16rem;
          font-size: 0;
          .name{
            display: inline-block;
            vertical-align: top;
            margin-right: 0.06rem;
            line-height: 0.12rem;
            font-size: 0.1rem;
            color: rgb(147, 153, 159);
          }
          .avatar{
            width: 0.12rem;
            height: 0.12rem;
            border-radius: 50%;
          }
        }
        .time{
          line-height: 0.12rem;
          font-size: 0.1rem;
          color: rgb(147, 153, 159);
          margin-bottom: 0.06rem;
        }
        .text{
          line-height: 0.16rem;
          font-size: 0.12rem;
          color: rgb(7, 17, 27);
          .icon-thumb_down,.icon-thumb_up{
            line-height: 0.24rem;
            font-size: 0.12rem;
            margin-right: 0.04rem;
          }
          .icon-thumb_down{
            color: rgb(147, 153, 159);
          }
          .icon-thumb_up{
            color: rgb(0, 160, 220);
          }
        }
      }
    }
    .no-rating{
      padding: 0.16rem 0.18rem;
      font-size: 0.12rem;
      color: rgb(147, 153, 159);
    }
  }
}
</style>
