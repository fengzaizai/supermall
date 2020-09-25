<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" :activeColor="Color">
        <span slot="item-icon" class="iconfont">&#xe7a7;</span>
        <span slot="item-icon-active" class="iconfont pink">&#xe7a7;</span>
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" :activeColor="Color">
        <span slot="item-icon" class="iconfont">&#xe6ef;</span>
        <span slot="item-icon-active" class="iconfont pink">&#xe6ef;</span>
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" :activeColor="Color">
        <span slot="item-icon" class="iconfont">&#xe747;</span>
        <span slot="item-icon-active" class="iconfont pink">&#xe747;</span>
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" :activeColor="Color">
        <span slot="item-icon" class="iconfont">&#xe773;</span>
        <span slot="item-icon-active" class="iconfont pink">&#xe773;</span>
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name:"MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
  data() {
    return {
      isActive:false,
      Color:'var(--color-tint)',
    }
  },
}
</script>

<style>

</style>
