<template>
  <!-- <div id="tag" :class="tagType"> -->
    <span v-show="showIcon" :class="[itemClass,tagType]" id="tag"></span>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    type: {
      type: Number
    },
    suffix: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      showIcon: false
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  computed: {
    itemClass() {
      if (this.type > -1) {
        this.showIcon = true;
        return this.classMap[this.type];
      }
    },
    tagType() {
      return 'tag-' + this.suffix;
    }
  }
};
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';

@mixin size($var,$size){
  &.decrease,&.discount,&.guarantee,&.invoice,&.special{
    display: inline-block;
    height: $size+rem;
    width: $size+rem;
    background-size: $size+rem $size+rem;
  }
  &.decrease{
    @include bg-img("decrease_"+$var)
  }
  &.discount {
    @include bg-img("discount_"+$var);
  }
  &.guarantee {
    @include bg-img("guarantee_"+$var);
  }
  &.invoice {
    @include bg-img("invoice_"+$var);
  }
  &.special {
    @include bg-img("special_"+$var);
  }
}

#tag{
  // font-size: 0;
  &.tag-1{
    @include size(1, 0.12);
  }
  &.tag-2{
    @include size(2, 0.16);    
  }
  &.tag-3{
    @include size(3, 0.12);
  }
  &.tag-4{
    @include size(4, 0.16);
  }
}

// #tag.decrease {
//   @include bg-img("decrease_3");
// }
// #tag.discount {
//   @include bg-img("discount_3");
// }
// #tag.guarantee {
//   @include bg-img("guarantee_3");
// }
// #tag.invoice {
//   @include bg-img("invoice_3");
// }
// #tag.special {
//   @include bg-img("special_3");
// }
</style>
