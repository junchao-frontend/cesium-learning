<template>
  <div class="container">
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
import schoolData from '../utils/schoolBuildings.json'
export default {
 components: {},
 data() {
 return {
   pointsData:[]
 }
 },
 computed: {},
 created () {
  //  console.log(datas);
 },
 mounted () {
   this.pointsData = schoolData.data
   console.log(this.pointsData);
 },
 methods: {}
}
</script>

<style scoped>
</style>
