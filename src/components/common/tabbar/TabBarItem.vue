<template>
    <div class="tab-bar-item" @click="itemClick" :style="activeStyle">
      <slot v-if="isActive" name="item-icon-active"></slot>
      <slot v-else name="item-icon"></slot>
      <div ><slot name="item-text"></slot></div>
  </div>
</template>

<script>
import TabBarVue from "./TabBar.vue";
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      defaulf:'red'
    }
  },
  data() {
    return {
      /* isActive:false, */
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path)
    }
  },
  computed: {
    isActive(){
      //判断当前活跃的path是否等于 item中的path
      return this.$route.path.indexOf(this.path) != -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  },
};
/* require("./assets/css/base.css"); */
</script>
<style>
.tab-bar-item {
  /* float: left; */
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.iconfont{
  font-size: 24px;
  margin-top: 3px;
}
/* .iconfont.pink,.active{
  color: red;
} */
</style>
