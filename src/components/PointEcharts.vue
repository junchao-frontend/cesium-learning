<template>
  <div class="container" style="background: rgba(0, 0, 0, 0)">
    <div id="echart" style="width: 100%; height: 550px"></div>
  </div>
</template>

<script>
// import { getEquipmentInfo } from "@/api/schoolData";
export default {
  components: {},
  data() {
    return {
      pointsData: [],
      myChart: "",
      wjc:''
    };
  },
  props:['EquipmentInfo','activeName'],
  computed: {},
  created() {
  },
  mounted() {
      this.initEchart()
  },
  methods: {
    initEchart() {
      this.myChart = this.$echarts.init(
        document.getElementById("echart", "dark")
      );
      // 绘制图表
      var xDataArr = [
        "0：00",
        "1：00",
        "2：00",
        "3：00",
        "4：00",
        "5：00",
        "6：00",
        "7：00",
        "8：00",
        "9：00",
        "10：00",
        "11：00",
        "12：00",
        "13：00",
        "14：00",
        "15：00",
        "16：00",
        "17：00",
        "18：00",
        "19：00",
        "20：00",
        "21：00",
        "22：00",
        "23：00",
      ];
      var yDataArr1 = this.EquipmentInfo[0].dataNum;
      var yDataArr2 = this.EquipmentInfo[1].dataNum;
      var option = {
        animation: true, //开启动画
        //animationDuration:7000, 动画时长
        title: [
          {
            left: "center",
            top: "0%",
            xAxisIndex: 0,
            yAxisIndex: 0,
            text: this.EquipmentInfo[0].name + "-" + this.EquipmentInfo[0].unit,
            textStyle: {
              color: "#d0eaff",
              fontWeight: "bolder",
              fontSizeL: "16px",
            },
          },
          {
            left: "center",
            top: "45%",
            xAxisIndex: 1,
            yAxisIndex: 1,
            text: this.EquipmentInfo[1].name + "-" + this.EquipmentInfo[1].unit,
            textStyle: {
              color: "#d0eaff",
              fontWeight: "bolder",
              fontSizeL: "16px",
            },
          },
        ],
        grid: [
          {
            left: 50,
            right: 50,
            top: 50,
            height: 170,
          },
          { left: 50, right: 50, top: 310, height: 170 },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        axisPointer: {
          link: { xAxisIndex: "all" },
        },
        xAxis: [
          {
            gridIndex: 0,
            data: xDataArr,
            axisLine: {
              lineStyle: {
                color: "#d0eaff",
              },
            },
          },
          {
            gridIndex: 1,
            data: xDataArr,
            axisLine: {
              lineStyle: {
                color: "#d0eaff",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            gridIndex: 0,
            axisLine: {
              lineStyle: {
                color: "#d0eaff",
              },
            },
          },
          {
            type: "value",
            gridIndex: 1,
            axisLine: {
              lineStyle: {
                color: "#d0eaff",
              },
            },
          },
        ],
        series: [
          {
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: yDataArr1,
            type: "line",
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值",
                },
              ],
            },
          },
          {
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: yDataArr2,
            type: "line",
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值",
                },
              ],
            },
          },
        ],
      };
      this.myChart.setOption(option);
    }
    // initschoolData(a) {
    //   getEquipmentInfo(a).then((res) => {
    //     this.pointsData = res.data.data[0].equipmentInfo;
    //     console.log(this.pointsData, "--------------");
    //     this.initEchart();
    //   });
    // },
  },
  watch:{
    EquipmentInfo(){
      this.initEchart()
    }
  }
};
</script>

<style scoped>
</style>
