<template>
  <div>
    <el-slider v-model="play.progress"
               :min="1"
               :max="play.endStr"
               @change="clickSlider"></el-slider>
    <div class="app_time_box">
      <span>{{timeObj.startTime}}</span>
      <span>{{dynamicTime}}/{{timeObj.endTime}}</span>
    </div>
    <el-button icon="el-icon-search"
               circle
               @click="togell"
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
          : this.timestampToTime(
              startTime + reduceStartEnd * this.play.progress
            );
      return time;
    }
  },
  methods: {
    clickSlider(e) {
      this.$emit("initDarw", e);
    },
    togell() {
      this.play.draw = !this.play.draw;
      if (this.play.draw) {
        this.stop();
      } else {
        this.progress();
      }
    },
    progress() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.play.progress++;
        this.$emit("initDarw", this.play.progress);
        if (this.play.progress === 31) {
          this.play.progress = 0;
        }
      }, 1000);
    },
    // 时间戳转换成时间 yyyy-MM-dd HH:mm:ss
    timestampToTime(timestamp) {
      let strDate = "";
      let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      strDate = Y + M + D + h + m + s;
      return strDate;
    },
    stop() {
      clearInterval(this.timer);
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