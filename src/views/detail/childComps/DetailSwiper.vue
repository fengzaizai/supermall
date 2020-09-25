<template>
  <div class="detail-swiper">
    <swiper class="lunbo-swiper">
      <swiper-item class="swiper-item" v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
  name:'DetailSwiper',
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
}
</script>

<style scoped>
.lunbo-swiper{
  height: 300px;
  overflow: hidden;
  background-color: #fff;
}
.lunbo-swiper .swiper-item{
  text-align: center;
}
.lunbo-swiper .swiper-item img{
  height: 300px;
  width: auto;
}
</style>
