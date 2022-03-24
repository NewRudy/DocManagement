<template>
  <div>
    <el-card class="basicInfo" style="width: 40%; height: 80%; margin: 0 auto">
      <el-form ref="form" label-width="30%" :label-position="labelPosition">
        <h4 style="font-size: initial; text-align: center; margin-bottom: 5%">
          个人信息
        </h4>
        <el-divider></el-divider>
        <el-form-item label="姓名:">
          <label>{{ user.name }}</label>
        </el-form-item>
        <el-form-item label="机构:">
          <label>{{ user.institution }}</label>
        </el-form-item>
        <el-form-item label="Email:">
          <label>{{ user.email }}</label>
        </el-form-item>
        <el-form-item label="数据量:">
          <label>0</label>
        </el-form-item>
        <el-form-item label="任务量:">
          <label>0</label>
        </el-form-item>
        <div>
          <el-button type="danger" plain size="medium" @click="logout"
            >注销</el-button
          >
          <el-button type="info" size="medium" @click="changePass">更改密码</el-button>
          <el-button type="primary" size="medium" @click="edit">编辑信息</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "User",
};
</script>

<script setup>
import {reactive, computed} from "vue"
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import {todo} from "@/utils/littleTools"

const store = useStore();
const router = useRouter();

const user = computed(() => {
  return store.getters["user/getUser"]
})

const logout = () => {
  store.commit("user/init");
  store.commit("catalog/init");
  router.push("/login");
};
const edit = () => {
  todo('edit')
}
const changePass = () => {
  todo('change password')
}


</script>

<style>
ul li {
  list-style: none;
}
/* body{font-family:"微软雅黑";} */
.info {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin: 10px;
  font-size: initial;
}
/* .avatar {
  display: inline-block;
} */
.head {
  text-align: center;
}
</style>
