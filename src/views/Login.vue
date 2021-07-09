<template>
  <div style="padding: 200px">
    <div class="sl-content">
      <p>
        账号：<a-input
          placeholder="admin"
          v-model="userInfo.username"
          @keydown.enter="keyenter"
        />
      </p>
      <p>
        密码：
        <a-input
          placeholder="123456"
          type="password"
          v-model="userInfo.userpassword"
          @keydown.enter="keyenter"
        />
      </p>
      <p><a-button @click="login">登录</a-button></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userInfo: {
        username: "",
        userpassword: "",
      },
    };
  },
  methods: {
    keyenter() {
      if (this.userInfo.username == "") {
        alert("请输入用户名");
      } else if (this.userInfo.userpassword == "") {
        alert("请输入密码");
      } else {
        this.login()
      }
    },
    login() {
      this.$store
        .dispatch("user/login", this.userInfo)
        .then((res) => {
          this.$router.push({ path: "/gestionManuel" });
        })
        .catch((res) => {
          alert(res);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.sl-content {
  width: 500px;
  height: 300px;
  background: #83af9b;
  margin: auto;
  padding: 20px;
  p {
    text-align: center;
    margin-top: 50px;
  }
  input {
    width: 50%;
  }
}
</style>