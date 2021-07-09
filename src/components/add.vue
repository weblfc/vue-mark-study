<template>
  <div>
    孙子{{$attrs}}
    <button @click="add">点击</button>
  </div>
</template>

<script>
export default {
  methods:{
    add(){
      this.$listeners.son()
    }
  }
}
</script>

<style>

</style>