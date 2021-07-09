<template>
  <div class="top">
    <div>
      <Sctop>
        <span slot="left">新增手册</span>
        <div slot="right"></div>
      </Sctop>
    </div>
    <div class="Contenu">
      <div class="Contenuitem">
        <div class="topinput">
          <div>
            <span class="colorred">*</span>
            <span>产品分类：</span>
            <a-select
              style="width: 480px; height: 32px"
              @change="handleChange1"
              :allowClear="allowClear"
              placeholder="请选择分类"
            >
              <a-select-opt-group
                v-for="(item, index) of selectdata"
                :key="index"
              >
                <span slot="label">{{ item.title }}</span>
                <a-select-option
                  v-model="item.title"
                  v-for="(item, index) of item.children"
                  :key="index"
                  >{{ item.title }}</a-select-option
                >
              </a-select-opt-group>
            </a-select>
          </div>
          <div>
            <span class="colorred">*</span>
            <span>产品品牌：</span>
            <a-cascader
              :options="options"
              expandTrigger="hover"
              placeholder="请选择品牌"
              style="width: 480px"
              @change="companyId"
            />
          </div>
          <div>
            <span class="colorred">*</span>
            <span>产品名称：</span>
            <a-input
              v-model="productAll.manualSerie"
              style="width: 150px; height: 32px; margin-right: 10px"
              placeholder="请输入产品系列"
            />
            <i class="iconinput"></i>
            <a-input
              v-model="productAll.manualName"
              style="width: 300px; height: 32px; margin-left: 10px"
              placeholder="请输入产品名称"
            />
          </div>
          <div class="typebtn">
            <div>
              <span>产品型号：</span>
            </div>
            <div
              class="btn_style"
              v-for="(item, index) of modelList"
              :key="index"
            >
              <div class="btn_item">
                <div>{{ item.modelName }}</div>

                <div class="btn_img1">
                  <!-- 点击时产品型号的画笔 -->
                  <i class="deletebtn1" @click="typeEdit(item, index)"></i>
                </div>
                <div class="btn_img2"></div>
              </div>
            </div>
            <div class="btn_style" @click="typeAdd">
              <div class="btn_item">
                <i class="addbtn"></i>
              </div>
            </div>
          </div>
        </div>
        <tableAdd :configList="configList"></tableAdd>
        <div v-show="isShow" class="addtype">
          <div class="addtop">
            <span>添加型号</span>
            <div class="iFermer" @click="shows">
              <i></i>
            </div>
          </div>
          <div>
            <div class="ptype">
              <span style="color: red">*</span>
              <span>产品型号：</span>
              <a-input
                style="width: 300px"
                placeholder="产品型号"
                v-model="currentHandleModel.modelName"
              />
            </div>
            <div class="addtable">
              <table>
                <th colspan="5">
                  <span>产品配置</span>
                  <div class="buttonright" @click="addconfig"><i></i> 添加</div>
                </th>
                <tr class="tdtype">
                  <td>配置名称</td>
                  <td>配置参数</td>
                  <td>多选</td>
                  <td>默认值</td>
                  <td>操作</td>
                </tr>
                <tr
                  class="tdtype"
                  v-for="(item, index) of currentHandleModel.configList"
                  :key="index"
                >
                  <td>
                    <!-- 配置名称 -->
                    <input
                      class="removestyle"
                      style="height: 26px; width: 80%"
                      type="text"
                      v-model="item.name"
                    />
                  </td>
                  <td class="addconfig_item">
                    <div
                      class="btn_item"
                      v-for="(item, index1) of item.configvalueList"
                      :key="index1"
                    >
                      <!-- <input style="height:26px;" type="text" v-model="item.value" /> -->
                      <div
                        style="
                          height: 26px;
                          padding-right: 30px;
                          max: 80px;
                          min: 30px;
                        "
                        contenteditable="true"
                        v-html="item.value"
                        @blur="item.value = $event.target.innerText"
                      ></div>

                      <div class="btn_img1">
                        <!-- 删除配置参数内的按钮 -->
                        <i
                          class="deletebtn"
                          @click="btndelete(index, index1)"
                        ></i>
                      </div>
                      <div class="btn_img2"></div>
                    </div>
                    <!-- 添加配置参数的按钮 -->
                    <div @click="btnAdd(index)">
                      <i></i>
                    </div>
                  </td>
                  <td>
                    <a-checkbox v-model="item.isMulti"></a-checkbox>
                  </td>
                  <td></td>
                  <!-- 删除行 -->
                  <td class="btnhover" @click="btnremove(index)">
                    <a-icon type="close" />删除
                  </td>
                </tr>
              </table>

              <div class="addfoot">
                <div @click="saveModel()"><i></i> 保存</div>
                <div @click="Annuler"><i></i> 取消</div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex">
          <span style="margin: 20px 0 0 10px">产品图片：</span>
          <div class="clearfix">
            <a-upload
              action="/api/content/upload"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">上传</div>
              </div>
            </a-upload>
            <a-modal
              :visible="previewVisible"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </div>
        <div class="tabpane">
          <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="产品介绍" key="1">
              <div>
                <div style="height: 610px">
                  <quill-editor
                    v-model="content"
                    ref="myQuillEditor"
                    style="height: 500px"
                    :options="editorOption"
                  ></quill-editor>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane tab="技术参数" key="2" forceRender>
              <Tablefig></Tablefig>
            </a-tab-pane>
            <a-tab-pane tab="产品说明书" key="3">
              <Upfile
                :list="list"
                :data="data"
                @item-click="UpfileClick"
              ></Upfile>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="modelsave addfoot">
          <div @click="modelsave"><i></i> 保存</div>
          <div><i></i> 取消</div>
        </div>
      </div>
    </div>
    <div>
      <Version></Version>
    </div>

    <div id="popLayer" v-show="isShow"></div>
  </div>
