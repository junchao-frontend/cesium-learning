<template>
  <div id="container">
    <div id="bubble">
      <!-- <div class="line1" style="width: 50px"></div> -->
      <div id="bubble_main">
        <br />
        <span>楼号：</span>
        <span id="code"></span>
        <br /><br />
        <span>楼名：</span>
        <span id="name"></span>
        <!-- <marquee id="name" behavior="scroll" width="90" loop="2"></marquee> -->
      </div>
      <svg id="svg_infoWindow">
        <circle
          cx="4"
          cy="50"
          r="4"
          stroke="rgba(26,152,252,0.7)"
          stroke-width="2"
          fill="transparent"
        />
        <polyline
          fill="transparent"
          points="8,50, 32,50"
          stroke="rgba(44,247,254,0.1)"
          stroke-width="6"
        ></polyline>
      </svg>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <div>
        <span class="buildingColor">{{ buildingName }}</span>
        <point-echarts
          :EquipmentInfo="EquipmentInfo"
          :activeName="activeName"
        ></point-echarts>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getEquipmentInfo } from "@/api/schoolData";
import schoolData from "../utils/schoolBuildings.json";
import pointEcharts from "./PointEcharts.vue";
export default {
  name: "HelloWorld",
  components: {
    pointEcharts: pointEcharts,
  },
  data() {
    return {
      entity: [],
      buildingName: "",
      pointsData: [],
      dialogVisible: false,
      EquipmentInfo: "",
      activeName: "",
      nowPickedObject:null
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
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        scene3DOnly: false,
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
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(114.585096, 36.655077, 1200),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-40),
          roll: 0.0,
        },
      });
      // 绘制图形 盒子
      // this.entity = this.viewer.entities.add({
      //   position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0,3000.0),
      //   name: "Red box with black outline",
      //   box: {
      //     dimensions: new Cesium.Cartesian3(4000.0, 3000.0, 3000.0), //盒子的宽度高度和深度
      //     material: Cesium.Color.RED.withAlpha(0.5),
      //     // color: Cesium.Color.RED,
      //     outline: true,
      //     outlineColor: Cesium.Color.Black,
      //   },
      // });
      // 绘制点
      // this.entity = this.viewer.entities.add({
      //   position: Cesium.Cartesian3.fromDegrees('114.5851186240032', '36.667093136985805', '95.1509884477286'),
      //   name: "Point",
      //   point: {
      //     show: true,
      //     pixelSize: 10,
      //     color: Cesium.Color.RED,
      //     outlineColor: Cesium.Color.BLUE,
      //     outlineWidth: 2,
      //   },
      // });
      // 加载geojson
      // this.viewer.dataSources
      //   .add(
      //     Cesium.GeoJsonDataSource.load(
      //       "http://localhost:8080/static/json/third_floor.json",
      //       {
      //         // stroke: Cesium.Color.HOTPINK,
      //         // fill: Cesium.Color.PINK.withAlpha(0.5),
      //         // strokeWidth: 3
      //       }
      //     )
      //   )
      //   .then((res) => {
      //     // console.log("res", res);
      //     let entities = res.entities.values;
      //     entities.forEach((entity) => {
      //       entity.polygon.extrudedHeight = entity.properties.floor._value * 10;
      //     });
      // for (const entity of entities) {
      //   entity.polygon.extrudedHeight = entity.properties.floor._value
      // }
      // entity.polygon.material = color;
      // entity.polygon.outline = false;
      // entity.polygon.extrudedHeight = entity.properties.childrenNum; //高度扩大5000倍，便于观察
      // console.log("height: ", entity.properties.childrenNum);
      // });

      // 加载gltf
      var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(114.596396, 36.655077, 0)
      );

      var model = this.viewer.scene.primitives.add(
        Cesium.Model.fromGltf({
          url: "static/gltf/hbu.gltf",
          modelMatrix: modelMatrix,
          scale: 20,
        })
      );
      // 设置模型旋转90度
      model.readyPromise.then((argument) => {
        var position = Cesium.Cartesian3.fromDegrees(114.5735, 36.661007, 0);
        var mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        var rotationX = Cesium.Matrix4.fromRotationTranslation(
          Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(-90))
        );
        Cesium.Matrix4.multiply(mat, rotationX, mat);
        model.modelMatrix = mat;
      });
      //添加学校点位
      this.checkSchoolPoint(); //学校点位
      // //是否开启抗锯齿
      this.viewer.scene.fxaa = true;
      this.viewer.scene.postProcessStages.fxaa.enabled = true;

      var directionalLight = new Cesium.DirectionalLight({
        direction: new Cesium.Cartesian3(
          -0.054278300540191,
          -0.842635425193919,
          -0.0729481195458805
        ),
      });
      this.viewer.scene.light = directionalLight;
      // // 亮度设置
      var stages = this.viewer.scene.postProcessStages;
      this.viewer.scene.brightness =
        this.viewer.scene.brightness ||
        stages.add(Cesium.PostProcessStageLibrary.createBrightnessStage());
      this.viewer.scene.brightness.enabled = true;
      this.viewer.scene.brightness.uniforms.brightness = Number(0.95);

      // 添加鼠标点击事件
      var handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      //todo：在椭球下点击创建点
      handler.setInputAction(
        (movement) => {
          var pick = this.viewer.scene.pick(movement.position);
          if (pick.id) {
            getEquipmentInfo(pick.id._name).then((res) => {
              // console.log(res,'res');
              this.EquipmentInfo = res.data.data[0].equipmentInfo;
              this.activeName = res.data.data[0].name;
              // console.log(this.equipmentInfo,'----------------');
              this.buildingName = pick.id.name;
              this.dialogVisible = true;
            });
          }
          // console.log(pick, "pick");
        },
        // var earthPosition = viewer.camera.pickEllipsoid(
        //   event.position,
        //   this.viewer.scene.globe.ellipsoid
        // );
        // if (Cesium.defined(earthPosition)) {
        //   createPoint(earthPosition); //在点击位置添加一个点
        // }
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );

      // 鼠标移入事件
      handler.setInputAction((movement) => {
        // var foundPosition = false;
        if (this.viewer.scene.mode !== Cesium.SceneMode.MORPHING) {
          var pickedObject = this.viewer.scene.pick(movement.endPosition)
          if(this.viewer.scene.pickPositionSupported && Cesium.defined(pickedObject) && pickedObject.id){
            document.getElementById("bubble").style.display = "block"
            this.nowPickedObject = pickedObject
            //console.log( '--------',pickedObject.id._point._pixelSize._value);
            // console.log(pickedObject, 'pickedObject')
            pickedObject.id._point._pixelSize._value = 20
            // document.getElementById("code").innerText = pickedObject.id._id;
            document.getElementById("name").innerText = pickedObject.id._name;
            document.getElementById("bubble").style.marginTop = movement.endPosition.y - document.getElementById('bubble').offsetHeight / 2 + "px";
            document.getElementById("bubble").style.marginLeft = movement.endPosition.x + 10 + "px"
            // var cartesian = this.viewer.scene.pickPosition(movement.endPosition);
          }else{
             if (this.nowPickedObject) {
              this.nowPickedObject.id._point._pixelSize._value = 9;
              this.nowPickedObject = null;
            }
             document.getElementById("bubble").style.display = "none";
          }
          
        }
        // console.log(movement);
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      //去掉版权信息
      this.viewer._cesiumWidget._creditContainer.style.display = "none";
      this.viewer.scene.sun.show = false; //在Cesium1.6(不确定)之后的版本会显示太阳和月亮，不关闭会影响展示
      this.viewer.scene.moon.show = false;
      this.viewer.scene.skyBox.show = false; //关闭天空盒，否则会显示天空颜色
      this.viewer.scene.globe.show = false;
      this.viewer.scene.globe.enableLighting = false; // 开启全球光照
      this.viewer.shadows = true;
      this.viewer.scene.debugShowFramesPerSecond = true;
    },
    // 把点的坐标遍历到每一个建筑上
    checkSchoolPoint() {
      //console.log(this.pointsData,'-----');
      this.pointsData.forEach((item) => {
        this.entity = this.viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            item.position.x,
            item.position.y,
            item.position.z
          ),
          name: item.name,
          point: {
            show: true,
            pixelSize: 9,
            color: Cesium.Color.PALEGREEN,
            outlineColor: Cesium.Color.LIGHTGREY,
            outlineWidth: 3,
          },
        });
        // console.log(item,'item');
      });
    },
  },
  created() {
    this.pointsData = schoolData.data;
    // console.log(this.pointsData);
  },
  mounted() {
    this.init();
    // console.log(this.pointsData);
  },
};
</script>
<style scoped>
#bubble {
  opacity: 1;
  display: none;
  z-index: 1;
  color: white;
  position: absolute;
  height: 100px;
  width: 200px;
}
#bubble_main {
  padding-left: 20px;
  margin-left: 30px;
  position: absolute;
  width: 168px;
  height: 100px;
  background-color: rgba(128, 183, 201, 0.6);
  font-size: 15px;
  backdrop-filter: blur(8px);
  border-radius: 8px;
  border: 1px solid rgba(104, 166, 186, 0.6);
}
#svg_infoWindow {
  position: absolute;
  width: 32px;
  height: 100px;
}
>>> .el-dialog {
  background-color: rgba(64, 97, 148, 0.534);
}
.buildingColor {
  margin-left: 50px;
  font-size: 15px;
  color: #d0eaff;
}
</style>