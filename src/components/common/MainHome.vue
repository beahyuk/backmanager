<template>
<el-container class="container">
  <el-main class="main">
    <div>
      <home-cate :childItems='parentItems' @chooseItem='cateclick'>
      </home-cate>
    </div>
  </el-main>
</el-container>
</template>

<script>
// 导入主页分类文字和图标
import HomeCate from "views/home/HomeCate";
export default {
  name: "MainHome",
  //newVue之前自动触发
  // beforeCreate() {
  //   //获取token
  //   const token = localStorage.getItem("token")
  //   if (!token) {
  //     // token 没有 -> 登录
  //     this.$router.push({
  //       name: 'login'
  //     })
  //   }
    // if token有 -> 继续渲染组件
  // },
  components: {
    HomeCate
  },
  data() {
    return {
      parentItems: [{
          name: "系统管理",
          icon: "el-icon-s-tools"
        },
        {
          name: "测试管理",
          icon: "el-icon-menu"
        },
        {
          name: "用例执行",
          icon: "el-icon-s-claim"
        },
        {
          name: "结果分析",
          icon: "el-icon-s-platform"
        },
      ],
      path: ''
    }
  },
  methods: {
    cateclick(item) {
    //   console.log("携带参数", this.$route.query)
      this.path = '/' + item.name
      this.$router.push({
        path: this.path,
        query: this.$route.query
      })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}

.main {
  background-color: #e9eef3;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
