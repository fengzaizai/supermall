<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
/* require("./assets/css/base.css"); */
</script>
<style>
#tab-bar {
  display: flex;
  /* tab-bar一般高度49px */
  /* height: 49px; */
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(95, 95, 95, 0.2);
  z-index: 9;
}
</style>
