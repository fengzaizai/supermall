<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{active:index === currentIndex-1}"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000,
    },
    animDuration: {
      type: Number,
      default: 300,
    },
    moveRatio: {
      type: Number,
      default: 0.25,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      slideCount: 0, //元素个数
      totalWidth: 0, //swper的宽度
      swiperStyle: {}, //swiper的样式
      currentIndex: 1, //当前的index索引
      scrolling: false, //是否正在读条
    };
  },
  mounted: function () {
    setTimeout(() => {
      this.handleDom();
      this.startTimer();

    }, 600);
  },
  methods: {
    startTimer: function () {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer: function () {
      window.clearInterval(this.playTimer);
    },
    scrollContent: function (currentPosition) {
      //0.设置滚动
      this.scrolling = true;
      //1.开始滚动动画
      this.swiperStyle.transition = this.animDuration + 'ms';
      this.setTransform(currentPosition);
      //2.判断滚动到的位置
      this.checkPosition();
      this.scrolling = false;
    },
    //滚动到正确的位置
    checkPosition: function () {
      window.setTimeout(() => {
        this.swiperStyle.transition = '0ms';
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },
    //设置滚动的位置
    setTransform: function (position) {
      this.swiperStyle.transform = `translate3d(${position}px,0,0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px),0,0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px),0,0`;
    },
    /*
      操作DOM，在DOM前后添加Slide
    */
    handleDom: function () {
      //获取要操作的元素
      let swiperEl = document.querySelector(".swiper");
      let slidesEls = swiperEl.getElementsByClassName("slide");

      //2.保存个数
      this.slideCount = slidesEls.length;
      //3.如果大于一个，那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFrist = slidesEls[0].cloneNode(true);
        let clonelast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(clonelast, slidesEls[0]);
        swiperEl.appendChild(cloneFrist);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }

      //4.让swiper元素，显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth);
    },
    /*
      拖动事件处理
    */
    touchStart: function (e) {
      //如果正在滚动，不可拖动
      if (this.scrolling) return;

      //停止定时器
      this.stopTimer();

      //3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },
    touchMove: function (e) {
      //1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      //2.设置当前的位置
      this.setTransform(moveDistance);
    },
    touchEnd: function (e) {
      //1.获取当前移动距离
      let currentMove = Math.abs(this.distance);

      //2.判断最终的距离
      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        //右边移动超过0，5
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        //向左边移动超过0，5
        this.currentIndex++;
      }

      //3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      //4.移动完成后重新开启定时器
      this.startTimer();
    },
    /*
      控制上一个下一个
    */
    previous: function () {
      this.changeItem(-1);
    },
    next: function () {
      this.changeItem(1);
    },
    changeItem: function (num) {
      //1.移除定时器
      this.stopTimer();

      //2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      //3.添加定时器
      this.startTimer();
    },
  },
};
</script>

<style >
#hy-swiper {
  overflow: hidden;
  position: relative;
}
.swiper {
  display: flex;
}
.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}
.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
