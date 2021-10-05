<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      entity: "",
    };
  },
  methods: {
    init() {
      //const Cesium = this.cesium
      // const viewer = new Cesium.Viewer('cesiumContainer');
      // viewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权
      // Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYTdkZjkwOC0wY2RlLTRjNDYtYjZkNC1lZDhhOThkMDUwNGYiLCJpZCI6NjkzNTUsImlhdCI6MTYzMzQxOTkyOH0.DLiCrMizM6Fvn9aetwwyNUeUUPjrkpKEyeKfhCwucG8';
      this.viewer = new Cesium.Viewer("container", {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: true,
        homeButton: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        scene3DOnly: true,
        infoBox: false,
        //加載自定义影像
        // imageryProvider: new Cesium.SingleTileImageryProvider({
        // url: 'http://localhost:8080/static/image/123.jpg'
        // }),
        TerrainProvider: new Cesium.CesiumTerrainProvider({
          //地形
          url: Cesium.IonResource.fromAssetId(3956),
          requestVertexNormals: true,
        }),
      });
      // 设置视角 此例子定位到了北京上空
      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 1500.0),
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // 正北：0，东：0
          pitch: Cesium.Math.toRadians(-90), // 俯视：-90，平视：0，抬头：90
          roll: 0.0, // default value，一般不用
        },
      });

      //去掉版权信息
      this.viewer._cesiumWidget._creditContainer.style.display = "none";

      this.viewer.scene.sun.show = false; //在Cesium1.6(不确定)之后的版本会显示太阳和月亮，不关闭会影响展示
      this.viewer.scene.moon.show = false;
      this.viewer.scene.skyBox.show = false; //关闭天空盒，否则会显示天空颜色
      this.viewer.scene.globe.show = true;
      this.viewer.scene.globe.enableLighting = false; // 开启全球光照
      this.viewer.shadows = true;
      this.viewer.scene.debugShowFramesPerSecond = true;
      // this.entity = this.viewer.entities.add({
      //   position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 60000.0),
      //   name: "Red box with black outline",
      //   box: {
      //     dimensions: new Cesium.Cartesian3(4000000.0, 3000000.0, 5000000.0), //盒子的宽度高度和深度
      //     material: Cesium.Color.RED.withAlpha(0.5),
      //     // color: Cesium.Color.RED,
      //     outline: true,
      //     outlineColor: Cesium.Color.Black,
      //   },
      // });
    },
  },

  mounted() {
    this.init();
  },
};
</script>