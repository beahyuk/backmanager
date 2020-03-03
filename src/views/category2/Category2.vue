<template>
<CatePage :projectName="itemName2"></CatePage>
</template>

<script>
import CatePage from "components/contents/CatePage";

export default {
  name: "Category2",
  components: {
    CatePage
  },
  data() {
    return {
      itemName2: ["测试项目", "用例管理", "关键字", "测试计划", ]
    }
  }
}
</script>

<style scoped>

</style>
