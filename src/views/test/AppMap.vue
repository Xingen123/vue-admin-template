<template>
  <el-col :span="12"
          class="test-canvas">
    <h2>{{id}}</h2>
    <canvas :id="id"
            :style="{border:borderColorChange}"></canvas>
  </el-col>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    borderColor: {
      type: String,
      default: ""
    },
    offOn: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      mapBg: (() => {
        let i = new Image();
        i.src = require("@/assets/mapbg.png");
        return i;
      })(),
      canvas: null,
      ctx: null
    };
  },
  watch: {
    imgUrl(newValue, oldValue) {
      this.draw();
    },
    offOn(newValue, oldValue) {
      this.initCanvas();
      this.draw();
    }
  },
  computed: {
    borderColorChange() {
      const borderColor =
        this.id === "gt" ? "2px solid #ff0000" : this.borderColor;
      return borderColor;
    }
  },
  mounted() {
    // this.initCanvas();
  },
  methods: {
    initCanvas() {
      this.$nextTick(() => {
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 400;
        this.canvas.height = 300;
        const w = 400;
        const h = 300;
        this.ctx.clearRect(0, 0, w, h);
        this.ctx.drawImage(this.mapBg, 0, 0, w, h);
      });
    },
    draw() {
      const w = 400;
      const h = 300;
      const img = new Image();
      //指定图片的URL
      img.src = this.imgUrl || "";
      //浏览器加载图片完毕后再绘制图片
      img.onload = () => {
        //以Canvas画布上的坐标(10,10)为起始点，绘制图像
        this.ctx.clearRect(0, 0, w, h);
        this.ctx.drawImage(this.mapBg, 0, 0, w, h);
        if (null != img) {
          this.ctx.drawImage(img, 0, 0, w, h);
        }
      };
    }
  }
};
</script>

<style scoped>
.test-canvas {
  margin: 0 auto;
}
</style>