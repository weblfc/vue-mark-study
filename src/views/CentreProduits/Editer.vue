<template>
  <div>
    <Sctop><span slot="left">手册详情</span> <span slot="right"></span> </Sctop>
    <div class="bgstyle">
      <div class="inputtyle">
        <div class="spanleft">
          <span class="colorred">*</span>
          <span>产品分类：</span>
        </div>
        <a-select
          style="width: 480px;height:32px"
          @change="handleChange1"
          :allowClear="allowClear"
          placeholder="请选择分类"
          v-model="fenlei"
        >
          <a-select-opt-group v-for="(item, index) of selectdata" :key="index">
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
      <div class="inputtyle">
        <div class="spanleft">
          <span class="colorred">*</span>
          <span>产品名称：</span>
        </div>
        <a-cascader
          style="width: 480px;height:32px"
          :options="nameoptions"
          expandTrigger="hover"
          placeholder="请选择"
          @change="changename"
          v-model="namevalue"
        />
      </div>
      <div class="inputtyle">
        <div class="spanleft">
          <span class="colorred">*</span>
          <span>产品序列号：</span>
        </div>
        <a-input
          style="width: 480px;height:32px"
          placeholder="Basic usage"
          v-model="numb"
        />
      </div>
      <div class="inputtyle">
        <div class="spanleft">
          <span>产品日期：</span>
        </div>
        <a-date-picker
          :defaultValue="moment('2020/05/01', dateFormat)"
          v-model="timevalue"
          :format="dateFormat"
        />
      </div>
      <div class="detailstitle">
        <ul>
          <li>
            <span>产品型号：</span>
            <div class="detailstitleitem">
              <div
                style="border:1px solid #dddddd"
                :class="[indexs == index ? 'active' : '']"
                v-for="(item, index) of modelList"
                :key="index"
                @click="pptype(index)"
              >
                {{ item.modelName }}
              </div>
            </div>
          </li>
          <li v-for="(config, index1) of configList" :key="index1">
            <span>{{ config.name }}：</span>
            <div class="detailstitleitem">
              <div
                @click="selectConfigValue(config, configValue)"
                style="border:1px solid #dddddd"
                :class="{ active: configValue['selected'] }"
                v-for="(configValue, index11) of config.configvalueList"
                :key="index11"
              >
                {{ configValue.value }}
              </div>
              <!--:class="[indexs2.indexOf(index1+''+index11) == -1 ? '' : 'active']" -->
            </div>
          </li>

          <li v-for="(config, index2) of d1d1d1" :key="'info2' + index2">
            <span>{{ config.name }}</span>
            <div class="detailstitleitem">
              <div
                @click="selectConfigValue(config, configValue)"
                style="border:1px solid #dddddd"
                :class="{ active: configValue['selected'] }"
                v-for="(configValue, index21) of config.configvalueList"
                :key="index21"
              >
                {{ configValue.value }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="addfoot">
        <div @click="saveModel()"><i></i> 保存</div>
        <div @click="Annuler"><i></i> 取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      fenlei:'',
      namevalue: [],
      allowClear: true,
      selectdata: "",
      modelList: "",
      d1d1d1: "",
      productAll: {},
      nameoptions: [],
      getId: "",
      configList: "",
      indexs: 0,
      numb: "",
      dateFormat: "YYYY/MM/DD",
      timevalue: undefined,
      savetime: "",
      getAll: {
        getmanualId: "",
        modelId: "",
        valueIds: "",
      },
      allValueIds: [],
      


    };
  },
  methods: {
    //选择产品的配置
    selectConfigValue(config, configValue) {
      configValue.selected = !configValue.selected;
      if (!config.isMulti && configValue.selected) {
        config.configvalueList.forEach((ele) => {
          if (ele.id != configValue.id) {
            ele.selected = false;
          }
        });
      }
      config.configvalueList = Object.assign([], config.configvalueList);
    },

    computeSelectedValues(configvalueList) {
      let selectedList = configvalueList.filter((ele) => ele.selected);
      return selectedList.map((ele) => ele.id);
    },

    moment(datsa, dateFormat) {
      if (this.timevalue != undefined) {
        let d = new Date(this.timevalue._d);
        let datetime =
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getDate() +
          " " +
          d.getHours() +
          ":" +
          d.getMinutes() +
          ":" +
          d.getSeconds();
        this.savetime = datetime.split(" ")[0];
      }
    },
    handleChange1(value) {
      this.nameoptions = [];
      this.namevalue = [];
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
      this.querygetList();
      this.queryproductlistapi();
    },
    changename(value) {
      value = value[0].split(" ");
      this.getId.forEach((ele) => {
        if (value[0] == ele.manualSerie && value[1] == ele.manualName) {
          this.querygetinfo(ele.id);
        }
      });
      this.queryproductlistapi(value[0], value[1]);
    },
    Datedp() {},
    pptype(index) {
      this.d1d1d1 = this.modelList[index].configList;
      this.indexs = index;
    },
    //保存
    saveModel() {
      if (confirm("是否保存")) {
        var gonggong = []
        this.configList.forEach(ele=>{
          ele.configvalueList.forEach(element=>{
          if(element.selected==true){
            gonggong.push(element.id)
          }
          })
          
        })
        
        this.d1d1d1.forEach(e=>{
          e.configvalueList.forEach(ele=>{
          if(ele.selected==true){
            gonggong.push(ele.id)
          }
          })
        })
        gonggong= gonggong.join(";")
        this.getAll.valueIds=gonggong
        this.savemodelapi(
          this.getAll.getmanualId,
          this.getAll.modelId,
          this.savetime,
          this.numb,
          this.getAll.valueIds
        );
      }
    },
    Annuler() {},
    // 获取所有列表
    queryproductlistapi(value1, value2) {
      this.axios({
        url: "/api/product/getList",
        method: "post",
        data: {},
      })
        .then((result) => {
          let datas = result.data.datas;
          datas.forEach((ele) => {
            if (ele.name == `${value1} ${value2}`) {
              this.getAll.getmanualId = ele.manualId;
              this.getAll.modelId = ele.modelId;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },


    // 获取共有和私有的配置
    querygetinfo(manualId) {
      this.axios({
        url: "/api/manual/getInfo/" + manualId,
        method: "get",
      })
        .then((result) => {
          this.modelList = result.data.datas.modelList;
          this.d1d1d1 = this.modelList[0].configList;
          this.configList = result.data.datas.configList;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 保存数据
    savemodelapi(manualId, modelId, productDate, serialNumber, valueIds) {
      this.axios({
        url: "/api/product/save",
        method: "post",
        data: {
          manualId: manualId,
          modelId: modelId,
          productDate: productDate,
          serialNumber: serialNumber,
          valueIds: valueIds,
        },
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取数据
    qurerymanualgetInfo(){
      this.ProduitsId= this.$route.params.id
      this.axios({
      url:"/api/manual/getInfo/"+this.ProduitsId,
      method:"get",
      // data:{
      //   id:this.$route.query.productCode
      // }
    }).then(result=>{
      this.details=result.data.datas
    }).then(()=>{
      this.queryproductgetInfo()
    })
    .catch(err=>{
      console.log(err)
    })
  },
  queryproductgetInfo(){
    this.ProduitsIds= this.$route.params.ids
    this.axios({
      url:"/api/product/getInfo/"+this.ProduitsIds,
      method:"get",
    }).then(result=>{
      this.details2=result.data.datas
    }).catch(err=>{
      console.log(err)
    })
  },

    // 获取对应的名称
    querygetList() {
      this.axios({
        url: "/api/manual/getList",
        method: "post",
        data: {
          // companyId:1
        },
      })
        .then((result) => {
          this.getId = result.data.datas;
          // 循环遍历，获得产品名称
          let arr = result.data.datas;
          for (let i = 0; i < arr.length; i++) {
            let obj = {};
            if (this.productAll.productCode == arr[i].productCode) {
              obj.value = arr[i].manualSerie + ` ` + arr[i].manualName;
              obj.label = arr[i].manualSerie + ` ` + arr[i].manualName;
              this.nameoptions.push(obj);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.qurerymanualgetInfo()

    // 获取产品分类
    this.axios({
      url: "/api/dictionarydetail/getAll",
      method: "get",
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
      .catch(function(err) {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.detailstitle {
  padding-top: 30px;
  margin: 10px;
  margin-bottom: 70px;
}
.detailstitle ul li {
  display: flex;
  margin: 15px 0;
}
.detailstitle ul li span {
  width: 100px;
  color: #999999;
  line-height: 32px;
}
.detailstitleitem {
  display: flex;
}
.detailstitleitem div {
  margin-left: 15px;
  border: 1px solid #4e97d9;
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
  border-radius: 4px;
}
.bgstyle {
  background: #fff;
  margin: 0 20px;
  padding: 10px 10px;
  position: relative;
}
/* 保存取消的样式 */
.addfoot {
  position: absolute;
  right: 20px;
  bottom: 20px;
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
.inputtyle {
  display: flex;
  margin-left: 10px;
  margin-top: 30px;
}
.spanleft {
  width: 100px;
  text-align: right;
  line-height: 32px;
  margin-right: 15px;
}
.colorred {
  color: red;
  margin-right: 2px;
}
.active {
  background: #fff !important;
  border: 1px solid rgb(75, 153, 221) !important;
  color: rgb(78, 153, 221);
}
</style>
