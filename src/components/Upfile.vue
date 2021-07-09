<template>
<div>
  <table>
    <th colspan="3">  
      <div>
      <a-upload
        name="file"
        :multiple="true"
        action="/api/content/upload"
        :headers="headers"
        @change="handleChange"
        :showUploadList="showUploadList"
      >
        <a-button  @click="btnAdd1()"> <a-icon type="upload" /> 上传 </a-button>
      </a-upload>
      </div>
  </th>
    <tr>
      <td>序号</td>
      <td>文件名</td>
      <td>操作</td>
    </tr>
    <tr v-for="(item,index) of list" :key="index">
      <td>{{index+1}}</td>
      <td>{{item}}</td>
      <td class="btnhover" @click="btnremove1(index)"><a-icon type="close" />删除</td>
    </tr>
  </table>
</div>
</template>
<script>
export default {
  data() {
    return {
      headers: {
        authorization: 'authorization-text',
      },
      showUploadList:false,
      file:''
    };
  },
  props: {
    data: {
        type: String,
        default: 'aaaaaaaa',
        required: true
      },
    list: {
        type: Array,
        default() {
          return []
        }
      },
  },
  methods: {
    btnremove1(index) {
      this.list.splice(index,1)
    },

    handleChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        if(info.file.response.rlt==0){
          this.list.push(info.file.response.datas.fullName)
        }
        this.file=info.file
        this.$emit('item-click', this.file)
        this.$message.success(`您的文件：${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        this.$message.error(`您的文件：${info.file.name} 上传失败`);
      }
    },
        btnAdd1() {
      
    },
  },
  created(){
  //   this.axios({
  //       url: "api/manual/getInfo/" + this.data,
  //       method: "get",
  //     })
  //       .then((result) => {
  //         this.productAll = result.data.datas;
  //         let contentType=result.data.datas.contentList;
  //         contentType.forEach(ele=>{
  //           if(ele.contentType==1){
  //             this.list.push(ele.fullName)
  //             console.log(ele)
  //           }
  //         })
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  }
};
</script>
<style scoped>
table{
  width: 99%;
}
  th div{
    float:right;
    margin:5px;
  }
table th {
  background: #e4eaec;
  height: 40px;
  border: 1px solid #dddddd;
}
table tr td{
  border: 1px solid #dddddd;
  text-align: center;
  height: 40px;
  vertical-align: auto;
}
.btnhover:hover{
  color:red;
}
</style>