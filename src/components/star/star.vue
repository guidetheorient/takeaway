<template>
  <div id="star" :class="starType">
    <span v-for="(itemClass, index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      let result = [];
      let integer = parseInt(this.score);
      let decimal = this.score % 1;

      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (decimal >= 0.5) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";

#star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
    &::last-child {
      margin-right: 0;
    }
  }
  &.star-48 {
    .star-item {
      width: 0.2rem;
      height: 0.19rem;
      margin-right: 0.22rem;
      background-size: 0.2rem 0.19rem;
      &.on {
        @include bg-img("star48_on");
      }
      &.half {
        @include bg-img("star48_half");
      }
      &.off {
        @include bg-img("star48_off");
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 0.15rem;
      height: 0.145rem;
      margin-right: 0.06rem;
      background-size: 0.15rem 0.145rem;
      &.on {
        @include bg-img("star36_on");
      }
      &.half {
        @include bg-img("star36_half");
      }
      &.off {
        @include bg-img("star36_off");
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 0.1rem;
      height: 0.095rem;
      margin-right: 0.03rem;
      background-size: 0.1rem 0.095rem;
      &.on {
        @include bg-img("star24_on");
      }
      &.half {
        @include bg-img("star24_half");
      }
      &.off {
        @include bg-img("star24_off");
      }
    }
  }
}
</style>
