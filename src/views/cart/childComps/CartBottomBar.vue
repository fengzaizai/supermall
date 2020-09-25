<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :value="checkAll"
      class="bottom-check"
      @click.native="checkClick"
      ></check-button>
      <span>全选</span>
      <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="pay" @click="calcClick">结算({{checkLength}})</div>
    </div>

  </div>
</template>

<script>
import CheckButton from './CheckButton'
import {mapGetters} from 'vuex'

export default {
  name:'CartBottomBar',
  components: {
    CheckButton,
  },
  methods:{
    checkClick(){
      if(this.checkAll){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
      /* this.cartList.forEach(item => item.checked = !this.checkAll) */
    },
    calcClick(){
      if(!this.checkAll){

      }
    }
  },
  computed: {
    ...mapGetters([
      'cartList',
      'cartLength',
    ]),
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked;
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    checkAll(){
      if(this.$store.state.cartList.length == 0){
        return false;
      }else{
        return !(this.$store.state.cartList.filter(item => !item.checked).length)
      }

      /* if(this.$store.state.cartList.length === 0) return false;
      for(let item in this.$store.state.cartList){
        if(!item.checked){
          return false
        }
      }
      return true */

    }
  },
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position:relative;
  bottom: 135px;
  line-height: 40px;
}
.check-content{
  display: flex;
}
.bottom-check{
  width: 40px;
  position:relative;
  top: 7px;
  left: 7px;
}
.price{
  margin-left:30px ;
}
.pay{
  text-align: center;
  line-height: 40px;
  width: 100px;
  height: 40px;
  position: absolute;
  right: 0;
  background-color:#ff8198;
}
</style>
