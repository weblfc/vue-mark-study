<template>
<div class="Contenuright">
  <Sctop>
    <span slot="left">产品列表</span>
    <a-button slot="right" @click="updatabtn" type="primary"><i class="upbtn"></i>入库</a-button>
  </Sctop>
  <div>
    <div class="seartable">
      <table>
        <tr>
          <td>产品分类：</td>
          <td>            
            <a-select
              style="width:200px;height:32px;margin-left:10px;"
              @change="handleChange1"
              :allowClear="allowClear"
              placeholder="请选择分类"
              v-model="placename"
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
            </td>
          <td>产品名称：</td>
          <td>
              <a-cascader
              style="margin-left:10px;"
              :options="nameoptions"
              expandTrigger="hover"
              placeholder="请选择"
              @change="changename"
              v-model="namevalue"
            />
          </td>
        </tr>
        <tr>
          <td>产品序列号：</td>
          <td>
            <a-input-search placeholder="产品序列号" style="width: 200px;margin-left:10px;" @search="onSearch" @blur="seablur()"  v-model="message" />
            </td>
          <td>产品品牌：</td>
          <td>
              <a-cascader
              style="margin-left:10px;"
              :options="options"
              expandTrigger="hover"
              placeholder="请选择"
              @change="onChange"
              v-model="value"
            />
          </td>
        </tr>
        <tr>
          <td>生产日期：</td>
          <td colspan="3">
            <a-radio-group style="margin-left:10px;"  @change="radiochange" v-model="radiovalue">
                <a-radio :value="1">本日</a-radio>
                <a-radio :value="2">本周</a-radio>
                <a-radio :value="3">本月</a-radio>
                <a-radio :value="4">自定义</a-radio>
              </a-radio-group>
              <a-range-picker :disabled="isData" @openChange="DatePicker" v-model="timevalue">
                <template slot="dateRender" slot-scope="current">
                  <div class="ant-calendar-date" :style="getCurrentStyle(current)" >
                    {{ current.date() }}
                  </div>
                </template>
              </a-range-picker>
          </td>
        </tr>
        <tr>
          <td colspan="4" style="background:#fff">
            <div class="tdleft">
            <span>已选条件：</span>
              <div class="btnmargin"  v-for="(item) of seletebutton1" :key="item" type="primary">{{item}}<i @click="delectbtns(1)" class="searchd"></i> </div>
              <div class="btnmargin"  v-for="(item) of seletebutton2" :key="item" type="primary">{{item}}<i @click="delectbtns(2)" class="searchd"></i></div>
              <div class="btnmargin"  v-for="(item) of seletebutton3" :key="item" type="primary">{{item}}<i @click="delectbtns(3)" class="searchd"></i></div>
              <div class="btnmargin"  v-for="(item) of seletebutton4" :key="item" type="primary">{{item}}<i @click="delectbtns(4)" class="searchd"></i></div>
              <div class="btnmargin"  v-for="(item) of seletebutton5" :key="item" type="primary">{{item}}<i @click="delectbtns(5)" class="searchd"></i></div>
          </div>
          <div class="tdright">
             <a-button @click="searchbtn" type="primary"><i class="isearch"></i>查询</a-button>
             <a-button @click="delectbtn" type="primary"><i class="idetele"></i>清除</a-button>
          </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="Principaux">
      <Tablep :searchdata="searchdata"></Tablep>
      <div class="pagination">
          <a-pagination @change="pagetable" :defaultCurrent="searchdata.currentPage" :total="searchdata.recordCount" :defaultPageSize="searchdata.pageRecord" />
      </div>
    </div>
  </div>
  <div>
  <Version></Version>
</div>
</div>
</template>

<script>

import Tablep from "../../components/Tablep"

