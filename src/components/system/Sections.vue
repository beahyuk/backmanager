<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    <el-breadcrumb-item>部门管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <!-- 部门选择 -->
    <el-row class="cat_opt">
      <el-col>
        <span>选择部门：</span>
        <el-cascader :options="sectionList" :props="sectionProps" clearable v-model="selectSectionKeys" @change="SectionChanged">
        </el-cascader>
        <el-table :data="UserData" stripe border>
          <el-table-column fixed="left" prop="user_head" label="头像"></el-table-column>
          <el-table-column prop="user_name" label="用户名"></el-table-column>
          <el-table-column prop="section_name" label="所属部门"></el-table-column>
          <el-table-column prop="user_role" label="所属职位"></el-table-column>
          <el-table-column prop="user_mail" label="邮箱"></el-table-column>
          <el-table-column prop="user_phone" label="手机号"></el-table-column>

        </el-table>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      sectionList: [],
      sectionProps: {
        expandTrigger: "hover",
        value: "section_id",
        label: "section_name",
        children: "sectionTreeList"
      },
      selectSectionKeys: [],
      UserData: [],
    }
  },
  methods: {
    getSectionTree() {
      var that = this;
      let param = new URLSearchParams()
      this.$axios.get(this.host + '/section/querysectionList', {
          params: param
        })
        .then(function (response) {
          var res = response.data
          that.sectionList = res.sectionList
        })
        .catch(function (error) { //请求失败
          console.log(error);
        })
    },
    SectionChanged() {
      this.getUserList()
      console.log("dddd", this.selectSectionKeys)
    },

    getUserList() {
      var that = this;
      let param = new URLSearchParams()
      console.log("sectionId", this.sectionId)
      param.append('section_id', this.sectionId)
      this.$axios.get(this.host + '/user/querypagelist', {
          params: param
        })
        .then(function (response) {
          var res = response.data
          that.UserData = res.userInfoList
          console.log("user_info", res)
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
  },
  mounted() {
    this.getSectionTree()
  },
  computed: {
    // 当前选中部门叶子结点的id
    sectionId() {
      let keys = this.selectSectionKeys
      if (keys.length !== 0) {
        return keys[keys.length - 1]
      }
    }
  }
}
</script>

<style>

</style>
