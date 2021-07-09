<template>
  <div class="triangle">
    <button class="trianglebtn"></button>
    <div class="triangle-bottomright">
      <a-icon class="btni" type="close" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.triangle{
   position: relative;
  overflow: hidden;
  border-radius: 5px;
}
.triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 42px solid #4e97d9;
    border-left: 42px solid transparent;
    position: absolute;
    right:1px;
    top:-7px;
 }
 .trianglebtn{
   border:1px solid #4e97d9;
   background:#fff;
   width:80px;
   height: 35px;
  overflow: hidden;
  border-radius: 5px;
 }
 .typebtn{
   display: flex;
 }
 .btni{
   position:absolute;
   left:-20px;
   top:22px;
   color:#fff
 }
  .btni:hover{
    color:red
  }
</style>