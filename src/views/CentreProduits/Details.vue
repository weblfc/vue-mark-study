<template>
  <div class="lph">
    <div class="top">
      <div>
        <Sctop>
          <span slot="left">手册详情</span>
          <a-button slot="right" @click="updatabtn" type="primary"
            ><i class="upbtn"></i>编辑</a-button
          >
        </Sctop>
      </div>
      <div class="Contenu">
        <div class="Contenuitem">
          <div class="pleft">
            <div class="pleftitem1">
              <img :src="'/' + configListimg[i]" alt="" />
            </div>
            <div class="pleftitem2">
              <img
                class="btnleft"
                src="../../../public/img/left.png"
                :class="{ disabled: leftDisabled }"
                @click="move(-1)"
              />
              <div class="dmimg">
                <ul :style="ulStyle">
                  <li
                    v-for="(item, i) of configListimgs"
                    :key="i"
                    @mouseover="changei(i)"
                  >
                    <img :src="'/' + item" />
                  </li>
                </ul>
              </div>
              <img
                class="btnright"
                src="../../../public/img/right.png"
                :class="{ disabled: rightDisabled }"
                @click="move(+1)"
              />
            </div>
          </div>
          <div class="pright">
            <div style="font-size: 26px; padding: 20px; color: #4e97d9">
              <span>{{ details2.serialNumber }}</span>
            </div>
            <ul>
              <li>
                <span class="toptitle">产品分类：</span>
                <span>{{ details.pproductName }}</span> <a-icon type="right" />
                <span>{{ details.productName }}</span>
              </li>
              <li>
                <span class="toptitle">产品品牌：</span>
                <span>{{ details.companyName }}</span>
              </li>
              <li>
                <span class="toptitle">产品日期：</span>
                <span>{{ details2.productDate }}</span>
              </li>
            </ul>
            <div class="detailstitle">
              <ul>
                <li>
                  <span>产品型号：</span>
                  <div class="detailstitleitem">
                    <div
                      style="border: 1px solid #dddddd"
                      :class="[indexs == index ? 'active' : '']"
                      v-for="(item, index) of modelList"
                      :key="index"
                      @click="pptype(index)"
                    >
                      {{ item.modelName }}
                    </div>
                  </div>
                </li>
                <li v-for="(item, index) of configList" :key="index">
                  <span>{{ item.name }}：</span>
                  <div class="detailstitleitem">
                    <div
                      v-for="(item, index) of item.configvalueList"
                      :key="'info1' + index"
                    >
                      {{ item.value }}
                    </div>
                  </div>
                </li>
                <li v-for="(item, index) of d1d1d1" :key="'info2' + index">
                  <span>{{ item.name }}</span>
                  <div class="detailstitleitem">
                    <div
                      v-for="(item, index) of item.configvalueList"
                      :key="'info1' + index"
                    >
                      {{ item.value }}
                    </div>
                  </div>
                </li>
                <!-- <li v-for="(item,index) of list" :key="'info2'+index">
                <span>{{item}}</span>
                <div class="detailstitleitem">
                  <div v-for="(item,index) of item.configvalueList" :key="'info1'+index">{{item.value}}</div>
                </div>
              </li> -->
              </ul>
            </div>
          </div>
        </div>
        <div class="tabpane">
          <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="产品介绍" key="1" v-html="details.introduction">
            </a-tab-pane>
            <a-tab-pane tab="技术参数" key="2" forceRender>
              <table class="tables">
                <tr>
                  <td>序号</td>
                  <td>参数名称</td>
                  <td>参数内容</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
              <p
                style="
                  text-align: center;
                  padding: 30px;
                  font-size: 16px;
                  color: #999999;
                "
              >
                暂无数据
              </p>
            </a-tab-pane>
            <a-tab-pane tab="产品说明书" key="3">
              <p
                style="
                  text-align: center;
                  padding: 30px;
                  font-size: 16px;
                  color: #999999;
                "
              >
                暂无数据
              </p>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div style="height: 100px"></div>
      </div>
      <div>
        <Version></Version>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: "",
      details2: "",
      modelList: "",
      configList: "",
      configListimg: [],
      configListimgs: [],
      d1d1d1: "",
      indexs: 0,
      CatalogId: "",
      i: 0,
      ulStyle: {
        width: 0,
        "margin-left": 0,
        transition: "",
      },
      times: 0,
      list: [],
      ProduitsId: "",
      ProduitsIds: "",
    };
  },
  methods: {
    move(i) {
      if (
        (i == -1 && this.leftDisabled == false) ||
        (i == 1 && this.rightDisabled == false)
      ) {
        this.times += i;
        if (this.times < 0) {
          this.times = 0;
        } else if (this.times > this.configListimg.length - 4) {
          this.times = this.configListimg.length - 4;
        }
      }
    },
    changei(i) {
      this.i = i;
    },
    updatabtn() {
      this.$router.push("/Editer/" + this.ProduitsId + "/" + this.ProduitsIds);
      // this.CatalogId=this.$route.query.CatalogId
      // this.$router.push({
      //   path:'/EditerManuel',
      //   query:{
      //     CatalogId:this.CatalogId
      //   }
      // })
    },
    rightDisabled() {
      return (
        this.configListimg.length <= 4 ||
        this.times == this.configListimg.length - 4
      );
    },
    leftDisabled() {
      return this.times == 0;
    },
    pptype(index) {
      this.d1d1d1 = this.modelList[index].configList;
      this.indexs = index;
    },
    btn() {
      console.log(this.details);
      console.log(this.configListcolor);
      console.log(this.configListAngle);
    },
  },
  activated() {
    // let data="64fadff153484d848e50663380292aa3"
    // 获取路由传递的参数进行请求
    // let data= this.$route.query.CatalogId
    this.ProduitsId = this.$route.params.id;
    this.ProduitsIds = this.$route.params.ids;
    this.axios({
      url: "/api/manual/getInfo/" + this.ProduitsId,
      method: "get",
      // data:{
      //   id:this.$route.query.productCode
      // }
    })
      .then((result) => {
        this.configListimgs = [];
        this.details = result.data.datas;
        this.configList = result.data.datas.configList;
        this.details.contentList.forEach((ele) => {
          if (ele.contentType == 0) {
            this.configListimg.push(ele.filePath + "/" + ele.storeName); //图片
          }
        });
        this.configListimgs = JSON.parse(JSON.stringify(this.configListimg));
        // this.configListimg=result.data.datas.contentList[0].filePath+'/'+result.data.datas.contentList[0].storeName
        this.modelList = result.data.datas.modelList;
        this.d1d1d1 = this.modelList[0].configList;
      })
      .catch((err) => {
        console.log(err);
      });

    this.axios({
      url: "/api/product/getInfo/" + this.ProduitsIds,
      method: "get",
    })
      .then((result) => {
        this.details2 = result.data.datas;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
    times() {
      this.ulStyle["margin-left"] = -this.times * 62 + "px";
    },
    pics() {
      this.ulStyle.width = this.configListimg.length * 62 + "px";
    },
  },
};
</script>

<style scoped>
.Contenu {
  width: 100%;
  height: 100%;
  background: #ffffff;
  margin: 10px 10px;
  padding: 10px 10px;
}
.Contenuitem {
  width: 100%;
  height: 100%;
  display: flex;
}
.top {
  width: 100%;
  padding-right: 20px;
}
.pleft {
  width: 500px;
  height: 620px;
  margin-bottom: 50px;
}

.pleftitem1 {
  width: 500px;
  height: 500px;
  border: 1px solid #dddddd;
  margin-top: 10px;
  overflow: hidden;
}
.pleftitem1 img {
  width: 100%;
}
.pleftitem2 {
  width: 100%;
  height: 100px;
  border: 1px solid #dddddd;
  margin-top: 10px;
  overflow: hidden;
}
.pleftitem2 ul {
  width: 500px;
  display: flex;
  padding: 0;
}
.pleftitem2 ul li {
  width: 100px;
}
.pleftitem2 ul li img {
  width: 100px;
  height: 100px;
}
.pright {
  width: 60%;
  height: 500px;
  flex: 1;
  margin-right: 10px;
}
ul {
  list-style: none;
}
.detailstitle {
  border-top: 1px solid #dddddd;
  margin: 10px;
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
.toptitle {
  width: 100px;
  color: #999999;
  line-height: 32px;
  padding-left: 10px;
}
.tables {
  width: 100%;
}
.tables tr td {
  border: 1px solid #dddddd;
  height: 42px;
  padding-left: 20px;
}
.tables tr td:nth-child(1) {
  width: 150px;
}
.tables tr:nth-child(1) {
  background: rgb(250, 250, 250);
}
.active {
  background: #fff !important;
  border: 1px solid rgb(75, 153, 221) !important;
  color: rgb(78, 153, 221);
}
.upbtn {
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
  background-image: url("../../../public/img/u76.png");
}
.lph {
  height: 100%;
  overflow: auto;
}
.btnleft {
  width: 45px;
  text-align: center;
  margin-top: 25px;
  float: left;
}
.btnright {
  width: 45px;
  text-align: center;
  margin-top: 25px;
  float: right;
}
.dmimg {
  margin: 0 4px;
  width: 400px;
  float: left;
  overflow: hidden;
}
</style>