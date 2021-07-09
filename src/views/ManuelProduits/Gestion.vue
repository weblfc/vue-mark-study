<template>
  <div class="contenu">
    <!-- <div style="margin-bottom: 16px">
      showLine: <a-switch v-model="showLine" />
      <br />
      <br />
      showIcon: <a-switch v-model="showIcon" />
    </div> -->
    <div class="Arbreleft">
      <span style="margin-left: 10px; margin-top: 10px">产品分类</span>
      <a-tree
        :showLine="showLine"
        :showIcon="showIcon"
        :defaultExpandedKeys="['0-0-0', '0-0-1', '0-0-2']"
        :defaultExpandAll="ExpandAll"
        @select="onSelect"
        :treeData="treeData"
      >
      </a-tree>
    </div>
    <div class="Contenuright">
      <Sctop></Sctop>
      <div class="Contenuright-table">
        <table></table>
        <table class="Contenuright-table-item" cellpadding="10">
          <tr>
            <td class="bgcolor">产品品牌：</td>
            <td>
              <a-cascader
                :options="options"
                expandTrigger="hover"
                placeholder="请选择品牌"
                @change="onChange"
                v-model="value"
              />
            </td>
            <!-- :displayRender="displayRender" -->
            <td class="bgcolor">产品名称：</td>
            <td>
              <a-input-search
                placeholder="请输入产品名称"
                style="width: 200px"
                @search="onSearch"
                v-model="message"
              />
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <div class="tdleft">
                <span>已选条件：</span>
                <div
                  class="btnmargin"
                  v-for="(item, i) of seletebutton1"
                  :key="i"
                  type="primary"
                >
                  {{ item }} <i @click="delectbtns(1)" class="searchd"></i>
                </div>
                <div
                  class="btnmargin"
                  v-for="(item, index) of seletebutton2"
                  :key="'info2' + index"
                  type="primary"
                >
                  {{ item }}<i @click="delectbtns(2)" class="searchd"></i>
                </div>
                <div
                  class="btnmargin"
                  v-for="(item, index) of seletebutton3"
                  :key="'info3' + index"
                  type="primary"
                >
                  {{ item }}<i @click="delectbtns(3)" class="searchd"></i>
                </div>
              </div>
              <div class="tdright">
                <a-button @click="searchbtn" type="primary"
                  ><i class="isearch"></i>查询</a-button
                >
                <a-button @click="delectbtn" type="primary"
                  ><i class="idetele"></i>清除</a-button
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="Luminaire">
        <div>
          <span>{{ searchdata.productName }}</span>
        </div>
        <div class="sear">
          <div
            class="seardata"
            v-for="(item, index) of searchdata"
            :key="index"
            @click="Sauttodm(item)"
          >
            <img class="searimg" :src="item.img" alt="" />
            <!-- <img class="searimg" :src="require(`${item.img}`)" alt=""> -->
            <div>
              {{ item.manualName }}
            </div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Version></Version>
    </div>
  </div>
</template>

