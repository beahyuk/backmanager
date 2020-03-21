<template>
<el-container class="container">

  <!-- 头部 -->
  <el-header class="header">
    <el-row>
      <el-col :span="4">
        <div class="pic" @click="returnclick()">
          <i class="el-icon-arrow-left"></i>
          <span>返回</span>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="name">
          <h3>测试后台系统</h3>
        </div>
      </el-col>
      <el-col :span="2">
        <div class='loginout' @click="outClick">
          <a href="#">退出 </a>
        </div>
      </el-col>
    </el-row>

  </el-header>

  <el-container>
    <!-- 侧边栏 -->
      <el-aside width="300px" class="aside" >
        <el-menu :unique-opened="true" :router="true" style="height:100%">
          <!-- 系统管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="usermanage">
              <i class="el-icon-tickets"></i>
              <span> 用户管理</span>
            </el-menu-item>
            <el-menu-item index="sectionmanage">
              <i class="el-icon-tickets"></i>
              <span> 部门管理</span>
            </el-menu-item>
            <el-menu-item index="projectmanage">
              <i class="el-icon-tickets"></i>
              <span> 项目管理</span>
            </el-menu-item>
          </el-submenu>
          <!-- 测试管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>测试管理</span>
            </template>
            <el-menu-item index="testproject">
              <i class="el-icon-tickets"></i>
              <span> 测试项目</span>
            </el-menu-item>
            <el-menu-item index="casemanage">
              <i class="el-icon-tickets"></i>
              <span> 用例管理</span>
            </el-menu-item>
            <el-menu-item index="keywords">
              <i class="el-icon-tickets"></i>
              <span> 关键字</span>
            </el-menu-item>
            <el-menu-item index="testplan">
              <i class="el-icon-tickets"></i>
              <span> 测试计划</span>
            </el-menu-item>
          </el-submenu>
          <!-- 用例执行 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>用例执行</span>
            </template>
            <el-menu-item index="Running">
              <i class="el-icon-tickets"></i>
              <span> 正在执行</span>
            </el-menu-item>
            <el-menu-item index="TaskRunning">
              <i class="el-icon-tickets"></i>
              <span> 任务执行</span>
            </el-menu-item>
            <el-menu-item index="BackTest">
              <i class="el-icon-tickets"></i>
              <span> 回归测试</span>
            </el-menu-item>
          </el-submenu>
          <!-- 结果分析 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>结果分析</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-tickets"></i>
              <span> 选项1</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
    </el-aside>

    <!-- 主体内容 -->
    <el-main class="main">
      <router-view></router-view>
    </el-main>

  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
    returnclick() {
      this.$emit("returnclick")
    },
    outClick() {
      this.$router.push("/login")
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}

.pic {
  float: left;
  line-height: 60px;
  text-decoration: none;

}

.name {
  text-align: center;
}

.loginout {
  float: right;
  line-height: 60px;
  text-decoration: none
}
</style>