</template>

<script>
import btn from "../../components/Btn";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import tableAdd from "../../components/Table.vue";
import Tablefig from "../../components/Tablefig.vue";
import Upfile from "../../components/Upfile";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  name: 'ajouter',
  components: {
    btn,
    quillEditor,
    tableAdd,
    Tablefig,
    Upfile,
  },
  data() {
    return {
      productAll: {},
      company: "",

      currentHandleModel: {},
      isEditModel: false,
      currentModelIndex: 0,
      modelList: [],
      configList: [],
      isMulti: false,
      content: null,
      editorOption: {},
      allowClear: true,
      myMLZL: "", // 名录总类
      myCPZL: "", // 产品总类
      dataAll: "", // 数据字典
      selectdata: "",
      options: [
        {
          value: "",
          label: "",
        },
      ],
      isShow: false,
      previewVisible: false,
      previewImage: "",
      //图片数据
      fileList: [],
      data: "",
      filepdf: [],
      list: [],
    };
  },
  methods: {
    UpfileClick(item) {
      console.log(item.response.datas);
      this.filepdf.push(item.response.datas);
      item.response.datas.contentType = 1;
      console.log(this.filepdf);
    },
    modelsave() {
      if (confirm("是否保存")) {
        // 将所有数据保存在productAll中
        this.productAll.configList = this.configList;
        this.productAll.introduction = this.UEContent;
        this.productAll.contentList = [];
        this.productAll.contentList.push(...this.filepdf);
        console.log(this.productAll.contentList);
        if (this.fileList && this.fileList.length) {
          this.fileList.forEach((ele) => {
            let { response } = ele;
            if (response && response.rlt == 0) {
              this.productAll.contentList.push(response.datas);
            }
          });
        }

        // console.log("最终保存的图片", this.productAll.contentList);
        console.log("最终保存", this.productAll);
      }
    },

    callback(key) {
      console.log(key);
    },
    handleChange1(value) {
      for (let i = 0; i < this.selectdata.length; i++) {
        for (let j = 0; j < this.selectdata[i].children.length; j++) {
          if (value == this.selectdata[i].children[j].title) {
            this.productAll.productCode = this.selectdata[i].children[j].key;
            this.productAll.pproductCode = this.selectdata[i].children[
              j
            ].key.substring(0, 2);
            if (this.productAll.pproductCode == this.selectdata[i].key) {
              this.productAll.pproductName = this.selectdata[i].title;
            }
          }
        }
      }
      this.productAll.productName = value;
    },
    companyId(value) {
      this.productAll.companyName = value[0];
      this.company.forEach((ele) => {
        if (ele.companyName == value[0]) {
          this.productAll.companyId = ele.id;
        }
      });
    },
    handleChange2(value) {
      console.log(`selected ${value}`);
    },
    // 弹出层
    // 添加行
    addconfig() {
      this.currentHandleModel.configList.push({
        isMulti: false,
        name: "",
        configvalueList: [],
      });
    },
    // 弹出添加型号框
    shows() {
      this.isShow = false;
    },
    addcf() {
      if (this.isShow == false) {
        this.isShow = true;
      }
    },
    // 填加配置参数
    btnAdd(index) {
      this.currentHandleModel.configList[index].configvalueList.push({});
    },
    // 删除行
    btnremove(index) {
      // this.currentHandleModel.configList[index].configvalueList.splice(index,1)
      this.currentHandleModel.configList.splice(index, 1);
    },
    // 删除行内数据
    btndelete(index, index1) {
      this.currentHandleModel.configList[index].configvalueList.splice(
        index1,
        1
      );
    },

    // 删除产品型号
    // typeremove(index){
    //   this.modelList.splice(index,1)
    // },

    onchange(value) {
      console.log(value);
    },
    // 保存模态框修改的型号配置
    saveModel() {
      if (!this.isEditModel) {
        this.modelList.push(this.currentHandleModel);
      } else {
        this.modelList.splice(
          this.currentModelIndex,
          1,
          this.currentHandleModel
        );
      }
      this.isShow = false;
      this.productAll.modelList = this.modelList;
    },
    // 取消，不做修改
    Annuler() {
      this.isShow = false;
    },
    typeAdd() {
      this.isShow = true;
      this.isEditModel = false;
      this.currentHandleModel = { configList: [] };
    },
    typeEdit(item, index) {
      // 让他显示
      this.isShow = true;
      // 判断是否为空的内容
      this.isEditModel = true;
      this.currentModelIndex = index;
      this.currentHandleModel = JSON.parse(JSON.stringify(item));
    },

    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      fileList = fileList.map((file) => {
        if (file.response && file.response.rlt == 0) {
          let datas = file.response.datas;
          file.url = `/${datas.filePath}/${datas.storeName}`;
        } else {
          file.status = "error";
        }
        return file;
      });
      fileList.forEach((ele) => {
        if (ele.status === "done") {
          ele.response.datas.contentType = 0;
        }
      });
      this.fileList = fileList;

      // this.productAll.contentList=this.fileList
    },
  },

  created() {
    // let data="64fadff153484d848e50663380292aa3"
    // let data = this.$route.query.CatalogId;
    // 请求所有数据字典
    this.axios({
      url: "/api/dictionarydetail/getAll",
      methods: "get",
    })
      .then((result) => {
        // 保存数据
        this.dataAll = result.data.datas;
        this.DM_MLZL = result.data.datas;
        // 创建空数组保存名录种类和产品种类
        this.myMLZL = [];
        this.myCPZL = [];
        // 循环遍历获得名录种类和产品总类
        for (var i = 0; i < this.DM_MLZL.length; i++) {
          if (this.DM_MLZL[i].dictCode === "DM_MLZL") {
            this.myMLZL.push(this.DM_MLZL[i]);
          }
          if (this.DM_MLZL[i].dictCode === "DM_CPZL") {
            this.myCPZL.push(this.DM_MLZL[i]);
          }
        }
        // 创建新的数组，保存树形结构只需要的key和title
        let arr1 = [];
        let arr2 = [];
        for (i = 0; i < this.myMLZL.length; i++) {
          let obj1 = {};
          this.myMLZL[i].itmeCode;
          this.myMLZL[i].itmeName;
          obj1.key = this.myMLZL[i].itemCode;
          obj1.title = this.myMLZL[i].itemName;
          arr1.push(obj1);
        }
        for (i = 0; i < this.myCPZL.length; i++) {
          let obj2 = {};
          this.myCPZL[i].itemCode;
          this.myCPZL[i].itemName;
          obj2.key = this.myCPZL[i].itemCode;
          obj2.title = this.myCPZL[i].itemName;
          arr2.push(obj2);
        }
        // 循环遍历，将产品种类按照格式添加到名录总类
        for (let i = 0; i < arr1.length; i++) {
          arr1[i].children = [];
          let str1 = arr1[i].key + "";
          for (let j = 0; j < arr2.length; j++) {
            let str2 = arr2[j].key + "";
            if (str1 == str2.slice(0, str1.length)) {
              arr1[i].children.push(arr2[j]);
            }
          }
        }
        // this.treeData=arr1
        this.selectdata = arr1;
      })
      .catch(function (err) {
        console.log(err);
      });

    // 获取产品品牌
    this.$http.manuelProduits
      .getCompanyList("/api/company/getList", {
        companyId: 1,
      })
      .then((res) => {
        console.log(res);
      });
    this.axios({
      url: "/api/company/getList",
      method: "post",
      data: {
        companyId: 1,
      },
    })
      .then((result) => {
        this.company = result.data.datas;
        // 循环遍历，获得产品名称
        let arr = result.data.datas;
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].companyName;
          obj.label = arr[i].companyName;
          this.options.push(obj);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
    value(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
.colorred {
  color: red;
}
.Contenu {
  width: 100%;
  padding: 0 10px;
  padding-bottom: 20px;
  height: 95%;
  overflow: auto;
}
.Contenuitem {
  width: 100%;
  /* height: 100%; */
  background: #fff;
}
.top {
  width: 100%;
  height: 90%;
}

.iconinput {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 2px;
  background-position: center center;
  background-size: 10px 10px;
  background-image: url("../../../public/img/n2.png");
}
.aimg {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 2px;
  background-position: center center;
  background-size: 30px 30px;
  background-image: url("../../../public/img/add.png");
}
.topinput {
  width: 100%;
  padding: 10px;
}
.topinput > div {
  margin: 20px 10px;
}
.pimg {
  margin: 20px;
}
.pimg div:first-child {
  float: left;
  margin-right: 10px;
}
.addimg {
  width: 100px;
  height: 100px;
  float: left;
  border: 1px solid #ddd;
  border-radius: 3px;
}
.addimg i,
.addimg span {
  display: block;
  margin: 15px auto;
  text-align: center;
}
.tabpane {
  margin: 10px 10px;
  clear: left;
}
.ant-tabs-tabpane {
  overflow: auto;
}

.typebtn {
  display: flex;
}
.typebtn div:not(:last-child) > div {
  border: solid 2px #4e97d9;
}
/* 按钮的样式 */
.btn_style {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  overflow: hidden;
  margin-left: 12px;
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
.btn_img span {
  position: absolute;
  left: 20px;
  top: 15px;
  color: white;
  transform: skew(45deg) translateY(-40%);
  font-size: 25px;
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
  background-image: url("../../../public/img/u81.png");
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
  background-image: url("../../../public/img/u76.png");
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
  background-image: url("../../../public/img/u207.png");
}

.addbtn {
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-left: 18px;
  margin-top: 2px;
  background-position: center center;
  background-size: 22px 22px;
  background-image: url("../../../public/img/u277.png");
}
.typebtn > div:last-child {
  width: 80px;
  border: 2px dashed #dddddd;
  border-radius: 5px;
}

.addtable {
  width: 100%;
  padding: 0 10px;
  background: #fff;
  margin: 0 auto;
}
.addtable h2 {
  color: red;
}
/* 弹出层table */
.addtable table {
  background: #fff;
  width: 100%;
}
/* 弹出层顶部 */
.addtop {
  background: #4e97d9;
  padding: 10px;
  padding-left: 20px;
  font-size: 18px;
  border-bottom: 1px solid #dddddd;
}
/* 弹出层td */
.addtable table tr td {
  border: 1px solid #dddddd;
  text-align: center;
  height: 42px;
  vertical-align: auto;
}
/* 第一行 */
.addtable table th {
  background: #dddddd;
  height: 42px;
  border: 1px solid #dddddd;
  line-height: 42px;
}
/* 产品配置 */
.addtable table th span {
  padding-left: 20px;
}
/* 操作按钮 */
.buttonright {
  background: #fff;
  float: right;
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin-top: 5px;
  margin-right: 20px;
  border-radius: 5px;
}
/* 保存和删除 */
.addtable > div {
  float: right;
  margin: 20px;
}
.addtable > div > button {
  float: right;
  margin: 5px;
}
/* 弹出窗口 */
.addtype {
  position: fixed;
  border-radius: 5px;
  top: 200px;
  background: #fff;
  width: 80%;
  z-index: 10;
  /* left:10%; */
  /* display: none; */
  border-radius: 3px;
}
/* 背影 */
#popLayer {
  /* display: none; */
  width: 100%;
  height: 100%;
  background: #000000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.5;
}
/* 产品型号 */
.ptype {
  padding: 20px 10px;
}
.tdtype > td:first-child {
  width: 10%;
}
.tdtype > td:nth-child(2) {
  width: 50%;
}
.tdtype > td:nth-child(3) {
  width: 8%;
}
.tdtype > td:nth-child(4) {
  width: 22%;
}
.iFermer {
  float: right;
  width: 22px;
  height: 22px;
  margin-right: 5px;
  padding-top: 10px;
  background-position: center center;
  background-size: 22px 22px;
  background-image: url("../../../public/img/u81.png");
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
  background-image: url("../../../public/img/add1.png");
}
/* 保存取消的样式 */
.addfoot {
  display: flex;
}
.addfoot div {
  width: 80px;
  height: 36px;
  border-radius: 5px;
  line-height: 36px;
  text-align: center;
  padding-left: 20px;
  margin-left: 10px;
  color: #fff;
  position: relative;
  cursor: pointer;
}
.addfoot div:first-child {
  background: #4e97d9;
}
.addfoot div:last-child {
  background: red;
}
.addfoot div:first-child i,
.addfoot div:last-child i {
  display: inline-block;
  position: absolute;
  top: 6px;
  left: 8px;
  width: 22px;
  height: 22px;
  margin-right: 5px;
  padding-top: 10px;
  background-position: center center;
  background-size: 22px 22px;
}
.addfoot div:first-child i {
  background-image: url("../../../public/img/u86.png");
}
.addfoot div:last-child i {
  background-image: url("../../../public/img/u93.png");
}
.buttonright {
  position: relative;
  padding-left: 20px;
}
.buttonright i {
  display: inline-block;
  position: absolute;
  top: 6px;
  left: 8px;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  padding-top: 10px;
  background-position: center center;
  background-size: 20px 20px;
  background-image: url("../../../public/img/u277.png");
}
.removestyle {
  outline: none;
  border: 0;
  text-align: center;
}
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.clearfix {
  display: flex;
  margin: 20px;
  margin-left: 10px;
}
.modelsave {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  padding-top: 0;
}
.modelsave div {
  margin: 8px;
}
.btnhover:hover {
  color: red;
}
.ant-upload-picture-card-wrapper {
  display: flex;
}
</style>
