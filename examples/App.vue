<template>
  <div id="app">
    <AppAttrTab></AppAttrTab>
  </div>
</template>

<script>
import AppAttrTab from '@/components/AppAttrTab/index.vue'

export default {
  name: 'App',
  components: {
    AppAttrTab
  }
}
</script>

<style>
* {
  font-family: "PingFangSC", "Microsoft Yahei", "Avenir", Helvetica, Arial, sans-serif;
}
</style>
