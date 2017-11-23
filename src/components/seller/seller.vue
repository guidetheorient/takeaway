<template>
  <div id="seller" ref="seller">
    <div class="seller-wrapper">
      <div class="info-top border-1px">
        <div class="content-left">
          <h3 class="title">{{seller.name}}</h3>
          <star :size="36" :score="seller.score" class="star"></star>
          <span class="rating-count">({{seller.sellCount}})</span>
          <span class="seller-count">月售{{seller.ratingCount}}单</span>
        </div>
        <div class="favorite" :class="{on: seller.mark}" @click="toggleMark">
          <div class="icon-favorite"></div>
          <p class="mark">{{markMessage}}</p>
        </div>
      </div>
      <ul class="info-bottom">
        <li class="info-item border-1px">
          <h4 class="title">起送价</h4>
          <p class="text">{{seller.minPrice}}<span class="sup">元</span></p>
        </li>
        <li class="info-item">
          <h4 class="title">商家配送</h4>
          <p class="text">{{seller.deliveryPrice}}<span class="sup">元</span></p>
        </li>
        <li class="info-item">
          <h4 class="title">平均配送时间</h4>
          <p class="text">{{seller.deliveryTime}}<span class="sup">分钟</span></p>
        </li>
      </ul>
      <split></split>
      <div class="bulletin" v-show="seller.bulletin || (seller.supports && seller.supports)">
        <h3 class="title">公告与活动</h3>
        <p class="text border-1px">{{seller.bulletin}}</p>
        <ul>
          <li class="supports-item" v-for="(item, index) in seller.supports" :key="index">
            <tag class="tag" :type="item.type" :suffix="4"></tag>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split v-show="seller.pics && seller.pics.length"></split>
      <div class="seller-img" v-show="seller.pics && seller.pics.length">
        <h3 class="title">商家实景</h3>
        <div class="img-wrapper" ref="img-wrapper">
          <div class="img-content">
            <img v-for="(item,index) in seller.pics" :src="item" alt="" :key="index">
          </div>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <h3 class="title">商家信息</h3>
        <p class="info-text border-1px" v-for="(item,index) in seller.infos" :key="index">{{item}}</p>
      </div>
    </div>
    <!-- <shopcart ></shopcart> -->
  </div>
</template>

<script>
import star from "../star/star";
import Vue from 'vue';
import BScroll from 'better-scroll';
import split from '../split/split';
import tag from '../tag/tag';
import shopcart from '../shopcart/shopcart';

export default {
  data() {
    return {
    };
  },
  components: {
    star,
    split,
    tag,
    shopcart
  },
  computed: {
    markMessage() {
      if (this.seller.mark) {
        return '已收藏';
      } else {
        return '收藏';
      }
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    toggleMark() {
      if (!event._constructed) {
        return;
      }
      if (!this.seller.mark) {
        Vue.set(this.seller, 'mark', true);
      } else {
        this.seller.mark = !this.seller.mark;
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      });
      if (this.seller && this.seller.pics.length) {
        var length = this.seller.pics.length;
      }
      let imgContent = this.$refs['img-wrapper'].getElementsByClassName('img-content');
      imgContent[0].style.width = (length * (1.2 + 0.06) - 0.06) + 'rem';
      this.$nextTick(() => {
        this.imgScroll = new BScroll(this.$refs['img-wrapper'], {
          scrollX: 'true'
        });
      });
    });
  }
};
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";

#seller {
  position: absolute;
  left: 0;
  top: 1.73rem;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .seller-wrapper{
    %title {
      line-height: 0.14rem;
      font-size: 0.14rem;
      color: rgb(7, 17, 27);
    }
    .info-top {
      position: relative;
      padding: 0.18rem 0;
      margin: 0 0.18rem;
      @include border-1px(rgba(7,17,27,0.1));
      .content-left {
        font-size: 0;
        .title {
          @extend %title;
          padding-bottom: 0.08rem;
        }
        .star {
          display: inline-block;
          vertical-align: top;
          margin-right: 0.08rem;
        }
        .rating-count,
        .seller-count {
          display: inline-block;
          line-height: 0.18rem;
          font-size: 0.1rem;
          color: rgb(77, 85, 93);
        }
        .rating-count {
          margin-right: 0.12rem;
        }
      }
      .favorite {
        &.on{
          .icon-favorite{
            color: rgb(240, 20, 20);
          }
        }
        position: absolute;
        right: 0;
        top: 0.18rem;
        width: 0.3rem;
        text-align: center;
        .icon-favorite{
          line-height: 0.24rem;
          font-size: 0.24rem;
          padding-bottom: 0.04rem;
          color: rgba(7, 17, 27, 0.4);
        }
        .mark{
          line-height: 0.1rem;
          font-size: 0.1rem;
          color: rgb(77, 85, 93);
        }
      }
    }
    .info-bottom{
      margin: 0.18rem 0;
      padding: 0 0.18rem;
      font-size: 0;
      .info-item{
        display: inline-block;
        width: 33.333333%;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child{
          border-right: 0;
        }
        .title{
          margin-bottom: 0.04rem; 
          line-height: 0.1rem;
          font-size: 0.1rem;
          color: rgb(147, 153, 159);
        }
        .text{
          line-height: 0.24rem;
          font-size: 0.24rem;
          font-weight: 200;
          color: rgb(7, 17, 27);
          .sup{
            font-size: 50%;
          }
        }
      }
    }
    .bulletin{
      margin: 0.18rem;
      .title{
        @extend %title;
      }
      &>.text{
        padding: 0.08rem  0.12rem 0.16rem 0.12rem;
        line-height: 0.24rem;
        font-size: 0.12rem;
        color: rgb(240, 20, 20);
        @include border-1px(rgba(7,17,27,0.1));
      }
      .supports-item{
        padding: 0.16rem 0.12rem;
        font-size: 0;
        @include border-1px(rgba(7,17,27,0.1));
        .tag{
          display: inline-block;
          margin-right: 0.06rem;
          vertical-align: top;
        }
        .text{
          display: inline-block;
          line-height: 0.16rem;
          font-size: 0.12rem;
          font-weight: 200;
          color: rgb(7, 17, 27);
          overflow: hidden;
        }
      }
    }
    .seller-img{
      padding: 0.18rem;
      .title{
        @extend %title;
        padding-bottom: 0.12rem;
      }
      .img-wrapper{
        width: 100%;
        overflow: hidden;
        .img-content{
          height: 0.9rem;
          img{
            display: inline-block;
            margin-right: 0.06rem;
            height: 0.9rem;
            width: 1.2rem;
            &:last-child{
              margin-right: 0;
            }
          }
        }
      }
    }
    .seller-info{
      padding: 0.18rem;
      .title{
        @extend %title;
        padding-bottom: 0.12rem;
      }
      .info-text{
        padding: 0.16rem 0.12rem;
        line-height: 0.16rem;
        font-size: 0.12rem;
        font-weight: 200;
        color: rgb(7, 17, 27);
        border-top: 1px solid rgba(7, 17, 27, 0.1);
      }
    }
  }
  
}
</style>
