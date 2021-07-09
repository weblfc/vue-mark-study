<template>
  <div id="app">
    <router-view />
  </div>
</template>
// <script>
import home from "./views/Home"
export default {
  components: {
    home
  }
}
</script>
<style>
#app{
  height: 100%;
}
</style>
