<template>
<CatePage :projectName="itemName2"></CatePage>
</template>

<script>
import CatePage from "components/contents/CatePage";

export default {
  name: "Category1",
  components: {
    CatePage
  },
  data() {
    return {
      itemName2: ["用户管理", "部门管理", "项目管理" ]
    }
  }
}
</script>

<style scoped>

</style>
