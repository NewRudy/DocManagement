<template>
  <el-container>
    <el-header>
      <el-image
          style="height:70px"
          :src="imgUrl"
          @click="goHome"
      ></el-image>

      <template v-if='!visible' >
        <el-button
            id="register-button"
            @click="goRegister"
        >注册
        </el-button>
        <el-button
            id="login-button"
            @click="goLogin"
        >登录
        </el-button>
      </template>
      <template v-else>
        <user-icon
            id="user-icon"
            style="width: 40px"
            @click="goUser"
        />
      </template>
    </el-header>
    <el-container>
      <el-aside style="width: 120px;">
        <el-menu
            class="el-menu-vertical-demo"
            background-color="#2150a2"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect"
        >
          <el-row></el-row>
          <el-menu-item index="data">数据</el-menu-item>
          <el-menu-item index="tool">工具</el-menu-item>
          <el-menu-item index="task">任务</el-menu-item>
          <el-menu-item index="project">项目</el-menu-item>
          <el-menu-item index="help">帮助</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="calc(100vw-120px);margin-left: 120px;background-color: white">
        <router-view ></router-view>
      </el-main>
    </el-container>
    <el-footer>
      <h2 class="footerTop">
        <i>Open Geographic Modeling and Simulation</i>
      </h2>
      <p class="footerBottom">
        Copyright © 2011-2021 OpenGMS. All rights reserved.
      </p>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Navigation",
};
</script>


<script setup>
import { computed, defineComponent, ref } from "vue";
import { User as UserIcon } from "@element-plus/icons";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const imgUrl = ref(require("@/assets/images/nnu_geodata.png"));
const visible = computed(() => {
  let id = store.getters['user/getUserId']
  return  (id && id != '') ? true : false
})
const handleSelect = (key, keyPath) => {
  // 在这里改路由
  router.push("/" + keyPath[0]);
};
const goUser=()=>{
  router.push("/user")
}
const goHome=()=>{
  router.push("/task")
}
const goRegister=()=>{
  router.push("/register")
}
const goLogin=()=>{
  router.push("/login")
}
</script>
<style scoped>

.el-menu-vertical-demo{
  margin-top: 70px;
  height: calc(100vh - 130px);
  padding-left: 20px;
}
.el-menu-item{
  font-size: 17px;
}

.el-footer{
  height: 60px;
  background-color: #fefded;
}
#user-icon {
  position: absolute;
  width: 50px;
  left: 95%;
  margin-top: 14px;
}
#register-button{
  position: absolute;
  left: 90%;
  margin-top: 14px;
}
#login-button{
  position: absolute;
  left: 95%;
  margin-top: 14px;
}
.el-header{
  border-bottom: 1px solid darkgray;
  /*box-shadow: darkgrey 10px 10px 30px 5px;*/
  background-color: white;
  height: 70px;
}
/*.el-footer {*/
/*  background-color: #1d1e1f;*/
/*  color: var(--el-text-color-primary);*/
/*  text-align: center;*/
/*  line-height: 15px;*/
/*  height: 80px;*/
/*}*/

.footerTop {
  text-align: center;
  color: #7e6666;
  font-weight: bold;
  margin-top: 15px;
  font-size: 18px;
}

.footerBottom {
  text-align: center;
  color: #7e6666;
  font-size: 0.8em;
}
.el-main{

}

/*.body-main {*/
/*  height: calc(100vh - 141px);*/
/*  background-color: #e9eef3;*/
/*  color: var(--el-text-color-primary);*/
/*  text-align: center;*/
/*}*/

/*.el-menu--horizontal > .el-menu-item {*/
/*  font-size: 20px;*/
/*  color: black;*/
/*}*/

/*#user-icon[data-v-1632b64f] {*/
/*  position: unset;*/
/*}*/


</style>
