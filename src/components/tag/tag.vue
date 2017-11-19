<template>
  <span v-show="showIcon" :class="itemClass" id="tag"></span>
</template>

<script>
export default {
  props: {
    type: {
      type: Number
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
    }
  }
};
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';

#tag.decrease {
  @include bg-img("decrease_3");
}
#tag.discount {
  @include bg-img("discount_3");
}
#tag.guarantee {
  @include bg-img("guarantee_3");
}
#tag.invoice {
  @include bg-img("invoice_3");
}
#tag.special {
  @include bg-img("special_3");
}
</style>