export default {
  components: {
    Tablep
  },
  data(){
    return {
      selectdata:'',
      allowClear: true,
      message:'',
      productAll: {},
      searchdata:'',
      options: [],
      nameoptions: [],
      value:[],
      namevalue:[],
      placename:[],
      seletebutton1:[],   
      seletebutton2:[],
      seletebutton3:[],
      seletebutton4:[],
      seletebutton5:[],
      data:{
        currentPage:1,
        pageRecord:10
    },
    dataAll: "",
    radiovalue:0,
    isData:true,
    myDate:'',
    timevalue:[],
    status:''
    }
  },
  methods: {
    queryapi(productCode,name,serialNumber,companyName,startTime,endTime){
      this.axios({
        url:"api/product/getList",
        method:"post",
        data:{
          	"currentPage":this.data.currentPage,
            "pageRecord":this.data.pageRecord,
            "productCode": productCode,    //产品分类
            "name":name,                   //产品名称
            "serialNumber": serialNumber,  //序列号
            "companyId": companyName,      //品牌
            "startTime": startTime,       //开始时间
            "endTime":endTime             //结束时间
        },
      }).then(result=>{

        this.searchdata=result.data.datas
      }).catch (function(err) {
        console.log(err)
        }
      )
    },
    pagetable(page){
      this.data.currentPage=page
      this.queryapi()
    },
    searchbtn(){
      // console.log(this.timevalue[0]._d)
      let i=0
      do{
        i++
        if(this.data.productCode!=undefined){this.seletebutton1.splice(0,1,this.data.pproductName)}
        if(this.data.name!=undefined){this.seletebutton2.splice(0,1,this.data.name)}
        if(this.data.serialNumber!=undefined){this.seletebutton3.splice(0,1,this.data.serialNumber)}
        if(this.data.companyId!=undefined){this.seletebutton4.splice(0,1,this.value[0])}
        if(this.data.startTime!=undefined){this.seletebutton5.splice(0,1,this.myDate)}
      }while(i<1)
      console.log(this.myDate)
      this.queryapi(this.data.productCode,this.data.name,this.data.serialNumber,this.data.companyId,this.data.startTime,this.data.endTime)
    },
    delectbtn(){
      console.log(this.data)
        this.seletebutton1.shift()
        this.seletebutton2.shift()
        this.seletebutton3.shift()
        this.seletebutton4.shift()
        this.seletebutton5.shift()
        delete this.data.productCode
        delete this.data.name
        delete this.data.serialNumber
        delete this.data.companyId
        delete this.data.endTime
        this.placename=[]
        this.namevalue=[]
        this.message=''
        this.value=[]
        this.message=''
        this.queryapi()
    },
    // 分类框
    handleChange1(value) {
      for (let i = 0; i < this.selectdata.length; i++) {
        for (let j = 0; j < this.selectdata[i].children.length; j++) {
          if (value == this.selectdata[i].children[j].title) {
            this.productAll.productCode = this.selectdata[i].children[j].key;
            this.productAll.pproductCode = this.selectdata[i].children[j].key.substring(0, 2);
            if (this.productAll.pproductCode == this.selectdata[i].key) {
              this.productAll.pproductName = this.selectdata[i].title;
            }
          }
        }
      }
      this.productAll.productName=value
      this.seletebutton1.splice(0,1,value)
      this.seletebutton2.shift()
      this.seletebutton3.shift()
      this.seletebutton4.shift()
      this.seletebutton5.shift()
      this.data.productCode=this.productAll.productCode
      this.queryapi(this.data.productCode)
      this.data.pproductName=value
    },
    // 搜索框
    onSearch(value){
      if(value!==''){
        this.seletebutton3.splice(0,1,value)
        this.seletebutton1.shift()
        this.seletebutton2.shift()
        this.seletebutton4.shift()
        this.seletebutton5.shift()
        this.queryapi("","",value)
        this.data.serialNumber=value
      }
    },
    seablur(value){
      if(this.message!==''){
        this.seletebutton3.splice(0,1,this.message)
        this.seletebutton1.shift()
        this.seletebutton2.shift()
        this.seletebutton4.shift()
        this.seletebutton5.shift()
        this.queryapi("","",this.message)
        this.data.serialNumber=this.message
      }
    },
    radiochange(){
      var now = new Date(); // 当前日期
      var nowDayOfWeek = now.getDay(); // 今天本周的第几天
      var nowDay = now.getDate(); // 当前日
      var nowMonth = now.getMonth(); // 当前月
      var nowYear = now.getYear(); // 当前年
      nowYear += (nowYear < 2000) ? 1900 : 0;
      var DateUtil = {
        /**
         * 获得当前日期
         * @returns
         */
        getNowDay : function() {
          return this.formatDate(new Date());
        },
        /**
        * 获得本周的开始时间
        * 
        * @returns
        */
        getStartDayOfWeek : function() {
          var day = nowDayOfWeek || 7;
          return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1 - day));
        },
        /**
        * 获得本周的结束时间
        * 
        * @returns
        */
        getEndDayOfWeek : function() {
          var day = nowDayOfWeek || 7;
          return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 7 - day));
        },
        /**
        * 获得本月的开始时间
        * 
        * @returns
        */
        getStartDayOfMonth : function() {
          var monthStartDate = new Date(nowYear, nowMonth, 1);
          return this.formatDate(monthStartDate);
        },
        /**
        * 获得本月的结束时间
        * 
        * @returns
        */
        getEndDayOfMonth : function() {
          var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays());
          return this.formatDate(monthEndDate);
        },
        /**
        * 获得本月天数
        * 
        * @returns
        */
        getMonthDays : function() {
          var monthStartDate = new Date(nowYear, nowMonth, 1);
          var monthEndDate = new Date(nowYear, nowMonth + 1, 1);
          var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
          return days;
        },
        /**
        * @param 日期格式化
        * @returns {String}
        */
        formatDate : function(date) {
          var myyear = date.getFullYear();
          var mymonth = date.getMonth() + 1;
          var myweekday = date.getDate();
      
          if (mymonth < 10) {
            mymonth = "0" + mymonth;
          }
          if (myweekday < 10) {
            myweekday = "0" + myweekday;
          }
          return (myyear + "-" + mymonth + "-" + myweekday);
        }
};
      let myDate={}
      myDate.Present=DateUtil.getNowDay()           //当前日期
      myDate.startSemaine=DateUtil.getStartDayOfWeek()   //本周开始
      myDate.endSemaine=DateUtil.getEndDayOfWeek()     //本周结束
      myDate.startMonth=DateUtil.getStartDayOfMonth()  //本月开始
      myDate.endMonth=DateUtil.getEndDayOfMonth()    //本月结束

      console.log("今天",myDate.Present)
      console.log("本周开始",myDate.startSemaine)
      console.log("本周结束",myDate.endSemaine)
      console.log("本月开始",myDate.startMonth)
      console.log("本月结束",myDate.endMonth)
      

      if(this.radiovalue==1){
        this.data.startTime=myDate.Present
        this.data.endTime=myDate.Present
        this.seletebutton5.splice(0,1,"生产日期：本日")
        this.myDate=this.seletebutton5[0]
        this.queryapi('','','','',myDate.Present,myDate.Present)
        this.isData=true
      }
      if(this.radiovalue==2){
        this.data.startTime=myDate.startSemaine
        this.data.endTime=myDate.endSemaine
        this.seletebutton5.splice(0,1,"生产日期：本周")
        this.myDate=this.seletebutton5[0]
        this.queryapi('','','','',myDate.startSemaine,myDate.endSemaine)
        this.isData=true
      }
      if(this.radiovalue==3){
        this.data.startTime=myDate.startMonth
        this.data.endTime=myDate.endMonth
        this.seletebutton5.splice(0,1,"生产日期：本月")
        this.myDate=this.seletebutton5[0]
        this.queryapi('','','','',myDate.startMonth,myDate.endMonth)
        this.isData=true
      }
      if(this.radiovalue==4){
        this.isData=false
          if(this.timevalue.length!==0){
            let d=new Date(this.timevalue[0]._d)
            let datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
            datetime = datetime.split(" ")[0]
            let d2=new Date(this.timevalue[1]._d)
            let datetime2=d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate() + ' ' + d2.getHours() + ':' + d2.getMinutes() + ':' + d2.getSeconds()
            datetime2 = datetime2.split(" ")[0]
            this.seletebutton5.splice(0,1,`生产日期：${datetime}-${datetime2}`)
            this.myDate=this.seletebutton5[0]
            this.queryapi('','','','',datetime,datetime2)
          }
      }
        this.seletebutton1.shift()
        this.seletebutton2.shift()
        this.seletebutton3.shift()
        this.seletebutton4.shift()
    },
    //时间日期
    DatePicker(status){
      this.status=status
        this.radiovalue=0
        this.radiochange()
        this.radiovalue=4
        this.radiochange()
    },
    // 入库
    updatabtn(){
      this.$router.push('/Entreposage')
    },
        // 点击后删除
    delectbtns(i){
      if(i==1){
        this.seletebutton1.shift()
        delete this.data.productCode
        this.placename=[]
      }
      if(i==2){
        this.seletebutton2.shift()
        delete this.data.name
        this.namevalue=[]
      }
      if(i==3){
        this.seletebutton3.shift()
        delete this.data.serialNumber
        this.message=''
      }
      if(i==4){
        this.seletebutton4.shift()
        delete this.data.companyId
        this.value=[]
      }
      if(i==5){
        this.seletebutton5.shift()
        delete this.data.startTime
        delete this.data.endTime
        this.radiovalue=0
      }
      this.queryapi()
    },
    onChange(value){
    // 将CompanyId添加到data参数
    for(let i=0;i<this.company.length;i++){
      if(value[0]==this.company[i].companyName){
        this.data.companyId=this.company[i].id
      }
    }
      if(value[0]!==undefined){
        this.seletebutton4.splice(0,1,value[0])
      }
      this.seletebutton1.shift()
      this.seletebutton2.shift()
      this.seletebutton3.shift()
      this.seletebutton5.shift()
      // if(value[0]==undefined){
      //   this.seletebutton2.shift()
      this.queryapi("","","",this.data.companyId)
      // }


    },
    changename(value){
      this.seletebutton2.splice(0,1,value[0])
      this.seletebutton1.shift()
      this.seletebutton3.shift()
      this.seletebutton4.shift()
      this.seletebutton5.shift()
      console.log(value[0])
      this.queryapi("",value[0])
      this.data.name=value[0]

    },
    getCurrentStyle(current, today) {
      const style = {};
      if (current.date() === 1) {
        style.border = '1px solid #1890ff';
        style.borderRadius = '50%';
      }
      return style;
    },
  },
  created(){
    this.queryapi()
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
      .catch(function(err) {
        console.log(err);
      });
    this.axios({
      url:"/api/company/getList",
      method:"post",
      data:{
        // companyId:1
      }
    }).then(result=>{
      this.company=result.data.datas
      // 循环遍历，获得产品名称
      let arr=result.data.datas
      for(let i=0;i<arr.length;i++){
        let obj={}
        obj.value=arr[i].companyName
        obj.label=arr[i].companyName
      this.options.push(obj)
      }
    }).catch(err=>{
      console.log(err)
    })
    this.axios({
      url:"/api/manual/getList",
      method:"post",
      data:{
        // companyId:1
      }
    }).then(result=>{
      // 循环遍历，获得产品名称
      let arr=result.data.datas
      for(let i=0;i<arr.length;i++){
        let obj={}
        obj.value=arr[i].manualSerie+` `+arr[i].manualName
        obj.label=arr[i].manualSerie+` `+arr[i].manualName
      this.nameoptions.push(obj)
      }
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.seartable{
  background:#fff;
  margin:0 20px;
}
.seartable table{
  width:100%;
}
.seartable table tr td {
  border: 1px solid #dddddd;
  height: 40px;
  vertical-align: auto;
}
.seartable table tr td:first-child,.seartable table tr td:nth-child(3){
  background:#f2f2f2;
  width:15%px;
  text-align: right;
}
.seartable table tr td:nth-child(2),.seartable table tr td:nth-child(4){
  width:35%;
  margin-left:10px;
}
.upbtn{
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
  background-image: url("../../../public/img/u262.png");
}
.tdleft{
  float: left;
  display: flex;
}
.tdleft{
  margin-top:5px;
  margin-left:10px;
}
.tdright{
  float: right;
  margin-right:10px
}
/* 已选条件按钮 */
.tdright button{
  background:#4e97d9!important;
  height: 30px;
  width:82px;
  border-radius: 4px;
  color:#fff;
  line-height: 26px;
  border:1px solid #4e97d9;
  position: relative;
  margin-right:10px;
  text-align: right!important;
}
/* 搜索按钮 */
.isearch{
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
  background-image: url("../../../public/img/u344.png");
}
/* 删除按钮 */
.idetele{
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
  background-image: url("../../../public/img/u336.png");
}
.Principaux{
  position: relative;
  background:#fff;
  margin:0 20px;
  margin-top:10px;
  margin-bottom: 20px;
}
.Contenuright{
  height: 100%;
  overflow: auto;
}
.btnmargin{
  text-align: center;
  color:#fff;
  border-radius: 4px;
  margin-left:5px;
  padding:0 25px 0 5px!important;
  height: 26px!important;
  background:#4e97d9!important;
  position: relative;
  line-height: 26px;
}
.searchd{
  cursor:pointer;
  display: inline-block;
  position: absolute;
  top:7px;
  right:0px;
  width:12px;
  height: 12px;
  margin-right:5px;
  padding-top:10px;
  background-position:center center;
  background-size:12px 12px;
  background-image: url("../../../public/img/n3.png");
}
.pagination{
  position: absolute;
  bottom: 20px;
  right: 20px;;
}
</style>