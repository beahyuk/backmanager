<template>
<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
  <!-- 头部标题1 -->
  <el-tab-pane label="按suite管理" name="first">
    <!-- 筛选条件部分 -->
    <el-dropdown v-for="item in chooseData" :key="item.name" class="dropdown" trigger="click">
      <el-button class="button">
        <span class="text"> {{item.name}} </span>
        <i class="el-icon-arrow-down" style="float:right;margin:0;
  width:30%;"></i>

      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in item.choice" :key="item">{{item}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </el-tab-pane>
  <!-- 头部标题2 -->
  <el-tab-pane label="按Tag管理" name="second">配置管理</el-tab-pane>
</el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      chooseData: [{
          name: "部门",
          choice: ["部门一", "部门二", "部门三", "部门四", ],
        },
        {
          name: "项目",
          choice: ["项目一", "项目二", "项目三", "项目四", ],
        },

        {
          name: "版本",
          choice: ["版本V1", "版本V2", "版本V3", "版本V4", ],
        },

        {
          name: "测试项目",
          choice: ["名称一", "名称二", "名称三", "名称四", ],
        },

        {
          name: "模块",
          choice: ["模块一", "模块二", "模块三", "模块四", ],
        },

      ],

    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style>
.dropdown {
  display: flex;
  flex-direction: column;
  width: 10%;
  margin: 5px;
}

.text {
  text-align: start;
  width: 60%;
  margin:0;
  padding: 0;
}
.button{
  padding:15px 5px 15px 4px;
  text-align: start;
}
</style>
