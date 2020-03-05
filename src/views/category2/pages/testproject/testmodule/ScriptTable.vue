<template>
    <el-table :data="tableData" :stripe="true" style="width: 100%" :highlight-current-row="true">
    <el-table-column fixed="left" type="selection" width="50" label=""></el-table-column>
    <el-table-column prop="pyscript_name" label="Script名称" width="200">
    </el-table-column>
    <el-table-column prop="create_time" label="创建时间" width="220"></el-table-column>
    <el-table-column prop="modify_time" label="修改时间" width="220"></el-table-column>
    <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
            <el-button @click="EditClick(scope.row)" type="text" size="medium">编辑</el-button>
            <el-button @click="ViewClick(scope.row)" type="text" size="medium">查看</el-button>
            <el-dialog title="Script内容" :visible.sync="dialogFormVisible" :append-to-body="true" >
            <div style="white-space: pre-wrap; overflow: auto;height: 500px;" v-if="visibleType==='view'" >{{scriptContent}}</div>
            <el-form :model="form" v-if="visibleType==='edit'">
                <el-form-item :label-width="formLabelWidth">
                    <el-input v-model="scriptContent" autocomplete="off" type="textarea" :rows="18"></el-input>
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
    props: ["ScriptData"],
    watch:{
        ScriptData:{
            handler (val, oldVal) {
                console.log("*****",val, oldVal)
                var that = this
                console.log("scriptData", that.ScriptData)
                that.tableData = that.ScriptData
            },
            deep: true
        }
    },
    data() {
        return {
            tableData: this.ScriptData,
            dialogFormVisible: false,
            scriptContent: '',
            scriptId: '',
            visibleType: ''
        }
    },
    methods:{
        ViewClick(data){
            console.log(data)
            var that = this
            that.getScriptContent(data)
            that.visibleType = "view"
        },

        EditClick(data){
            console.log(data)
            var that = this
            that.getScriptContent(data)
            that.visibleType = "edit"
        },
        getScriptContent(data){
            var that = this
            that.dialogFormVisible = true
            let param = new URLSearchParams()
            param.append('pyscript_id', data.pyscript_id)
            this.$axios.get(this.host + '/test/pyscript/getcontent',{
                                                        params:param
                                                        })
            .then(function(response){
                var res = response.data
                if(res.success){
                    console.log("scriptContent",res)
                    that.scriptContent = res.content 
                    that.scriptId = res.pyscript_id
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        onSubmit(){
            var that = this
            let param = new URLSearchParams()
            param.append('content', that.scriptContent)
            param.append('pyscript_id', that.scriptId)
            this.$axios.post(this.host + '/test/pyscript/edit', param)
            .then(function(response){
                var res = response.data
                if(res.success){
                    console.log("scriptContent",res)
                    that.scriptContent = res.content 
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