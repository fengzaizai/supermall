<template>
  <div class="category-bar">
    <div v-for="(item,index) in titles"
    :key="index"
    class="category-bar-item"
    :class="{active:index === currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'CategoryBar',
  props:{
    titles:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex:0,
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index);
    }
  }
}
</script>

<style scoped>
.category-bar{
    font-size: 15px;
    /* position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9; */
  }
  .category-bar-item{
    width: 80px;
    text-align: center;
    height: 38px;
    line-height: 40px;
    background-color: #F7F5F7;
    border-bottom: 1px solid #fdfdfd;
    box-sizing: border-box;
  }
  .category-bar-item span {
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
    border-left: 3px solid var(--color-high-text);
    box-sizing: border-box;
    background-color: #ffffff;
  }
</style>
