<template>
  <div>
    <el-slider v-model="play.progress"
               :min="1"
               :max="play.endStr"
               @change="clickSlider"></el-slider>
    <div class="app_time_box">
      <span>{{timeObj.startTime | formatTime}}</span>
      <span>{{dynamicTime | formatTime}}/{{timeObj.endTime | formatTime}}</span>
    </div>
    <el-button icon="el-icon-search"
               circle
               @click="toggle"
               v-text='play.draw ? "开始" : "暂停"'></el-button>
  </div>
</template>

<script>
export default {
  props: {
    offOn: {
      type: Boolean,
      default: false
    },
    timeObj: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    offOn(newValue, oldValue) {
      this.progress();
    }
  },
  data() {
    return {
      play: {
        progress: 0,
        endStr: 30,
        draw: false
      },
      timer: null
    };
  },
  computed: {
    dynamicTime() {
      let startTime = new Date(this.timeObj.startTime).getTime();
      let endTime = new Date(this.timeObj.endTime).getTime();
      let reduceStartEnd = (endTime - startTime) / 30;
      let time =
        this.play.progress < 2
          ? this.timeObj.startTime
          : this.$options.filters["timestampToTime"](
              startTime + reduceStartEnd * this.play.progress
            );
      return time;
    }
  },
  methods: {
    clickSlider(e) {
      this.$emit("initDarw", e);
    },
    stop() {
      window.cancelAnimationFrame(this.timer);
    },
    toggle() {
      this.play.draw = !this.play.draw;
      if (this.play.draw) {
        this.stop();
      } else {
        this.progress();
      }
    },

    progress() {
      let then = Date.now() - 500;
      let interval = 500;
      let _this = this;
      // 处理浏览器兼容
      window.requestAFrame = (function() {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          // if all else fails, use setTimeout
          function(callback) {
            return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
          }
        );
      })();
      this.timer = window.requestAFrame(function fn() {
        _this.timer = window.requestAFrame(fn);
        //....逻辑代码
        let now = Date.now();
        let delta = now - then;
        if (delta > interval) {
          then = now - (delta % interval);
          _this.play.progress++;
          _this.$emit("initDarw", _this.play.progress);
          if (_this.play.progress === 31) {
            _this.play.progress = 0;
          }
        }
      });
    },
    // 键盘事件
    addKeybord() {
      let then = Date.now() - 100;
      window.onkeydown = e => {
        let now = Date.now();
        if (now - then < 100) {
          return;
        }
        if (e.keyCode == 32) {
          this.play.flag = !this.play.flag;
          if (this.play.end) {
            this.play.num = 0;
            this.play.end = false;
          }
        } else if (e.keyCode == 37) {
          // 左箭头
          this.play.num--;
          this.play.num = this.play.num < 0 ? 0 : this.play.num;
        } else if (e.keyCode == 39) {
          // 右箭头
          this.play.num++;
          this.play.num = this.play.num > 29 ? 29 : this.play.num;
        }
        then = Date.now();
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.app_time_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>