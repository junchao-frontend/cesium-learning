<template>
  <div class="left_container">
      <div class="first">
        <dv-capsule-chart :config="config" style="width:250px;height:200px" />
      </div>
      <div class="second">
        <dv-capsule-chart :config="config" style="width:250px;height:200px" />
      </div>
      <div class="third">
        <dv-capsule-chart :config="config" style="width:250px;height:200px" />
      </div>
  </div>
</template>

<script>
export default {
 components: {},
 data() {
 return {
   config:{
    data: [
    {
      name: '南阳',
      value: 167
    },
    {
      name: '周口',
      value: 67
    },
    {
      name: '漯河',
      value: 123
    },
    {
      name: '郑州',
      value: 55
    },
    {
      name: '西峡',
      value: 98
    }
  ]
   }
 }
 },
 computed: {},
 created () {},
 mounted () {},
 methods: {}
}
</script>

<style scoped>
.left_container{
    z-index: 1;
    position: absolute;
    left:0;
    width: 200px;
    height: 100%;
}
.first{
  margin-top: 110px;
}
.second{
  margin-top: 60px;
}
.third{
  margin-top: 60px;
}
</style>
