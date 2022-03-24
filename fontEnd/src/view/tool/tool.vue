<template>
  <el-button type="text" @click="visible = true"
    >open a Form nested Dialog</el-button
  >
  <el-dialog v-model="visible" title="上传文件" width="30%" center @close="handleClose">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      status-icon
      label-width="100px"
      size="medium"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="文件" prop="data">
  <el-upload
    ref="upload"
    :limit="1"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
    :show-file-list="false"
  >
    <template #trigger>
      <el-button type="primary" style="width: 150px">选择文件</el-button>
    </template>
    <span></span>
  </el-upload>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="ruleForm.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="info" @click="visible = false" size="medium"
          >取消</el-button
        >
        <el-button type="warning" @click="resetForm(ruleFormRef)" size="medium"
          >重置</el-button
        >
        <el-button type="primary" @click="submit(ruleFormRef)" size="medium"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { reactive, ref, unref } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { updateFile } from "@/api/data";

export default {
  name: "fileCatalog",
  setup(props) {
    const visible = ref(false);
    const upload = ref()
    const data = ref()
    let catalogId = JSON.parse(localStorage.getItem("catalog")).id;
    const ruleForm = reactive({
      name: "",
      data: "",
      description: "",
    });
    const ruleFormRef = ref();
    const store = useStore();

    const rules = reactive({
      name: [
        {
          required: true,
          message: "请输入名称",
          trigger: "blur",
        },
        {
          max: 30,
          message: "名称最长不超过 30 个字符",
          trigger: "blur",
        },
      ],
      description: [
        {
          max: 500,
          message: "描述最长不超过 500 个字符",
          trigger: "blur",
        },
      ],
    });

    const beforeUpload = (file) => {
      console.log('beforeUpload')
      data.value = file
    }

    const handleExceed = (files) => {
      console.log('handleExceed')
      upload.value.clearFiles()
      upload.value.handleStart(files[0])
      data.value = files[0]
    }

    const resetForm = (formEl) => {
      if (!formEl) return;
      formEl.resetFields();
    };
    const submit = (formEl) => {
      console.log("login submit");
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('data', data.value)
          formData.append('name', ruleForm.name)
          formData.append('description', ruleForm.description)
          formData.append('id', catalogId)
          updateFile(formData)
            .then((res) => {
              ElMessage({
                message: "上传文件成功",
                type: "success",
              });
              visible.value = false
            })
            .catch((err) => {
              ElMessage({
                message: "上传文件失败： " + err,
                type: "error",
              });
            });
        } else {
          ElMessage("请先通过验证");
          return false;
        }
      });
    };

    return {
      visible,
      upload,
      ruleForm,
      ruleFormRef,
      rules,
      beforeUpload,
      handleExceed,
      resetForm,
      submit,
    };
  },
};
</script>