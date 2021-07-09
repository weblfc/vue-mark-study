<template>
  <div id="preview" class="col pr-0">
    <div class="card bg-transparent mr-5 position-absolute">
      <img class="card-img-top" :src="pics[i].src" alt="Card image cap" id="mImg">
      <div class="card-body p-0 text-center">
        <img src="img/product_detail/hover-prev.png" class="btn float-left btn-light border-0 p-1 pt-4 pb-4" :class="{disabled:leftDisabled}" @click="move(-1)" id="btnLeft">
        <div class="d-inline-block pt-2 mx-0 m-auto">
          <!-- <ul class="list-unstyled mb-0"> -->
          <ul class="list-unstyled mb-0" id="ulImgs" :style="ulStyle">
            <li v-for="(item,i) of pic" :key="i" class="float-left p-1" @mouseover="changei(i)">
              <img :src="item.src">
            </li>
          </ul>
        </div>
        <img src="img/product_detail/hover-next.png" class="btn float-right btn-light border-0 p-1 pt-4 pb-4" :class="{disabled:rightDisabled}" id="btnRight" @click="move(+1)">
      </div>
    </div>
  </div>

      
</template>
<script>
import { setTimeout } from 'timers';
export default {
  data(){
    return {
      pic:[
        {src:require("../../public/img/n2.png")},
        {src:require("../../public/img/n3.png")},
        {src:require("../../public/img/n4.png")},
        {src:require("../../public/img/n6.png")},
        {src:require("../../public/img/n8.png")}
      ],
      pics:[//防止首次加载时pics[0].md报错
        {src:require("../../public/img/n2.png")},
        {src:require("../../public/img/n3.png")},
        {src:require("../../public/img/n4.png")},
        {src:require("../../public/img/n6.png")},
        {src:require("../../public/img/n8.png")}
        ],
      specs:[],
      i:0,//记录当前正在显示第几张图片
      ulStyle:{
        width:0,
        "margin-left":0,
        transition:""
      },
      times:0,
      maskShow:false
    }
  },
  computed:{
    leftDisabled(){
      return this.times==0;
    },
    rightDisabled(){
      return this.pics.length<=4||this.times==this.pics.length-4
    }
  },

  // load(){
  //   if(this.lid){
  //     //在发送请求之前就清除transition
  //     this.ulStyle.transition="";
  //     this.axios.get(
  //       "http://localhost:5050/details",
  //       {
  //         params:{
  //           lid:this.lid
  //         }
  //       }
  //     ).then(result=>{
  //       console.log(result.data);
  //       var {product, pics, specs}=result.data;
  //       console.log(product);
  //       console.log(pics);
  //       console.log(specs);
  //       this.product=product;
  //       this.pics=pics;
  //       this.specs=specs;
  //       this.times=0;
  //       this.i=0;
  //       setTimeout(()=>{
  //         this.ulStyle.transition="margin-left .5s linear"
  //       },100)
  //     })
  //   }
  //   },
  watch:{
    times(){
      this.ulStyle["margin-left"]=-this.times*62+"px";
    },
    pics(){
      this.ulStyle.width=this.pics.length*62+"px"
    },
  },
  methods:{
    move(i){
      if((i==-1&&this.leftDisabled==false)||(i==1&&this.rightDisabled==false)){
        this.times+=i;
        if(this.times<0){this.times=0}
        else if
        (this.times>this.pics.length-4){
          this.times=this.pics.length-4
        }
      }
    },
    //当鼠标进入每个li时，修改data中i变量的值，为当前li的下标。
    changei(i){
      this.i=i;
      //data中i改变，导致中图片的src和大图片的background-image自动同时变化。
    }
  }
}
</script>
<style>
@import url("../assets/css/details.css");
.list-unstyled{
  display: flex;
}
</style>
