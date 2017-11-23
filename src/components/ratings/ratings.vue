<template>
  <div id="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <p class="score">{{seller.score}}</p>
          <p class="text">综合评价</p>
          <p class="rate">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="overview-right">
          <div class="star-wrapper">
            <span class="text">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="star"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="star-wrapper">
            <span class="text">菜品评价</span>
            <star :size="36" :score="seller.foodScore" class="star"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="star-wrapper">
            <span class="text">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @toggleSwitch="toggleSwitch" @changeType="changeType" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating, index) in ratings" class="rating-item" :key="index">
            <div class="avatar">
              <img :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score" class="star"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                <span v-show="rating.rateType === 0 && rating.recommend && rating.recommend.length" class="text" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star';
import split from "../split/split";
import ratingselect from "../ratingselect/ratingselect";
import BScroll from 'better-scroll';
import Vue from 'vue';
import {formatDate} from '../../common/js/date';

const ERR_OK = 0;
const ALL = 2;

Vue.filter('formatDate', function(time) {
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm');
});

export default {
  data() {
    return {
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "满意",
        negative: "不满意"
      },
      ratings: []
    };
  },
  components: {
    star,
    split,
    ratingselect
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.$http.get("/api/ratings").then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.ratings = response.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      }
    });
  },
  methods: {
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
@import '../../common/scss/mixin.scss';

#ratings{
  position: absolute;
  left: 0;
  top: 1.73rem;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .overview{
    display: flex;
    margin: 0.18rem 0;
    .overview-left{
      padding-bottom: 0.06rem;
      text-align: center;
      width: 1.375rem;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      .score{
        line-height: 0.28rem;
        font-size: 0.24rem;
        color: rgb(255, 153, 0);
      }
      .text{
        margin-top: 0.06rem;
        margin-bottom: 0.08rem;
        line-height: 0.12rem;
        font-size: 0.12rem;
        color: rgb(7, 17, 27);
      }
      .rate{
        line-height: 0.1rem;
        font-size: 0.1rem;
        color: rgb(147, 153, 159);
      }
    }
    .overview-right{
      flex: 1;
      padding-left: 0.24rem;
      .star-wrapper{
        margin-bottom: 0.08rem;
        &:last-child{
          margin-bottom: 0;
        }
        font-size: 0;
        .text{
          display: inline-block;
          margin-right: 0.12rem;
          vertical-align: top;
          line-height: 0.18rem;
          font-size: 0.12rem;
          color: rgb(7, 17, 27);
        }
        .star{
          display: inline-block;
          margin-right: 0.12rem;
          vertical-align: top;
        }
        .score{
          display: inline-block;
          line-height: 0.18rem;
          vertical-align: top;
          font-size: 0.12rem;
          color: rgb(255, 153, 0);
        }
        .time{
          display: inline-block;
          vertical-align: top;
          line-height: 0.18rem;
          font-size: 0.12rem;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  .rating-wrapper{
    .rating-item{
      display: flex;
      margin: 0 0.18rem;
      padding: 0.18rem 0;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .avatar{
        margin-right: 0.12rem;
        img{
          width: 0.28rem;
          height: 0.28rem;
          border-radius: 50%;
        }
      }
      .content{
        flex: 1;
        position: relative;
        .name{
          margin-bottom: 0.04rem;
          line-height: 0.12rem;
          font-size: 0.1rem;
          color: rgb(7, 17, 27);
        }
        .star-wrapper{
          margin-bottom: 0.06rem;
          font-size: 0;
          .star{
            display: inline-block;
            margin-right: 0.06rem;
            vertical-align: top;
          }
          .delivery{
            display: inline-block;
            line-height: 0.12rem;
            font-size: 0.1rem;
            font-weight: 200;
            color: rgb(147, 153, 159);
          }
        }
        &>.text{
          margin-bottom: 0.08rem;
          line-height: 0.18rem;
          font-size: 0.12rem;
          color: rgb(7, 17, 27);
        }
        .recommend{
          font-size: 0;
          .icon-thumb_down, .icon-thumb_up{
            display: inline-block;
            vertical-align: bottom;
            line-height: 0.16rem;
            font-size: 0.12rem;
            margin-right: 0.08rem;
          }
          .icon-thumb_down{
            color: rgb(147, 153, 159);
          }
          .icon-thumb_up{
            color: rgb(0, 160, 220);
          }
          .text{
            display: inline-block;
            // vertical-align: top;
            margin-right: 0.08rem;
            padding: 0 0.06rem;
            max-width: 0.5rem;
            line-height: 0.16rem;
            font-size: 0.09rem;
            color: rgb(147, 153, 159);
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 2px;
            background-color: #fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:last-child{
              margin-right: 0;
            }
          }
        }
        .time{
          position: absolute;
          right: 0;
          top: 0;
          line-height: 0.12rem;
          font-size: 0.1rem;
          font-weight: 200;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
