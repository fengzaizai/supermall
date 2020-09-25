<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">分类
      </div>
    </nav-bar>
    <div>
      <category-bar :titles="['正在流行','上衣','裤子','裙子','内衣','女鞋','男友','包包','运动','配饰','美妆','个护','家居','百货','母婴','食品']"></category-bar>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CategoryBar from './childComp/CategoryBar'
export default {
  name:'Category',
  components: {
    NavBar,
    CategoryBar,
  },
}
</script>

<style scoped>
#category {
  margin-top: 44px;
  height: 100vh;
}
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9;
}
</style>
