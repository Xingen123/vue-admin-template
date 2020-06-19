<template>
  <div class="test">

    <AppSlider :offOn="offOn"
               :timeObj="timeObj"
               @initDarw="initDarw" />
    <AppMap v-for="item in appMapList"
            :key="item.id"
            :imgUrl="item.url"
            :offOn="offOn"
            :id="item.id" />
  </div>
</template>

<script>
import AppMap from "./AppMap";
import AppSlider from "./AppSlider";
import { getTableData } from "@/api/test.js";
export default {
  components: {
    AppMap,
    AppSlider
  },
  data() {
    return {
      mapBg: (() => {
        let i = new Image();
        i.src = require("@/assets/mapbg.png");
        return i;
      })(),
      appMapList: [
        { url: "", id: "gt" },
        { url: "", id: "klsp" },
        { url: "", id: "rover" },
        { url: "", id: "trajgru" },
        { url: "", id: "ygnet" }
      ],
      tableData: [],
      timeObj: {},
      offOn: false
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    initDarw(e) {
      console.log(e);

      this.appMapList = this.appMapList.map(item => {
        let url =
          e < 31 ? this.tableData[item.id][e - 1] : this.tableData[item.id][0];
        return {
          ...item,
          url
        };
      });
    },
    getData() {
      getTableData({ timeStr: "2020-06-19 10:28:08" })
        .then(res => {
          const data = res.data;
          this.tableData = data;
          this.offOn = true;
          this.timeObj = {
            startTime: data.videoStartTime,
            endTime: data.videoEndTime,
            dynamicTime: data.videoStartTime
          };
          this.initDarw(1);
        })
        .catch(err => {
          console.log("err :", err);
        });
    }
  }
};
</script>

<style scoped>
.test {
  width: 80%;
  margin: 0 auto;
}
.app_map {
  /* display: flex;
  flex-direction: row; */
}
</style>