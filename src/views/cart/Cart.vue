<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物街({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartBottomBar from './childComps/CartBottomBar'

import CartList from './childComps/CartList'
import CheckButton from "./childComps/CheckButton";


import {mapGetters} from 'vuex'

export default {
  name:'Cart',
  components: {
    NavBar,
    CartList,
    CheckButton,
    CartBottomBar,
  },
  computed: {
    ...mapGetters({
      length:'cartLength',
      list:'cartList',
    })
  },
}
</script>

<style scoped>
#cart {
  margin-top: 44px;
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9;
}

</style>
