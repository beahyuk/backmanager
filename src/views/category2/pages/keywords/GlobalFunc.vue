  
<template>
    <div class="buildInFunc"  >
        <el-form :inline="true"  class="demo-form-inline search-style" size="small">
            <el-form-item label="函数文件"  labelWidth="80px">
                <el-autocomplete
                        style="margin-right: 2px"
                        class="inline-input"
                        v-model="comparator"
                        :fetch-suggestions="querySearch"
                        placeholder="输入或选择文件"
                        size="small">
                </el-autocomplete >
                <el-button-group>
                    <el-button type="success" @click.native="findFunc()" size="small">读取</el-button>
                    <el-button type="primary" @click.native="createFunc()" size="small">创建</el-button>
                    <!--<el-button type="danger" @click.native="sureView(removeFunc)" size="small">删除</el-button>-->
                </el-button-group>
            </el-form-item>

            <el-form-item label="函数名" labelWidth="80px" >
                <el-input v-model="funcName" placeholder="输入格式：${func(abc,123)}" size="small">
                </el-input>
                <!--</el-form-item>-->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="checkFunc()" size="small">调试</el-button>
            </el-form-item>
            <el-form-item>
            <el-button-group>
                <!--<el-tooltip content="检查语法" placement="top-start">-->
                <!--<el-button type="primary" icon="el-icon-view" @click.native="checkFunc()" size="small"></el-button>-->
                <!--</el-tooltip>-->
                <el-tooltip content="重置文档" placement="top-start">
                    <el-button type="info"
                               icon="el-icon-refresh"
                               @click.native="findFunc()"
                               size="small">

                    </el-button>
                </el-tooltip>
                <el-tooltip content="保存文档" placement="top-start">
                    <el-button type="success" icon="el-icon-document"
                               @click.native="saveFunc()"
                               size="small">

                    </el-button>
                </el-tooltip>
            </el-button-group>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="16"
                    style="border:3px solid rgb(189, 189, 189)">
                <el-container>
                    <editor
                            style="font-size: 15px"
                            v-model="funcData"
                            @init="editorInit"
                            lang="python"
                            theme="monokai"
                            width="100%"
                            height="790px"
                            :options="{
                                 enableSnippets:true,
                                 enableBasicAutocompletion: true,
                                 enableLiveAutocompletion: true
                             }"
                    >
                    </editor>
                </el-container>
            </el-col>
            <el-col :span="8" style="padding-left:10px;background-color: rgb(234, 234, 234);height:790px ">
                <div style="font-weight: 700;color: gray;font-size:14px;margin-top: 2px;">
                    测试结果：
                </div>
                <pre style="white-space: pre-wrap;word-wrap: break-word;padding-left:10px;">{{this.result}}
                </pre>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        components: {
            editor: require('vue2-ace-editor'),
        },
        data() {
            return {
                funcName: '',
                funcData: '',
                comparator: '',
                comparators: [],
                result: '',
            }
        },
        methods: {
            querySearch(queryString, cb) {
                // 调用 callback 返回建议列表的数据
                cb(this.comparators);
            },
            findFunc() {
                var that = this
                let param = new URLSearchParams()
                param.append('globalscript_name',that.comparator)
                this.$axios.get(this.host + '/test/globalscript/getContent',{
                                                            params:param
                                                            })
                .then(response=>{
                    var res = response.data
                    if(res.success){
                        that.funcData = res.content
                    }
                }) 
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
            createFunc() {
               var that = this
                let param = new URLSearchParams()
                param.append('globalscript_name',that.comparator)
                param.append('content', that.funcData)
                param.append("section_id", JSON.parse(localStorage.getItem('userInfo')).section_id)
                this.$axios.get(this.host + '/test/globalscript/add',{
                                                            params:param
                                                            })
                .then(response=>{
                    var res = response.data
                    if(res.success){
                        that.$message.success("创建成功")
                    }else{
                        that.$message.warning(res.msg)
                    }
                }) 
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
            removeFunc() {
                
            },
            getFuncAddress() {
                
            },
            checkFunc() {
                
            },
            editorInit() {
                require('brace/ext/language_tools');
                require('brace/mode/python');
                require('brace/theme/monokai');
                require('brace/snippets/python')
            },
            saveFunc() {
            },
            keywordQuery(){
                console.log("script_name", this.$route.query.scriptName) 
                if(this.$route.query.scriptName != undefined){
                    var that = this
                    that.comparator = this.$route.query.scriptName
                    that.findFunc()
                }
            }
        },
        mounted() {
            this.getFuncAddress()
            this.keywordQuery()
        },
    }
</script>
