<template>
  <div>
    <v-header></v-header>
    <ul class="tab">
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
    <router-view></router-view>
  </div>
</template>

<script>
import header from "./components/header/header";

export default {
  components: {
    "v-header": header
  }
};
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  justify-content: center;
  width: 100%;
  height: .4rem;
  line-height: .4rem;
  .tab-item {
    flex: 1;
    text-align: center;
    a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active{
        color: rgb(240,20,20)
      }
    }
  }
}
</style>
