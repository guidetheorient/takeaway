<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{current:currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <tag class="icon" :type="item.type"></tag>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
          <h2 class="title">{{item.name}}</h2>
          <ul>
            <li v-for="(food, index) in item.foods" :key="index" class="food-item border-1px" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @increment="_drop"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" class="shop" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food" @increment="_drop"></food>
  </div>
</template>

<script>
import tag from "../tag/tag";
import BScroll from "better-scroll";
import shopcart from "../shopcart/shopcart";
import cartcontrol from "../cartcontrol/cartcontrol";
import food from "../food/food";

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    tag,
    shopcart,
    cartcontrol,
    food
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.map(good => {
        good.foods.map(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    this.$http.get("/api/goods").then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
      }
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      });
    });
  },
  methods: {
    // nextTick默认传入的event已被清空，要手动传入
    _drop(target) {
      // 异步执行下落动画，优化体验
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    selectMenu(index, event) {
      // pc会执行两次
      if (!event._constructed) {
        return;
      }
      this.foodsScroll.scrollToElement(
        this.$refs["foods-wrapper"].getElementsByClassName("food-list-hook")[index], 300);
    },
    _calculateHeight() {
      let foodList = this.$refs["foods-wrapper"].getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        // 每一类别所在的位置
        height += foodList[i].clientHeight;
        this.listHeight.push(height);
      }
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs["menu-wrapper"], {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs["foods-wrapper"], {
        probeType: 3,
        click: true
      });
      this.foodsScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    }
  }
};
</script>

<style lang="scss">
@import "../../common/scss/mixin";

.goods {
  display: flex;
  position: absolute;
  top: 1.73rem;
  bottom: 0.46rem;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 0.8rem;
    width: 0.8rem;
    overflow: hidden;
    background-color: #f3f5f7;
    .menu-item {
      display: table;
      padding: 0 0.12rem;
      width: 100%;
      height: 0.54rem;
      &.current {
        position: relative;
        z-index: 10;
        background-color: #fff;
        // margin-top: -1px;
        .text {
          @include border-none();
        }
      }
      .text {
        display: table-cell;
        width: 0.56rem;
        line-height: 0.14rem;
        vertical-align: middle;
        font-size: 0.12rem;
        font-weight: 200;
        @include border-1px(rgba(7,17,27,0.1));
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 0.12rem;
          height: 0.12rem;
          margin-right: 0.02rem;
          background-size: 0.12rem 0.12rem;
          background-repeat: no-repeat;
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    overflow: hidden;
    .food-list {
      .title {
        height: 0.26rem;
        line-height: 0.26rem;
        padding-left: 0.14rem;
        border-left: 2px solid #d9dde1;
        font-size: 0.12rem;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 0.18rem;
        padding-bottom: 0.18rem;
        @include border-1px(rgba(7,17,27,0.1));
        &:last-child {
          @include border-none();
          margin-bottom: 0;
        }
        .icon {
          width: 0.57rem;
          img {
            width: 0.57rem;
            height: 0.57rem;
          }
        }
        .content {
          position: relative;
          flex: 1;
          margin-left: 0.1rem;
          .name {
            margin-top: 0.02rem;
            line-height: 0.14rem;
            font-size: 0.14rem;
          }
          .desc,
          .extra {
            font-size: 0.1rem;
            color: rgb(147, 153, 159);
          }
          .desc {
            margin: 0.08rem 0;
            line-height: 1.2;
          }
          .extra {
            font-size: 0;
            line-height: 0.1rem;
            span {
              font-size: 0.1rem;
            }
            .count {
              margin-right: 0.12rem;
            }
          }
          .price {
            line-height: 0.24rem;
            font-size: 0;
            .now {
              vertical-align: top;
              margin-right: 0.08rem;
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
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>
