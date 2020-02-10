<template>
<div class="container">
    <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all ref="tree" @node-click="showUserInfo"></el-tree>
</div>
</template>

<script>
export default {
    data(){
        return{
            data:[],
            filterText: '',
            defaultProps: {
            children: 'sectionTreeList',
            label: 'section_name'
            },
        }
    },
    
    methods:{
        getSectionTree(){
            var that = this;
            let param = new URLSearchParams()
            this.$axios.get(this.host + '/section/querysectionList',{
                                                        params:param
                                                        })
            .then(function(response){
                var res = response.data
                that.data = res.sectionList
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },

        showUserInfo(data, node, value){
            var that = this
            if(data.sectionTreeList==null){
                this.getUserList(data)
            }
        },

        getUserList(data){
            var that = this;
            let param = new URLSearchParams()
            param.append('section_name', data.section_name)
            this.$axios.get(this.host + '/user/querypagelist',{
                                                        params:param
                                                        })
            .then(function(response){
                var res = response.data
                that.$emit('getuserlist', res)
                // console.log("user_info",res)
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
    },
    mounted(){
        this.getSectionTree()
    }





}
</script>

<style scoped>

</style>