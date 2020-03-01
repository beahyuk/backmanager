<template>
  <div>
  <el-button @click="createNew">新建项目</el-button>
  <el-button @click="multiAction">批量执行</el-button>
  <el-button @click="multiDelete">批量删除</el-button>
  </div>
</template>

<script>
export default {
name : "Button",
methods:{
  createNew(){
    console.log("createNew")
  },
  multiAction(){
    console.log("multiAction")
  },
  multiDelete(){
    console.log("multiDelete")
  },
}
}
</script>

<style>

</style>