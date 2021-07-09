<template>
  <div class="foot">
    <div class="tyleft">
      <span>天元科技©2018</span> 
    </div>
    <div class="dqright">
      <span>当前版本：v1.1.0</span>
      <i class="vsn"></i>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.foot{
  width:100%;
  height: 43px;
  position: absolute;
  bottom: 0px;
  left:200px;
  background:#fff;
  border: 1px solid #F1F4F5;
}
.vsn{
  display: inline-block;
  width:25px;
  height: 25px;
  background-position:center center;
  background-size:25px 25px;
  background-image: url('../../public/img/u378.png');
}
.tyleft{
  float: left;
  height: 100%;
  margin-left:20px;
  line-height: 43px;
}
.dqright{
  float:right;
  width:150px;
  height: 100%;
  line-height: 43px;
  margin-right:220px;
  display: flex;
  align-items:center;
  justify-content: space-around;
}

</style>