<template>
<el-menu class="el-menu-vertical-demo" :router="true">
  <el-menu-item v-for=" item in childName" :key="item" :index=item>
    <i class="el-icon-menu"></i>
    <span slot="title">{{item}}</span>
  </el-menu-item>
</el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: ['childName'],
}
</script>

<style scoped>

</style>
