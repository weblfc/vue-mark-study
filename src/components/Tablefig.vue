<template>
  <div>
    <div class="tablestyle">
    <table>
  <th colspan="5">
    <span>技术参数</span>
    <div @click="addconfig1">添加</div>
  </th>
  <tr>
    <td>序号</td>
    <td>参数名称</td>
    <td>参数内容</td>
    <td>操作</td>
  </tr>
  <tr v-for="(item,index) of configList" :key="index">
    <td>
      <input class="removestyle" style="height:26px;width:80%;" type="text" v-model="item.name" />
    </td>
    <td class="addconfig_item">
      <div class="btn_item" v-for="(item,index1) of item.configvalueList" :key="index1">
        <div style="height:26px;padding-right:30px;max:80px;min:30px;" contenteditable="true" v-html="item.value" @blur="item.value=$event.target.innerText"></div>
        <div class="btn_img1">
          <!-- 按钮xx删除 -->
          <i class="deletebtn" @click="btndelete1(index,index1)"></i>
        </div>
        <div class="btn_img2"></div>
      </div>
      <!-- 添加按钮 -->
      <div @click="btnAdd1(index)">
        <i></i>
      </div>
    </td>
    <td>
      <a-checkbox v-model="item.isMulti" @change="onChange(item)"></a-checkbox>
    </td>
    <!-- 删除 -->
    <td class="btnhover" @click="btnremove1(index)"><a-icon type="close" />删除</td>
  </tr>
</table>
  </div>
  </div>
</template>

<script>

export default {
  props: {
      configList: {
        type: Array,
        default() {
          return []
        }
      }
    },
  data(){
    return {
    }
  },
  methods:{
    btnAdd1(index) {
      this.configList[index].configvalueList.push({})
    },
    addconfig1() {
      this.configList.push({name:'',configvalueList:[]})
    },
    btndelete1(index, index1) {
      this.configList[index].configvalueList.splice(index1,1)
    },
    btnremove1(index) {
      this.configList.splice(index,1)
    },
  }
}
</script>

<style scoped>
.tablestyle {
  width: 100%;
  padding: 0 10px;
  position: relative;
}
.tablestyle table {
  background: #fff;
  width: 100%;
}
/* td的样式 */
.tablestyle table tr td {
  border: 1px solid #dddddd;
  text-align: center;
  height: 40px;
  vertical-align: auto;
}
.tablestyle table tr td:first-child {
  width: 10%;
}
.tablestyle table tr td:nth-child(2) {
  width: 50%;
}
.tablestyle table tr td:nth-child(3) {
  width: 8%;
}
.tablestyle table tr td:nth-child(4) {
  width: 22%;
}
/* 第一行 */
.tablestyle table th {
  background: #e4eaec;
  height: 40px;
  border: 1px solid #dddddd;
}
/* 产品配置 */
.tablestyle table th span {
  margin-top: 5px;
  display: inline-block;
  text-align: center;
  margin-left: 20px;
  line-height: 40px;
  /* vertical-align:auto */
}
/* 添加按钮 */
.tablestyle table th div {
  width: 80px;
  height: 30px;
  background: #fff;
  text-align: center;
  line-height: 30px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 5px;
  float: right;
}
.removestyle {
  outline: none;
  border: 0;
  text-align: center;
}
.addconfig_item > div {
  float: left;
  border: 1px solid #4e97d9;
  border-radius: 5px;
  margin-left: 8px;
  padding: 2px 8px;
}
.addconfig_item > div:last-child {
  width: 60px;
  float: left;
  border: 1px dashed #a1a1a1;
  border-radius: 5px;
  margin-left: 8px;
  padding: 2px 8px;
}
.addconfig_item > div:last-child > i {
  float: right;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  padding-top: 10px;
  background-position: center center;
  background-size: 22px 22px;
  background-image: url("../../public/img/add1.png");
}
.btn_item {
  position: relative;
  height: 32px;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 28px;
  line-height: 25px;
}
/* 去除input样式 */
.btn_item input,
.inputtype input {
  height: 28px;
  width: 80px;
  background: none;
  outline: none;
  border: 1px solid #fff;
}
.inputtype input {
  width: 50px;
  height: 22px;
}
input:focus {
  border: none;
}
.btn_item:not(:last-child) {
  border: solid 2px #4e97d9;
}
.btn_img1 {
  position: absolute;
  right: 4px;
  top: 0;
  width: 0;
  height: 0;
  border-bottom: 30px solid #4e97d9;
  border-left: 30px solid transparent;
}
.btn_img2 {
  position: absolute;
  display: block;
  width: 4px;
  height: 30px;
  right: 0px;
  top: 0px;
  border-radius: 0 10px 24px 0;
  background: #4e97d9;
  /* transform:translateX(20px) skew(45deg) */
}
.deletebtn1 {
  display: inline-block;
  position: absolute;
  top: 13px;
  left: -19px;
  width: 17px;
  height: 17px;
  margin-right: 5px;
  padding-top: 10px;
  background-position: center center;
  background-size: 17px 17px;
  background-image: url("../../public/img/u76.png");
}
.btn_style {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  overflow: hidden;
  margin-left: 12px;
}
.deletebtn {
  display: inline-block;
  position: absolute;
  top: 13px;
  left: -19px;
  width: 17px;
  height: 17px;
  margin-right: 5px;
  padding-top: 10px;
  background-position: center center;
  background-size: 17px 17px;
  background-image: url("../../public/img/u81.png");
}
.deletebtn1 {
  display: inline-block;
  position: absolute;
  top: 13px;
  left: -19px;
  width: 17px;
  height: 17px;
  margin-right: 5px;
  padding-top: 10px;
  background-position: center center;
  background-size: 17px 17px;
  background-image: url("../../public/img/u76.png");
}
.deletebtn:hover {
  display: inline-block;
  position: absolute;
  top: 13px;
  left: -19px;
  width: 17px;
  height: 17px;
  margin-right: 5px;
  padding-top: 10px;
  background-position: center center;
  background-size: 17px 17px;
  background-image: url("../../public/img/u207.png");
}
.btnhover:hover{
  color:red;
}
</style>