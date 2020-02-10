<template>
<el-card class="box-card">
  <!-- 三个操作按钮 -->
  <Button></Button>
  <!-- 引入table组件 -->
  <Table ></Table>
</el-card>
</template>

<script>
import Table from 'views/category2/pages/testproject/Table.vue'
import Button from 'views/category2/pages/testproject/Button.vue'
export default {
  name: "TestProject",
  components: {
    Table,
    Button
  },
  data() {
        return {
        //测试项目
            
        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
</style>
