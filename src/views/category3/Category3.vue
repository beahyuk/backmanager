<template>
<CatePage :projectName="itemName3"></CatePage>
</template>

<script>
import CatePage from "components/contents/CatePage";
export default {
  name: "Category3",
  components: {
    CatePage
  },
  data() {
    return {
      itemName3: ["正在执行", "任务执行", "回归测试" ],
    }
  }
}
</script>

<style scoped>

</style>
