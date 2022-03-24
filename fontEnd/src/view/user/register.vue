<template>
  <el-row style="height: 100%">
    <el-col :span="24" class="register-back">
      <el-card class="register">
        <el-form
          ref="registerForm"
          :model="registerFormData"
          :rules="rules"
          status-icon
          label-width="100px"
          size="medium"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              type="text"
              v-model="registerFormData.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerFormData.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="重复密码" prop="checkPass">
            <el-input
              type="password"
              v-model="registerFormData.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerFormData.email"></el-input>
          </el-form-item>

          <el-form-item label="机构" prop="institution">
            <el-input v-model="registerFormData.institution"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="info"
              @click="resetForm(registerForm)"
              size="medium"
              >重置</el-button
            >
            <el-button
              type="primary"
              @click="submit(registerForm)"
              size="medium"
              >注册</el-button
            >
            <el-button type="success" @click="toLoginPage()" size="medium"
              >登录页面</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Register",
};
</script>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

import {
  strpscript,
  validateVEmail,
  validateVPassword,
  validateVCheckCode,
} from "@/utils/validate.js";
import { register } from "@/api/user";

const registerFormData = reactive({
  name: "",
  password: "",
  checkPass: "",
  email: "",
  institution: "",
});
const registerForm = ref();
const router = useRouter();

// 邮箱验证
let validateEmail = (rule, value, callback) => {
  console.log(strpscript(value));   // 防止 xss 代码注入攻击
  if (value == "") callback(new Error("邮箱不能为空！"));
  else if (validateVEmail(value)) {
    callback(new Error("邮箱格式有误！"));
  } else {
    callback();
  }
};
// 密码验证
let validatePassword = (rule, value, callback) => {
  console.log(strpscript(value));
  if (value == "") callback(new Error("密码不能为空！"));
  else if (validateVPassword(value)) {
    callback(new Error("密码 6-20位，包含大小写字母和数字"));
  } else callback();
};
// 密码重复验证
let validateCheckPassword = (rule, value, callback) => {
  console.log(strpscript(value));
  if (value == "") callback(new Error("重复密码不能为空！"));
  else if (registerFormData.password != registerFormData.checkPass) {
    callback(new Error("密码与重复密码不相同"));
  } else callback();
};
const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    {
      max: 30,
      message: "用户名最长不超过 30 个字符",
      trigger: "blur",
    },
  ],
  password: [
    {
      validator: validatePassword,
      trigger: "blur",
    },
  ],
  checkPass: [
    {
      validator: validateCheckPassword,
      trigger: "blur",
    },
  ],
  email: [
    {
      validator: validateEmail,
      trigger: "blur",
    },
  ],
  institution: [
    {
      max: 500,
      message: "机构名最长不超过 500 个字符",
      trigger: ["blur", "change"],
    },
  ],
});


const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const toLoginPage = () => {
  router.push("/login");
};

const submit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      register(registerFormData)
        .then((response) => {
          ElMessage({
            message: "注册用户成功",
            type: "success",
          });
          toLoginPage();
        })
        .catch((error) => {
          ElMessage({
            message: "注册用户失败: " + error,
            type: "error",
          });
        });
    } else {
      ElMessage("请先通过验证");
      return false;
    }
  });
};
</script>

<style scoped>
.register-back {
  background-color: beige;
  height: 100%;
}
.register {
  margin: 10% 35%;
  width: 500px;
  min-width: 400px;
  font-size: 16px;
}
</style>
