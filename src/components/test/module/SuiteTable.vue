<template>
    <el-table :data="tableData" :stripe="true" style="width: 100%" :highlight-current-row="true">
    <el-table-column fixed="left" type="selection" width="50" label=""></el-table-column>
    <el-table-column prop="suite_name" label="Suite名称">
    </el-table-column>
    <el-table-column prop="create_time" label="创建时间" ></el-table-column>
    <el-table-column prop="modify_time" label="修改时间" ></el-table-column>
    <el-table-column prop="description" label="描述" ></el-table-column>
    <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button @click="EditClick(scope.row)" type="text" size="medium">编辑</el-button>
        <el-button @click="ViewClick(scope.row)" type="text" size="medium">查看</el-button>
        <el-dialog title="Suite内容" :visible.sync="dialogFormVisible" :append-to-body="true">
        <div style="white-space: pre-wrap; overflow: auto;height: 500px;" v-if="visibleType==='view'">{{suiteContent}}</div>
        <el-form :model="form" v-if="visibleType==='edit'">
            <el-form-item :label-width="formLabelWidth">
                <el-input v-model="suiteContent" autocomplete="off" type="textarea" :rows="18"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button @click="dialogFormVisible = false">关闭</el-button>
            </el-form-item>
        </el-form>
        
        </el-dialog>
      </template>
    </el-table-column>
    
  </el-table>
</template>

<script>
export default {
    props: ["SuiteData"],
    watch:{
        SuiteData:{
            handler (val, oldVal) {
                console.log("*****",val, oldVal)
                var that = this
                console.log("suiteData", that.SuiteData)
                that.tableData = that.SuiteData
            },
            deep: true
        }
    },
    data() {
        return {
            tableData: this.SuiteData,
            dialogFormVisible: false,
            suiteContent: '',
            suiteId: '',
            visibleType: ''
        }
    },
    methods:{
        ViewClick(data){
            console.log(data)
            var that = this
            that.getSuiteContent(data)
            that.visibleType = "view"
        },

        EditClick(data){
            console.log(data)
            var that = this
            that.getSuiteContent(data)
            that.visibleType = "edit"
        },

        getSuiteContent(data){
            var that = this
            that.dialogFormVisible = true
            let param = new URLSearchParams()
            param.append('suite_id', data.suite_id)
            this.$axios.get(this.host + '/test/testproject/suite/getcontent',{
                                                        params:param
                                                        })
            .then(function(response){
                var res = response.data
                if(res.success){
                    console.log("suiteContent",res)
                    that.suiteContent = res.content 
                    that.suiteId = res.suite_id
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        onSubmit(){
            var that = this
            let param = new URLSearchParams()
            param.append('content', that.suiteContent)
            param.append('suite_id', that.suiteId)
            this.$axios.post(this.host + '/test/testproject/suite/edit', param)
            .then(function(response){
                var res = response.data
                if(res.success){
                    console.log("suiteContent",res)
                    that.suiteContent = res.content 
                    that.dialogFormVisible = false
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        }
    },
}
</script>

<style scoped>

</style>