<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center">我的</div>
    </nav-bar>
    <div class="userinfo">
      <div class="top">
        <div class="userphoto">
          <div class="photo">
            <img src="~assets/img/user/userphoto.png" alt />
          </div>
        </div>
        <div class="userid">
          <div class="username">
            <span v-if="username">{{username}}</span>
            <div v-else>
              <span>登录</span>/
              <span>注册</span>
            </div>
            <br />
            <div class="usertp">
              <span v-if="userTp">{{userTp}}</span>
              <span v-else>用户暂未绑定手机号码</span>
            </div>
          </div>
          <div class="jiantou">﹀</div>
        </div>
      </div>
      <div class="main">
        <div class="main-top">
          <div class="balance">
            <div class="rr">
              <span class="hah">{{balance}}</span>元
              <div>我的余额</div>
            </div>
          </div>
          <div class="discount">
            <div class="rr">
              <span class="hah">{{discount}}</span>个
              <div>我的优惠</div>
            </div>
          </div>
          <div class="integral">
            <div class="rr">
              <span class="hah">{{integral}}</span>分
              <div>我的积分</div>
            </div>
          </div>
        </div>
        <div class="main-center">
          <div class="message">
            <span class="iconfont">&#xe74f;</span>
            <span>我的消息</span>
          </div>
          <div class="discount-mall">
            <span class="iconfont">&#xe7cb;</span>
            <span>积分商城</span>
          </div>
          <div class="vipcard">
            <span class="iconfont">&#xe774;</span>
            <span>会员卡</span>
          </div>
        </div>
        <div class="main-bottom">
          <div class="user-cart">
            <span class="iconfont">&#xe747;</span><span>我的购物车</span>
          </div>
        </div>
        <div class="download">
          <span class="iconfont">&#xe745;</span><span>下载购物APP</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Profile",
  data() {
    return {
      username: "啊哈",
      userTp: "15566262236",
      balance: 3000,
      discount: 0,
      integral: 0,
    };
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
#profile {
  margin-top: 44px;
  height: 100vh;
  background-color: #eeeeee;
}
.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9;
}
.top {
  width: 100%;
  height: 90px;
  background-color: var(--color-tint);
  display: flex;
}
.top .userphoto {
  height: 90px;
  flex: 1;
}
.userphoto .photo {
  background-color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.photo img {
  width: 60px;
}
.userid {
  height: 90px;
  flex: 2;
  color: #fff;
}
.userid .username {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.usertp {
  font-size: 10px;
  margin-top: 3px;
}
.jiantou {
  width: 20px;
  position: absolute;
  top: 80px;
  right: 20px;
  z-index: 10;
  transform: rotate(-90deg);
}
.main-top {
  height: 60px;
  width: 100%;
  display: flex;
  font-size: 14px;
  text-align: center;
}
.balance,
.discount,
.integral {
  flex: 1;
  border-left: 1px solid #e7e4e4;
  box-sizing: border-box;
  background-color: #ffffff;
}
.rr {
  margin-top: 10px;
}
.balance {
  border: none;
}
.hah {
  color: #df644c;
  font-size: 20px;
}
.main-center {
  margin-top: 15px;
}
.message,
.discount-mall,
.vipcard {
  height: 40px;
  margin-top: 1px;
  background-color: #fff;
  line-height: 40px;
}
.iconfont {
  position: relative;
  top: 3px;
  color: var(--color-tint);
  margin: 0 5px;
}
.main-bottom{
  margin-top: 20px;
}
.user-cart,.download{
  height: 40px;
  margin-top: 1px;
  background-color: #fff;
  line-height: 40px;
}
</style>