<script>
export default {
  name: "gestionManuel",
  data() {
    return {
      showLine: false,
      showIcon: false,
      ExpandAll: true,
      // Tree树形控件
      treeData: [
        {
          key: 1,
          title: "全部分类",
          children: [],
        },
      ],
      // 已选条件
      seletebutton1: [],
      seletebutton2: [],
      seletebutton3: [],
      message: "",
      // 产品品牌
      options: [],
      value: [],
      myMLZL: "", // 名录总类
      myCPZL: "", // 产品总类
      dataAll: "", // 数据字典
      // companyId:""    // 产品品牌
      data: {
        currentPage: 1,
        pageRecord: 10,
      },
      company: "",
      searchdata: "",
      selectinfo: {},
    };
  },
  methods: {
    Sauttodm(item) {
      this.$router.push("/detailsManuel/" + item.id);
    },
    // 树形控件的事件
    onSelect(selectedKeys, info) {
      this.selectinfo.info = info.node._props.title;
      this.seletebutton1.splice(0, 1, info.node._props.title);
      this.seletebutton2.shift();
      this.seletebutton3.shift();
      // 将itemCode添加到data参数
      if (selectedKeys[0] !== undefined) {
        this.data.productCode = selectedKeys[0];
        this.queryapi(selectedKeys[0]);
      }
      let MLZLCPZL = [...this.myMLZL, ...this.myCPZL];
    },

    // 将产品品牌添加到已选条件
    onChange(value) {
      // 将CompanyId添加到data参数
      for (let i = 0; i < this.company.length; i++) {
        if (value[0] == this.company[i].companyName) {
          this.data.companyId = this.company[i].id;
          this.queryapi("", this.company[i].id);
        }
      }
      if (value[0] !== undefined) {
        this.seletebutton2.splice(0, 1, value[0]);
      }
      this.seletebutton1.shift();
      this.seletebutton3.shift();
      this.selectinfo.value = value[0];
    },
    // 输入框移除焦点后如果内容不是空就添加已选条件按钮
    // 输入产品名称后添加到已选条件
    onSearch(value) {
      this.seletebutton1.shift();
      this.seletebutton2.shift();
      if (value !== "") {
        this.seletebutton3.splice(0, 1, value);
      }
      this.data.name = value;
      this.queryapi("", "", value);
    },
    // 点击后删除
    delectbtns(i) {
      if (i == 1) {
        this.seletebutton1.shift();
        delete this.data.productCode;
      }
      if (i == 2) {
        this.seletebutton2.shift();
        delete this.data.companyId;
        this.value = [];
      }
      if (i == 3) {
        this.seletebutton3.shift();
        delete this.data.name;
        this.message = "";
      }
      this.queryapi();
    },
    // 查询结果
    searchbtn() {
      let i = 0;
      do {
        i++;
        if (this.data.productCode != undefined) {
          this.seletebutton1.splice(0, 1, this.selectinfo.info);
        }
        if (this.data.companyId != undefined) {
          this.seletebutton2.splice(0, 1, this.selectinfo.value);
        }
        if (this.data.name != undefined) {
          this.seletebutton3.splice(0, 1, this.data.name);
        }
      } while (i < 1);
      this.queryapi(this.data.productCode, this.data.companyId, this.data.name);
    },
    delectbtn() {
      this.seletebutton1.shift();
      delete this.data.productCode;
      this.seletebutton2.shift();
      delete this.data.companyId;
      this.value = [];
      this.seletebutton3.shift();
      delete this.data.name;
      this.message = "";
      this.queryapi();
    },

    queryapi(productCode, companyId, name) {
      this.axios({
        url: "api/manual/getList",
        method: "post",
        data: {
          currentPage: this.data.currentPage,
          pageRecord: this.data.pageRecord,
          productCode: productCode, //产品分类
          companyId: companyId, //品牌
          name: name, //产品名称
        },
      })
        .then((result) => {
          this.searchdata = result.data.datas.result;
          console.log(this.searchdata)
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },

  created() {
    // 发送请求，获取所有数据字典
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
        this.treeData[0].children = arr1;
      })
      .catch(function (err) {
        console.log(err);
      });

    // 获取产品品牌
    this.axios({
      url: "/api/company/getList",
      method: "post",
      data: {
        // companyId:1
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

    this.searchbtn();
  },
};
</script>

<style scoped>
/* 左边的树形控件 */
.contenu {
  width: 100%;
  height: 100%;
  display: flex;
}
/* 左边树形控件背景 */
.Arbreleft {
  overflow: auto;
  width: 240px;
  height: 100%;
  padding-top: 10px;
  background: #fff;
  padding-bottom: 50px;
}
.Contenuright {
  flex: 1;
  height: 100%;
  /* background:#fff; */
  padding: 0 10px;
  overflow: auto;
}

.Contenuright-table {
  background: #fff;
  width: 100%;
  margin: 0 auto;
  height: 120px;
  padding: 10px 10px;
}
.bgcolor {
  background: #f2f2f2;
  text-align: right;
}

.Contenuright-table-item {
  width: 100%;
  height: 100%;
  padding: 0 10px;
}
/* 表格背景 */
.Contenuright-table table tr td {
  border: 1px solid #dddddd;
}
/* 内容 */
.Luminaire {
  margin: 0 auto;
  width: 100%;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 50px;
}
/* btn样式 */
.btnmargin {
  text-align: center;
  color: #fff;
  border-radius: 4px;
  margin-left: 5px;
  padding: 0 25px 0 5px !important;
  height: 26px !important;
  background: #4e97d9 !important;
  position: relative;
  line-height: 26px;
}
.tdleft {
  float: left;
  display: flex;
}
.tdright {
  float: right;
  margin-right: 10px;
}
/* 已选条件按钮 */
.tdright button {
  background: #4e97d9 !important;
  height: 30px;
  width: 82px;
  border-radius: 4px;
  color: #fff;
  line-height: 26px;
  border: 1px solid #4e97d9;
  position: relative;
  margin-right: 10px;
  text-align: right !important;
}
/* 搜索按钮 */
.isearch {
  display: inline-block;
  position: absolute;
  top: 3px;
  left: 8px;
  width: 22px;
  height: 22px;
  margin-right: 5px;
  padding-top: 10px;
  background-position: center center;
  background-size: 22px 22px;
  background-image: url("../../../public/img/u344.png");
}
/* 删除按钮 */
.idetele {
  display: inline-block;
  position: absolute;
  top: 3px;
  left: 8px;
  width: 22px;
  height: 22px;
  margin-right: 5px;
  padding-top: 10px;
  background-position: center center;
  background-size: 22px 22px;
  background-image: url("../../../public/img/u336.png");
}
.sear {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.seardata {
  width: 370px;
  height: 360px;
  margin-top: 30px;
  overflow: hidden;
}
.seardata div {
  text-align: center;
  margin-top: 10px;
}
.searimg {
  margin: 0 auto;
  width: auto;
  height: 90%;
  max-width: 90%;
  display: block;
}
.searchd {
  cursor: pointer;
  display: inline-block;
  position: absolute;
  top: 7px;
  right: 0px;
  width: 12px;
  height: 12px;
  margin-right: 5px;
  padding-top: 10px;
  background-position: center center;
  background-size: 12px 12px;
  background-image: url("../../../public/img/n3.png");
}
</style>