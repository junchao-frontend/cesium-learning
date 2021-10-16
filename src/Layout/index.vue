<template>
  <div class="container">
      <cheader></cheader>
      <asideLeft></asideLeft>
      <asideRight></asideRight>
      <router-view></router-view>
  </div>
</template>

<script>
import asideLeft from './aside-left'
import asideRight from './aside-right'
import cheader from './header'
export default {
 components: {
     asideLeft,
     asideRight,
     cheader
 },
 data() {
 return {
 }
 },
 computed: {},
 created () {},
 mounted () {},
 methods: {}
}
</script>

<style scoped>
</style>
