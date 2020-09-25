<template>
  <div v-show="isShow" class="toast">{{message}}</div>
</template>

<script>
export default {
  name: "Toast",
  /* props:{
    message:{
      type:String,
      default:''
    },
    show :{
      type:Boolean,
      default:false
    }
  }, */
  methods: {
    show(message, duration = 2000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  z-index: 11;
}
</style>
