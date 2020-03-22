<template>
<el-container style="height:100vh">

  <!-- 头部 -->
  <el-header>
    <div>
      <img src="~assets/img/12.png" alt="">
      <span>测试后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>

  <el-container>
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 导航栏 -->
      <el-menu 
      background-color="#333744" 
      text-color="#fff" 
      active-text-color="#409EFF" 
      :collapse="isCollapse" 
      :unique-opened="true" 
      :router="true" 
      :collapse-transition="false" 
      :default-active="$route.path">
        <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
          <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.authName}}</span>
          </template>
          <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span >{{subItem.authName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <!-- 主体内容 -->
    <el-main>
      <router-view></router-view>
    </el-main>

  </el-container>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      iconObj: {
        "1": "iconfont icon-icon_user",
        "2": "iconfont icon-tijikongjian",
        "3": "iconfont icon-shangpin",
        "4": "iconfont icon-danju",
      },
      menulist: [{
          id: 1,
          order:1,
          authName: "系统管理",
          path:"usermanage",
          icon:"el-icon-user-solid",
          children: [{
              id: 11,
              path: "usermanage",
              authName: "用户管理"
            },
            {
              id: 12,
              path: "sectionmanage",
              authName: "部门管理"
            },
            {
              id: 13,
              path: "projectmanage",
              authName: "项目管理"
            }
          ]
        }, {
          id: 2,
          icon:"el-icon-suitcase",
          authName: "测试管理",
          children: [{
            id: 21,
            path: "testproject",
            authName: "测试项目"
          }, {
            id: 22,
            path: "testplan",
            authName: "测试计划"
          }]
        },
        {
          id: 3,
          icon:"el-icon-tickets",
          authName: "用例执行",
          children: [{
            id: 31,
            path: "Running",
            authName: "正在执行"
          }, {
            id: 32,
            path: "TaskRunning",
            authName: "任务执行"
          }, {
            id: 33,
            path: "BackTest",
            authName: "回归测试"
          }]
        }, {
          id: 4,
          icon:"el-icon-monitor",
          authName: "结果分析",
          children: [{
            id: 41,
            path: "Category4",
            authName: "选项1"
          }]
        }
      ],
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear;
      this.$router.push("/login")
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    created() {
    this.MenuList;
  }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  >div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }

  img {
    width: 50px;
    height: 50px;
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
