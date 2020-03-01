
<template>
  <div>
    <!-- 搜索框，input和图标 -->
    <div style="float: left">
      <el-input placeholder="需求名称/所属项目搜索" v-model="input4" style="width: 368px">
        <template slot="append" ><el-button slot="append" icon="el-icon-search" @click="getmainTableList()"></el-button></template>
      </el-input>
    </div>
    <!-- 添加按钮 -->
    <div class="btn-style">
      <el-button type="primary" @click="requirementForm('')">添加需求</el-button>
    </div>
    <!-- 表单table上批量删除和批量指派的操作按钮 -->
    <div class="head-div">
      <el-button class="btn-div"  @click="deleteAll()" :disabled="!allowDisplay">批量删除</el-button>
    </div>
    <!-- 表单table -->
    <el-table :data="tableData5" style="width: 100%" 
    border 
    @select="selectChange" 
    @select-all="selectChange" 
    ref="table"
    @row-click="expandChange" 
    :row-key="getRowKeys" 
    :expand-row-keys="expands" 
    @expand-change="expandChange">
      <!-- 展开的模板，slot -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="moduleName" label="涉及模块" width="180"></el-table-column>
            <el-table-column prop="evaluatorName" label="评估人员" width="180"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
             
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="需求id" prop="id" v-if="false"></el-table-column>
      <el-table-column label="需求名称" prop="name"></el-table-column>
      <el-table-column label="所属项目" prop="projectName"></el-table-column>
      <el-table-column label="创建人员" prop="createdByName"></el-table-column>
      <el-table-column label="负责人" prop="chargeByName"></el-table-column>
      <el-table-column label="状态" >
        <template slot-scope="scope">
          {{$t(scope.row.state)}}
        </template>
      </el-table-column>
      <!-- 操作一栏 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteBatch(scope.row.id)">删除</el-button>
          <el-button type="text" @click="requirementForm(scope.row.id)" v-if="scope.row.state !== 'terminated'">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <div class="f-tar">
      <table-bar :total="total" table="table" @change="getList" :checkbox="false">
      </table-bar>
    </div>
  </div>
</template>
<script>
  import tableOperation from '@/components/layout/tableOperation'
  import  * as api from '@/api/ptms'
  import {tips} from '../../static/js/global.js'
  let moment = require("moment");
  import TableBar from '@/components/TableBar'
  export default {
    components:{ TableBar},
    data() {
      return {
        allowDisplay:false,//批量删除、批量指派显示
        input4:'',
        table: [],
        total: 0,//数据的总条数
        tableData5: [
        ],
        tableData: [
        ],
        dataIds: [],
        param:{
          // limit: 10,
          limit: Number.parseInt(localStorage.getItem('currentSize') || 10),
          skip: 0,
          name: ""
        },
        actor: '张俊', // TODO 直接取的登录用户信息
        // 获取row的key值
        getRowKeys(row) {
          return row.id;
        },
        expands: [],
      }
    },
 
    created(){
      this.setData();
    },
 
    methods:{
 
      // 初始化
      setData(){
        this.findPagesByCondition(this.param);
      },
 
      // 条件查询
      getmainTableList(){
        this.param.name = this.input4;
        this.findPagesByCondition(this.param);
      },
 
      //分页
      getList(assign){
        console.log(assign)
        this.param.name = this.input4;
        if (assign instanceof Object) {
          const object2 = Object.assign(this.param, assign)
          this.findPagesByCondition(object2);
        }
      },
 
      findPagesByCondition(param){
        api.getListRequirement(param)
          .then((res)=>{
            if(res.ret > -1){
              console.log(res.data)
              this.total = res.data.total;
              this.tableData5 = res.data.data;
              this.expands = [];
              // this.param.limit = res.data.data;
              // this.param.skip = res.data.data;
            }
          });
      },
 
      //批量删除、批量指派-多选计算
      selectChange(selection) {
        this.allowDisplay = selection.length > 0;
        if(this.allowDisplay){
          this.dataIds = selection.map((item) => item.id);
        }else{
          this.dataIds = [];
        }
      },
 
      //批量删除
      deleteAll(){
        this.deleteBatch(this.dataIds)
      },
 
      // 查看指派评估详情
      expandChange(row) {
        let temp = this.expands;
        this.expands = [];
        this.expands.push(row.id);
        if(temp.length === 1 && temp[0] === row.id){     // 收起展开行
          this.expands = [];
        }else {
          api.viewRequirementModuleOrg({requirementId: row.id})
            .then((res)=>{
              if(res.ret > -1){
                res.data.data.map(x=>{
                  x.state=this.$t(x.state);
                });
                this.tableData = res.data.data;
              }
            })
        }
 
      },
 
      // 添加、编辑需求页面跳转
      requirementForm (id){
        if(id !== ''){
          this.$router.push({ path: `/requirementForm/${id}`});
        }else {
          this.$router.push({ path: '/requirementForm'});
        }
      },
 
      // 删除及批量删除
      deleteBatch(val){
        const arr = [];
        if(typeof val === 'object'){
          for(let i=0; i<val.length; i++){
            arr.push(val[i]);
          }
          this.deleteAction('确认删除这'+ val.length +'个需求?' + '可能造成相应任务的删除', arr);
        }else {
          arr.push(val);
          this.deleteAction("确认删除该需求?" + '可能造成相应需求及任务的删除', arr);
        }
      },
 
      deleteAction(content, arr) {
        this.$confirm(content, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.requirementDelete({id: arr})
            .then((res)=>{
              if(res.ret === 0){
                tips(this, '删除成功！', 'success');
                this.setData();
                this.allowDisplay = false;
              }
            })
        }).catch(() =>{
          // 取消
        });
      },
 
    },
  }
</script>
<style lang="scss" scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .btn-style{
    float: right;
    margin-top:-20px;
    padding: 15px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .f-tar {
    text-align: right;
  }
  .head-div{
    border-right: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    width: 100%;
    height: 60px;
    clear: both;
  }
  .btn-div{
    margin-top: 10px;
    margin-left: 20px;
  }
</style>