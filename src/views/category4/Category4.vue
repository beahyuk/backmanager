<template>
<CatePage :projectName="itemName4"></CatePage>
</template>

<script>
import CatePage from "components/contents/CatePage";
export default {
  name: "Category4",
  components: {
    CatePage
  },
  data() {
    return {
      itemName4: ["正在执行", "任务执行", "回归测试" ],
    }
  }
}
</script>

<style scoped>

</style>
