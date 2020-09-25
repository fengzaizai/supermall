<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scrollDetail" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-item :goods="goods"></detail-base-item>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info @imageLoad="GoodsImgLoad" ref="scroll" :detailInfo="detailInfo"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseItem from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar"


import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import Toast from "components/common/toast/Toast"

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "netword/detail";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex:0,
      isShowBackTop: false,
      message:'',
      show:false,
    };
  },
  mixins: [itemListenerMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseItem,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailBottomBar,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    BackTop,
    Toast,
  },
  created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then((res) => {
      const data = res.result;
      //1.获取顶部图片的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //4.获取商品详细信息
      this.detailInfo = data.detailInfo;
      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      this.$nextTick(() => {});
    });

    //3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
    //将this.themeTopY赋值进行防抖
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    });
  },

  methods: {
    addToCart(){
      //1.获取商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {
        /* this.show = true;
        this.message = res;
        setTimeout(() => {
          this.show = false;
          this.message = '';
        },1500) */

        this.$toast.show(res,1500)
      })
      //3.添加到购物车成功

    },
    backClick() {
      this.$refs.scrollDetail.scrollTo(0, 0, 500);
    },
    GoodsImgLoad() {

      this.$refs.scroll.refresh();
    },
    titleClick(index) {
      // console.log(index)
      this.getThemeTopY()
      this.$refs.scrollDetail.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      //1.获取y值
      const positionY = -position.y;
      //2.positionY和主题中值进行比较
      let length = this.themeTopYs.length;
      for(let i=0 ;i < length - 1 ;i++){
        /* if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
          console.log(i)
        } */
        /* if(this.currentIndex !== i && ((i < length-1 && positionY >=
        this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||
        (i === length-1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        } */

        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
  },
  updated () {
    this.getThemeTopY();
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.content {
  overflow: hidden;
  height: calc(100% - 44px);
}
</style>
