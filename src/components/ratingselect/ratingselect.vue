<template>
  <div id="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" @click="select(2,$event)" :class="{active:type === 2}">{{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" @click="select(0,$event)" :class="{active:type === 0}">{{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" @click="select(1,$event)" :class="{active:type === 1}">{{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{on:contentType === true}" @click="toggleSwitch">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.type = type;
      this.$emit('changeType', this.type);
    },
    toggleSwitch() {
      this.contentType = !this.contentType;
      this.$emit('toggleSwitch', this.contentType);
    }
  },
  data() {
    return {
      type: this.selectType,
      contentType: this.onlyContent
    };
  },
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";

#ratingselect{
  .rating-type{
    padding: 0.18rem 0;
    margin: 0 0.18rem;
    @include border-1px(rgba(7,17,27,0.1));
    font-size: 0;
    .block{
      display: inline-block;
      margin-right: 0.08rem;
      padding: 0.08rem 0.12rem;
      line-height: 0.16rem;
      font-size: 0.12rem;
      border-radius: 1px;
      color: rgb(77, 85, 93);
      &.active{
        color: #fff;
      }
      &.positive{
        background-color: rgba(0, 160, 220, 0.2);
        &.active{
          background-color: rgb(0, 160, 220)
        }
      }
      &.negative{
        background-color: rgba(77,85,93,0.2);
        &.active{
          background-color: rgb(77, 85, 93);
        }
      }
      .count{
        padding-left: 0.02rem;
        font-size: 0.08rem;
      }
    }
  }
  .switch{
    padding: 0.12rem 0.18rem;
    line-height: 0.24rem;
    font-size: 0;
    color: rgb(147, 153, 159);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    &.on{
      .icon-check_circle{
        color: #00c850;
      }
    }
    .icon-check_circle{
      display: inline-block;
      vertical-align: top;
      margin-right: 0.04rem;
      font-size: 0.24rem;
    }
    .text{
      display: inline-block;
      font-size: 0.12rem;
    }
  }
}
</style>

