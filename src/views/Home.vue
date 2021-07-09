<template>
  <a-layout id="components-layout-demo-top-side-2" style="position: relative">
    <a-layout-header class="header">
      <div class="logo" />
      <div id="zhglpt">综合管理平台</div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '60px' }"
      >
        <a-menu-item key="1"><i class="iconProduits"></i>产品管理</a-menu-item>
        <a-menu-item key="2"><i class="iconSysteme"></i>系统管理 </a-menu-item>
      </a-menu>
      <span class="sl-quit" @click="quitSystem">退出登录</span>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200">
        <!-- 左边背景颜色 -->
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0, background: '#263238' }"
        >
          <a-sub-menu key="sub0" class="sub0">
            <span slot="title">产品管理</span>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="laptop" />产品手册</span>
            <a-menu-item
              :style="{
                background: '#263238',
                margin: '0 auto',
                padding: '0 20',
                color: '#666666',
              }"
              v-for="(item, index) of navleftgetsion"
              :key="item"
              @click="change1(index)"
              >{{ item }}</a-menu-item
            >
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title"><a-icon type="notification" />产品中心</span>
            <a-menu-item
              :style="{
                background: '#263238',
                margin: '0 auto',
                padding: '0 20',
                color: '#666666',
              }"
              v-for="(item, index) of navleftcenter"
              :key="item"
              @click="change2(index)"
              >{{ item }}</a-menu-item
            >
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 0 6 10; height: 100%">
        <div class="sl-tab">
          <ul>
            <li
              v-for="(item, index) of tabList"
              :key="index"
              :class="[index == tabIdx ? 'active' : '']"
            >
              <span @click="changeTab(item)" class="closeTy">
                {{ item.meta.title }}
              </span>
              <span
                v-if="index != 0"
                @click="closeTab(index)"
                class="closeIcon"
              >
                <a-icon type="close-circle" />
              </span>
            </li>
          </ul>
        </div>
        <a-layout-content
          :style="{
            background: '#76838F',
            padding: '0px',
            margin: 0,
            minHeight: '280px',
            height: '100%',
          }"
        >
          <keep-alive :include="includeList">
            <router-view />
          </keep-alive>
          <!-- <Version></Version> -->
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import gestion from "./CentreProduits/Gestion"; //产品管理页
import Entreposage from "./CentreProduits/Entreposage"; //产品入库页
import Editer from "./CentreProduits/Editer"; //入库编辑页
import Details from "./CentreProduits/Details"; //产品详细页

import Ajouter from "./ManuelProduits/Ajouter"; //新增手册页
import DetailsManuel from "./ManuelProduits/Details"; //手册详情页
import EditerManuel from "./ManuelProduits/Editer"; //编辑手册页
import GestionManuel from "./ManuelProduits/Gestion"; //手册管理页

