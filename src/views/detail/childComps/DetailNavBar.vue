<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick"><span class="iconfont">&#xe743;</span></div>
      <div slot="center" class="title">
        <div
          @click="titleClick(index)"
          :class="{active:index === currentIndex}"
          class="title-item"
          v-for="(item,index) in titles"
          :key="index"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";



export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评价", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.go(-1);
    }
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.iconfont{
  font-size: 23px;
  margin-top: 0;
}
</style>
