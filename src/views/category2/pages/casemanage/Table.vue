<template>
<el-table :data="tableData" ref="table" :stripe="true" style="width: 100%" :highlight-current-row="true" @selection-change="suiteSelectChange">
    <el-table-column fixed="left" type="selection" width="50" label="" ></el-table-column>
    <el-table-column prop="suite_name" label="Suite名称" width="160">
    </el-table-column>
    <el-table-column prop="create_time" label="创建时间" width="160"></el-table-column>
    <el-table-column prop="modify_time" label="修改时间" width="160"></el-table-column>
    <el-table-column prop="description" label="描述" width="150"></el-table-column>
    <el-table-column fixed="right" label="操作" width="400">
      <template slot-scope="scope">
        <el-row>
            <el-col :span="5"><el-button @click="EditClick(scope.row)" type="text" size="medium">编辑</el-button></el-col>
            <el-col :span="5"><el-button @click="ViewClick(scope.row)" type="text" size="medium">查看</el-button></el-col>
            <el-col :span="5"><el-button @click="toogleExpand(scope.row)" type="text" size="medium">展开case</el-button></el-col>
            <el-col :span="5"><el-button @click="RunClick(scope.row)" type="text" size="medium">执行</el-button></el-col>
        </el-row>
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
    <el-table-column type="expand" width="1" fixed="right">
        <template slot-scope="scope">
            <el-table :ref="refs" :data="scope.row.caseList" :stripe="true" style="width: 100%" @selection-change="caseSelectChange($event, scope.row)">
                <el-table-column fixed="left" type="selection" width="50" :selectable="caseSelectable"></el-table-column>
                <el-table-column prop="case_name" label="case名称" width="200"></el-table-column>
                <el-table-column prop="status" label="状态" width="200"></el-table-column>
                <el-table-column prop="pass_rate" label="通过率" width="300"></el-table-column>
                <el-table-column label="操作" width="180"></el-table-column>
            </el-table>
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
                var that = this
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
            visibleType: '',
            caseList: [],
            suiteSelected: [],
            refs: '',
            caseSelected: {},
        }
    },
    methods:{
        toogleExpand(row) { 
            var that = this    
            that.refs = row.suite_name
            var $table = this.$refs.table
            // this.tableData.map((item) => {
            //     console.log("item",item)
            //     if (row.suite_id != item.suite_id) {
            //         $table.toggleRowExpansion(item, false)
            //     }
            // })
            $table.toggleRowExpansion(row)
            let param = new URLSearchParams()
            param.append('suite_id', row.suite_id)
            this.$axios.get(this.host + '/test/testproject/case/querypagelist',{
                                                        params:param
                                                        })
            .then(response=>{
                var res = response.data
                if(res.success){
                    row["caseList"] = res.caseInfolist
                    // if(that.suiteSelected.indexOf(row) > -1){
                    //     this.$nextTick(function () {
                    //         var re = that.refs
                    //         row["isSelected"] = true
                    //         row["caseList"].forEach(item => {
                    //             if(item){
                    //                 console.log("data:  ",this.$refs[re].toggleRowSelection(item, true))
                    //             }
                                
                    //         })
                    //         // this.$refs[re].toggleAllSelection();
                    //         // console.log("data:  ",this.$refs[re].data)
                    //         // console.log("data:  ",this.$refs.table)
                    //         // this.$refs[re].toggleRowSelection(this.$refs[re].toggleRowSelection(row["caseList"][0], true));
                    //     })
                    // }
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });

        },

        RunClick(data){
            var that = this
            let param = new URLSearchParams()
            if(JSON.parse(localStorage.getItem('userInfo')).section_id === undefined){
                that.$message.warning("请先完善部门资料！")
            }else{
                param.append('section_id', JSON.parse(localStorage.getItem('userInfo')).section_id)
                param.append('user_id', JSON.parse(localStorage.getItem('userInfo')).user_id)
                param.append('suite_id', data.suite_id)
                this.$axios.get(this.host + '/test/task/suite/run',{
                                                            params:param
                                                            })
                .then(function(response){
                    var res = response.data
                    if(res.success){
                        console.log("RunResult",res)
                        
                    }
                }) 
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            }
        },
        ViewClick(data){
            var that = this
            that.getSuiteContent(data)
            that.visibleType = "view"
        },

        EditClick(data){
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
                    that.suiteContent = res.content 
                    that.dialogFormVisible = false
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        suiteSelectChange(selection){
            var that = this
            that.suiteSelected = selection
            console.log("suiteSelected", that.suiteSelected)
            that.$emit("suiteselected", that.suiteSelected)
        },
        caseSelectChange(selection,row){
            this.caseSelected[row.suite_id] = selection
            console.log("caseSelected", this.caseSelected)
            this.$emit("caseselected", this.caseSelected)
        },
        caseSelectable(row, index){
            for(var index=0; index<this.suiteSelected.length; index++){
                if(row.suite_id === this.suiteSelected[index].suite_id){
                    this.caseSelected[row.suite_id] = []
                    return false
                }
            }
            return true
        },
        suiteSelectable(row){
            // if(this.caseSelected.hasOwnProperty(row.suite_id) && this.caseSelected[row.suite_id].length>0){
            //     console.log("****",this.caseSelected[row.suite_id])
            //     return false
            // }else{
            //     console.log("#####")
            //     return true
            // }  
        }
    },
}
</script>

<style scoped>
    .el-table__expand-column .cell {
        display: none;
    }
    
 
</style>