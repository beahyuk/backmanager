<template>
<div>
  <div class="item">
    <span v-for="item in childItems" :key="item.name" @click="chooseItem(item)">
      <i :class=item.icon></i>
      {{item.name}}
    </span>
  </div>
</div>
</template>

<script>
export default { 
  name: "Home",
  props: ['childItems'],
  methods: {
    chooseItem(item) {
      this.$emit('chooseItem', item)
    }
  }
}
</script>

<style scoped>
.item {
  width: 380px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
}

.item span {
  margin: 15px;
  width: 160px;
  font-size: 30px;
}
</style>
