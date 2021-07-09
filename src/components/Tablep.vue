<template>
<div class="tablestyle">
  <table>
    <tr>
        <td>序号</td>
        <td>产品序列号</td>
        <td>产品名称</td>
        <td>产品分类</td>
        <td>产品品牌</td>
        <td>生产日期</td>
    </tr>
    <tr class="tdcolor" v-for="(item,index) of searchdata.result" :key="index">
      <td>{{index+1}}</td>
      <td @click="Sequence1(item)">{{item.serialNumber}}</td>
      <td @click="Sequence2(item)">{{item.name}}</td>
      <td>{{item.pproductName}}>{{item.productName}}</td>
      <td>{{item.companyName}}</td>
      <td>{{item.productDate}}</td>
    </tr>
  </table>

</div>
</template>

<script>
export default {
  props:[
    "searchdata"
  ],
  data(){
    return {
      currentPage:1
    }
  },
  methods:{

    Sequence1(item){
      this.$router.push('/details/' + item.manualId+ '/' + item.id)
      },
    Sequence2(item){
      this.$router.push('/detailsManuel/' + item.manualId)
    },
  },
  created(){
  }
}
</script>

<style scoped>
.tablestyle{
  padding:10px 10px;
  position: relative;
}
table{
  width:100%;
  margin-bottom: 60px;
}
table tr:first-child{
  background:#e4e4e4;
}
table td{
  border: 1px solid #cccccc;
  width:19%;
  text-align: center;
  height: 32px;
}
table tr>td:first-child{
  width:60px;
}

.tdcolor>td:nth-child(2),.tdcolor>td:nth-child(3){
  color:#4688c4
}
.tdcolor>td:nth-child(3){
  text-decoration:underline
}
</style>