<template>
  <div>
    <v-header :seller="seller"></v-header>
    <ul class="tab border-1px">
      <li class="tab-item">
        <router-link to="/goods">商品</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/seller">商家</router-link>      
      </li>
    </ul>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from "./components/header/header";
import {urlParse} from "./common/js/util";

const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$http.get("/api/seller/?id=" + this.seller.id).then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data);
      }
    });
  },
  components: {
    "v-header": header
  }
};
</script>

<style lang="scss">
@import "./common/scss/mixin.scss";

.tab {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  @include border-1px(rgba(7,17,27,0.1));
  .tab-item {
    flex: 1;
    text-align: center;
    a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
