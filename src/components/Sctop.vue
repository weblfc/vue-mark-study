<template>
    <div class="Contenuright-top">
    <slot name="left"><span>手册列表</span></slot>
    <slot name="right"><a-button @click="Saut" type="primary"><i class="addbtn"></i>新增</a-button></slot>
  </div>
</template>

<script>
export default {
  methods:{
    Saut(){
      this.$router.push('/Ajouter')
    }
  }
}
</script>

<style>
/* 右边顶部新增和列表 */
.Contenuright-top{
  position: relative;
  width:100%;
  height:20px;
  margin: 20px 0px;
}
.Contenuright-top>span{
  position: absolute;
  left:20px;
}
.Contenuright-top>button{
  position: absolute;
  right:20px;
}
.Contenuright-top button{
  background:#4e97d9!important;
  height: 30px;
  width:82px;
  border-radius: 4px;
  color:#fff;
  line-height: 26px;
  border:1px solid #4e97d9;
  /* position: relative; */
  margin-right:10px;
  text-align: right!important;
}
.addbtn{
  display: inline-block;
  position: absolute;
  top:3px;
  left:8px;
  width:22px;
  height: 22px;
  margin-right:5px;
  padding-top:10px;
  background-position:center center;
  background-size:22px 22px;
  background-image: url("../../public/img/u67.png");
}
</style>