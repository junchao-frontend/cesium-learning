<template>
  <div class="header" ref="barparent">
      <div>
        <dv-decoration-1 style="width:200px;height:50px;margin-left: 1%; margin-top: 0.8%" />
      </div>
      <div class="title">
        <dv-decoration-11 :style="catStyle">智 慧 校 园 — 需 水 平 台</dv-decoration-11>
      </div>
      <dv-decoration-9 class="ceshi" style="width:100px;height:100px;color:white">66%</dv-decoration-9>
  </div>
</template>

<script>
export default {
 components: {},
 data() {
 return {
   parentClientWidth:''
 }
 },
 computed: {
   catStyle(){
     return {
       width:400 + 'px',
       height:70 + 'px',
       color:'white',
       fontSize:28 + 'px',
       left:(this.parentClientWidth/2 - 200) + 'px'
     }
   }
 },
 created () {},
 mounted () {
    this.parentClientWidth = this.$refs.barparent.clientWidth;
    console.log(this.parentClientWidth);
 },
 methods: {}
}
</script>

<style scoped>
.header {
  position: absolute;
  top:0;
  width: 100%;
  height: 60px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
}
.title{
  position: absolute;
}
.ceshi{
  position:absolute;
  right: 70px;
}
</style>
