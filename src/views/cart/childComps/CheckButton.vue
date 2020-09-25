<template>
    <div>
      <div class="icon-selector" :class="{'selector-active': value}" @click="selectItem">
        <span class="iconfont" v-show="checked">&#xe767;</span>
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  value: {
		    type: Boolean,
        default: false
      }
    },
    data: function () {
		  return {
		    checked: this.value
      }
    },
    methods: {
      selectItem: function () {
        this.$emit('checkBtnClick')
      }
    },
    watch: {
		  value: function (newValue) {
        this.checked = newValue;
      }
    }
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }
  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
  .iconfont{
    display: block;
    position: absolute;
    font-size: 30px;
    top: -12px;
    left: -5.7px;
  }
</style>
