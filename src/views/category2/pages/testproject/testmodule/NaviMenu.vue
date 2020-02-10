<template>
    <el-menu :default-active="activeIndex2" class="el-menu-mode" mode="horizontal" @select="handleSelect"
        text-color="#545c64" active-text-color="#ffd04b">
    <el-submenu index="1">
        <template slot="title">模块 Module</template>
        <el-menu-item index="2-1">用例 Suite</el-menu-item>
        <el-menu-item index="2-2">脚本 Script</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">用例 Suite</el-menu-item>
    <el-menu-item index="3">脚本 Script</el-menu-item>
    
</el-menu>
</template>

<script>
export default {
    // name: 'NaviMenu',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
    
</script>

<style scoped>

</style>