import { mapState } from "vuex";
import store from "../store";
// import Version from "../components/Version"
export default {
  components: {
    gestion,
    Entreposage,
    Editer,
    Details,
    Ajouter,
    DetailsManuel,
    EditerManuel,
    GestionManuel,
    // Version
  },
  data() {
    return {
      options: [
        {
          id: "00",
          label: "北京市",
          uid: "0",
          children: [
            {
              id: "0001",
              uid: "1",
              label: "朝阳区",
            },
          ],
        },
        {
          id: "01",
          uid: "0",
          label: "广西",
          children: [
            {
              id: "0101",
              uid: "1",
              label: "南宁",
              children: [
                {
                  id: "010101",
                  uid: "2",
                  label: "宾阳",
                },
                {
                  id: "010102",
                  uid: "2",
                  label: "武鸣",
                },
              ],
            },
            {
              id: "0102",
              uid: "1",
              label: "崇左",
              children: [
                {
                  id: "010201",
                  uid: "2",
                  label: "凭祥",
                },
                {
                  id: "010202",
                  uid: "2",
                  label: "宁明",
                },
              ],
            },
          ],
        },
        {
          id: "02",
          uid: "0",
          label: "江苏",
          children: [
            {
              id: "0201",
              uid: "1",
              label: "南京",
              children: [
                {
                  id: "020101",
                  uid: "2",
                  label: "中华门",
                },
              ],
            },
          ],
        },
      ],
      value: [],
      collapsed: false,
      navleftgetsion: ["手册管理"],
      navleftcenter: ["产品管理"],
      routerList: [],
    };
  },
  methods: {
    change1(index) {
      switch (index) {
        case 0:
          this.$router.push("/gestionManuel");
          break;
        case 1:
          this.$router.push("/detailsManuel");
          break;
        case 2:
          this.$router.push("/ajouter");
          break;
        default:
          this.$router.push("/editerManuel");
      }
    },
    change2(index) {
      this.$router.push("/gestion");
      switch (index) {
        case 0:
          this.$router.push("/gestion");
          break;
        case 1:
          this.$router.push("/Details");
          break;
        case 2:
          this.$router.push("/Entreposage");
          break;
        default:
          this.$router.push("/Editer");
      }
    },
    changeTab(tab) {
      this.$router.push(tab.fullPath);
    },
    closeTab(idx) {
      this.$store.commit("tab/closeTab", idx);
    },
    quitSystem() {
      if (confirm("确定要退出吗") == true) {
        this.$store.dispatch("user/resetToken");
        this.$router.push("/login");
        return;
      } else {
        return false;
      }
    },
  },
  computed: {
    ...mapState({
      tabList: (state) => {
        return state.tab.tabList;
      },
      tabIdx: (state) => {
        return state.tab.tabIdx;
      },
      includeList: (state) => {
        return state.tab.includeList;
      },
    }),
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
/* 综合管理平台的log */
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
/* 设置整个页面的宽高 */
#components-layout-demo-top-side-2 {
  /* width: 50%; */
  margin: 0 auto;
  overflow: hidden;
  /* width:1260px!important; */
  /* height: 950px!important; */
}
/* 产品管理下的箭头 */
.sub0 span {
  color: black;
}
.sub0 i {
  display: none;
}
/* 选中时的颜色 */
.ant-menu-submenu-selected {
  background: #1f292e !important;
  color: #fff !important;
}
.ant-menu-submenu-title span {
  color: #fff;
}
/* 左侧子级菜单点击时的颜色 */
.ant-menu-item-selected {
  color: #fff !important;
}
.ant-layout {
  height: 100% !important;
}
/* 右边内容的背景颜色 */
.ant-layout-content {
  background: #f1f4f5 !important;
  height: 100%;
  overflow: hidden;
}
/* .ant-layout-sider-children ul,.ant-layout-sider-children ul li,.ant-layout-sider-children ul li div ul li{
  background:#263238
} */
/* .ant-menu-item-active{
  background:#263238!important
} */

/* 顶部导航条颜色 */
.ant-layout-header,
.ant-layout-header ul {
  background: #4e97d9 !important;
  margin: 0 !important;
  padding: 0 !important;
  height: 64px !important;
}
.ant-layout-header,
.ant-layout-header ul {
  height: 60px !important;
}
/* 顶部产品管理和系统管理的图标 */
.iconProduits,
.iconSysteme {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 2px;
  background-position: center center;
  background-size: 20px 20px;
}
.iconProduits {
  background-image: url("../../public/img/u127.png");
}
.iconSysteme {
  background-image: url("../../public/img/n1.png");
}

/* 顶部产品管理和系统管理的背景 */
.ant-menu-horizontal .ant-menu-item {
  font-size: 18px !important;
  background: #4e97d9 !important;
  font-weight: 500;
}

/* 顶部logo */
#components-layout-demo-top-side-2 .logo {
  margin: 10px 15px 10px 25px;
  height: 40px;
}
.logo {
  display: inline-block;
  width: 40px !important;
  /* height: 40px!important; */
  background-position: center center;
  background-size: 20px 20px;
  background-image: url("../../public/img/u132.png") !important;
  background-size: 40px 40px !important;
}
/* 综合管理平台 */
#zhglpt {
  float: left;
  color: #fff;
  font-size: 24px;
  font-weight: 800;
  margin-right: 30px;
  height: 60px;
}
/* 左边导航栏的蓝条 */
.ant-menu-item-selected::after {
  display: none;
}
/* 宽度99% */
.ant-menu-inline {
  width: 99% !important;
}
.ant-breadcrumb {
  height: 40px;
  margin: 0 !important;
  background: #fff;
  border: 1px solid #f1f4f5;
}
.ant-breadcrumb span {
  margin: 5px;
  display: inline-block;
}
.ant-layout ant-layout-has-sider {
  height: 100%;
}
#components-layout-demo-top-side-2 {
  height: 100%;
}
.sl-tab {
  width: 100%;
  background: #fff;
  height: 40px;
  border: 1px solid #dddddd;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    .active {
      background: #f1f4f5;
      border: 1px solid #dddddd;
      border-bottom: none;
      border-left: none;
    }

    li {
      float: left;
      height: 38px;
      line-height: 40px;
      background: #fff;
      text-align: center;
      cursor: pointer;
      border-right: 1px solid #dddddd;
      width: 100px;
      .closeTy {
        padding: 10px 0;
        text-align: center;
      }
      .closeIcon {
        margin-left: 5px;
        width: 20px;
      }

      div {
        height: 100%;
      }

      div:first-child {
        float: left;
      }
    }
  }
}
.sl-quit {
  position: absolute;
  top: 0;
  right: 50px;
  color: #fff;
  cursor: pointer;
}
</style>
