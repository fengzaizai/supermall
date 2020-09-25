<template>
  <div class="swiperindi">
    <div v-for="(item,index) in slideCount" :key="index">
      {{index}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiperindi",
  data() {
    return {
      slideCount: 0,
    };
  },
  props: {},
  mounted() {
    setTimeout(() => {
      this.slideCount = document
        .querySelector(".swiper")
        .getElementsByClassName("slide").lenght;
    }, 600);
  },
};
</script>

<style scoped>
.swiperindi {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
  background-color: red;
  z-index: 100;
  width: 100px;
  height: 20px;
}
</style>
