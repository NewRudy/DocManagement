<template>
  <FileCatalog
    :visible="fileVisible"
    :catalogId="catalogId"
    :pageInfo="pageInfo"
    @changeVisible="changeFileVisible"
    @freshList="freshList"
  />
  <el-row>
    <el-col :span="14">
      <el-button type="info" @click="addFolder">新建文件夹</el-button>
      <el-button type="info" @click="changeFileVisible">上传文件</el-button>
      <el-button type="info" @click="uploadMultiFiles">上传批量文件</el-button>
      <el-button type="info" @click="uploadBigFile">上传大文件</el-button>
      <el-button type="info" @click="uploadMultiFiles">引入资源</el-button>
    </el-col>
    <el-col :span="4">
      <el-input
        v-model="searchContent"
        placeholder="请输入搜索内容"
        class="input-with-select"
        @click="freshList"
      >
        <template #prepend>
          <el-select
            v-model="searchItem"
            placeholder="Select"
            style="width: 80px"
          >
            <el-option
              v-for="item in searchOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="freshList"></el-button>
        </template>
      </el-input>
    </el-col>
            <el-col :span="2" style="position: relative; text-align: center">
              <span class='block-vertical-center'>Sort By: </span>
            </el-col>
            <el-col :span="2">
              <el-select
                v-model="pageInfo.sortField"
                class="m-2"
                placeholder="Select"
                size="large"
                @change="freshList"
              >
                <el-option
                  v-for="item in sortOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1">
              <el-select
                v-model="pageInfo.asc"
                class="m-2"
                placeholder="Select"
                size="large"
                @change="freshList"
              >
                <el-option
                  v-for="item in ascOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
  </el-row>
  <el-row>
    <el-col :span="1">
      <span @click="catalogUndo">
        <el-icon size="20px"><arrow-left-bold /></el-icon>
      </span>
      <span @click="catalogRedo" style="margin-left: 15px">
        <el-icon size="20px"><arrow-right-bold /></el-icon>
      </span>
    </el-col>
    <el-col :span="20">
      <el-breadcrumb
        :separator-icon="ArrowRight"
      >
        <el-breadcrumb-item
          v-for="(item, index) in displayRouteStack"
          :key="index"
          
        ><a @click="intoFolder(item.catalogId, item.name)">{{item.name}}</a></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="1">
      <el-image style="height: 22px" :src="displayImg" @click="switchThumnail">
      </el-image>
    </el-col>
  </el-row>
  <el-row>
    <el-table
      :data="list"
      :stripe="true"
      :default-sort="{ prop: 'date', order: 'descending' }"
      size="large"
      fit="false"
      style="background-color: #eeeeee; width: 100%; line-height: 30px"
      :row-style="{}"
    >
      <el-table-column sortable :sort-method="nameSort" label="名称">
        <template #header>
          <span class="demonstration">名称</span>
        </template>
        <template #default="scope">
          <img
            v-if="scope.row.type === 'folder'"
            src="@/assets/images/folder.png"
            height="24"
            alt="Safari"
            title="Safari"
          />
          <img
            v-if="scope.row.type === 'file'"
            src="@/assets/images/file.png"
            height="24"
            alt="Safari"
            title="Safari"
          />
          <span
            @click="clickFolder(scope.$index, scope.row)"
            style="margin-left: 15px"
          >
            {{ scope.row.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column sortable :sort-method="dateSort" label="时间" prop="date" />
      <el-table-column sortable :sort-method="clicksSort" label="点击量" prop="clicks" />
      <el-table-column label="描述" prop="description" />
      <el-table-column>
        <template #header>
          <span class="demonstration">操作</span>
        </template>
        <template #default="scope">
          <el-button
            size="small"
            type="success"
            @click="handleDownload(scope.$index, scope.row)"
            plain
            >download
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleDownload(scope.$index, scope.row)"
            plain
            >share
          </el-button>
          <el-button
            size="small"
            type="info"
            @click="handleEdit(scope.$index, scope.row)"
            plain
            >Edit
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            plain
            >delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <el-row style="line-height: 10%">
    <div style="margin: 0 auto">
      <span class="block-vertical-center" style="left: 35%">共{{total}}条</span>
      <el-pagination
        :current-page="pageInfo.page"
        :page-size="pageInfo.pageSize"
        :page-sizes="[10, 15, 20, 25]"
        :total="total"
        layout="sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-row>
</template>

<script>
export default {
  name: "table",
};
</script>

<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import { useStore } from "vuex";

import { todo } from "@/utils/littleTools.js";
import { ArrowLeftBold, ArrowRightBold, Search } from "@element-plus/icons";
import { downloadFile, deleteFile } from "@/api/data";
import {
  createCatalog,
  deleteFolder,
  getCatalog,
  findByIdAndPage,
  findByItems,
} from "@/api/catalog";
import FileCatalog from "./components/fileDialog";

const store = useStore();
const user = reactive(store.getters["user/getUser"]);

const listBlock = () => {
const catalogId = ref(store.getters["catalog/getCatalogId"]);
const list = ref([]);
const total = ref(0);
const freshList = async () => {
  try {
    let res;
    if (searchContent.value == "") {
      res = await findByIdAndPage(catalogId.value, pageInfo);
    } else {
      res = await findByItems(
        catalogId.value,
        searchItem.value,
        searchContent.value,
        pageInfo
      );
    }
    if(res.data.children) {
    list.value = res.data.children;
    list.value.forEach((item) => {
      let temp = new Date(item.date);
      item.date = temp.toLocaleString();
    });
    } else {
      list.value = []
    }

    total.value = res.data.total
  } catch (err) {
    ElMessage({
      showClose: true,
      type: "error",
      message: "查询错误：" + err,
    });
  }
}
return {
  catalogId,
  list,
  total,
  freshList
}
}
const {catalogId, list, total, freshList} = listBlock()


const resourceBlock = () => {
  const addFolder = () => {
    createCatalog({
      userId: user.id,
      parentId: catalogId.value,
      name: "新建文件夹",
    })
      .then((res) => {
        ElMessage({
          message: "新建文件夹成功",
          type: "success",
        });
        freshList();
      })
      .catch((err) => {
        ElMessage({
          message: "新建文件夹失败",
          type: "error",
        });
      });
  };

  // 新建文件的对话框的控制
  const fileVisible = ref(false);
  const changeFileVisible = () => {
    fileVisible.value = !fileVisible.value;
  };

  const uploadBigFile = () => {
    todo("upload big file");
  };

  const uploadMultiFiles = () => {
    todo("upload multi files");
  };

  const importResource = () => {};

  return {
    addFolder,
    fileVisible,
    changeFileVisible,
    uploadBigFile,
    uploadMultiFiles,
    importResource,
  };
};
const {
  addFolder,
  fileVisible,
  changeFileVisible,
  uploadBigFile,
  uploadMultiFiles,
  importResource,
} = resourceBlock();

const searchBlock = () => {
  const searchOptions = ref([
    { label: "名称", value: "name" },
    { label: "描述", value: "description" },
  ]);
  const searchItem = ref("name");
  const searchContent = ref("");
  return {
    searchOptions,
    searchItem,
    searchContent,
  };
};
const { searchOptions, searchItem, searchContent } = searchBlock();

const sortBlock = () => {
  const sortOptions = ref([
  { label: "名称", value: "name" },
  { label: "时间", value: "date" },
  { label: "类型", value: "type" },
  { label: "点击量", value: "clicks" },
])

const ascOptions = ref([
  { label: "升序", value: true },
  { label: "降序", value: false },
])

  const nameSort = (a, b) => {
    return a.name.localeCompare(b.name)
  }

  const clicksSort = (a, b) => {
    return a.clicks >= b.clicks ? 1: 0
  }
  return {
    sortOptions,
    ascOptions,
    nameSort,
    clicksSort
  };
};
const {sortOptions, ascOptions, nameSort, clicksSort} = sortBlock();

const imgBlock = () => {
  const thumnailImg = require("@/assets/images/thumnail.png");
  const listImg = require("@/assets/images/list.png");
  const displayImg = ref(listImg);
  //切换缩略图-列表图标
  const switchThumnail = () => {
    displayImg.value = displayImg.value == thumnailImg ? listImg : thumnailImg;
  };
  return {
    thumnailImg,
    listImg,
    displayImg,
    switchThumnail,
  };
};
const { thumnailImg, listImg, displayImg, switchThumnail } = imgBlock();

const controlCatalogBlock = () => {
  const fileRouteStack = reactive([])
  const displayRouteStack = reactive([])
  fileRouteStack.push({
    "catalogId": catalogId.value,
    "name": store.getters["catalog/getCatalogName"]
  })
  const displayRoute = (id) => {
    while (displayRouteStack.length > 0) {
      displayRouteStack.pop()
    }
    for(let i = 0; i < fileRouteStack.length; ++i) {
      if(fileRouteStack[i].catalogId != id) {
        displayRouteStack.push(fileRouteStack[i])
      } else {
        displayRouteStack.push(fileRouteStack[i])
        break
      }
    }
  }
  displayRoute(catalogId.value)

  const clickFolder = (index, row) => {
    if (row.type == "folder") {
      catalogId.value = row.id;
      fileRouteStack.push({
        "catalogId": catalogId.value,
        "name": row.name
      })
      displayRoute(catalogId.value)
      store.commit("catalog/record", [catalogId.value, row.name]);
      freshList();
    } else {
      // todo: 这里可以写一个显示文件的关系表
      todo("click file");
    }
  };
  
  const intoFolder = (id, name) => {
    catalogId.value = id;
      fileRouteStack.push({
        "catalogId": catalogId.value,
        "name": name
      })
      displayRoute(catalogId.value)
      store.commit("catalog/record", [catalogId.value, name]);
      freshList();
  }

  const catalogRedo = async () => {
    store.commit("catalog/redo");
    let tempId = store.getters["catalog/getCatalogId"];
    let tempName = store.getters["catalog/getCatalogName"];
    if (catalogId.value == tempId) {
      ElMessage({
        message: "已经是最新页面",
        type: "warning",
      });
    } else {
      catalogId.value = tempId;
      fileRouteStack.push({
        "catalogId": catalogId.value,
        "name": tempName
      })
      displayRoute(catalogId.value)
      freshList();
    }
  };

  const catalogUndo = async () => {
    store.commit("catalog/undo");
    let tempId = store.getters["catalog/getCatalogId"];
    let tempName = store.getters["catalog/getCatalogName"];
    if (catalogId.value == tempId) {
      ElMessage({
        message: "不能继续回退",
        type: "warning",
      });
    } else {
      catalogId.value = tempId;
      fileRouteStack.pop()
      displayRoute(catalogId.value)
      freshList();
    }
  };

  return {
    displayRouteStack,
    clickFolder,
    intoFolder,
    catalogRedo,
    catalogUndo,
  };
};
const { displayRouteStack, clickFolder, intoFolder, catalogRedo, catalogUndo } = controlCatalogBlock();

const rowOperationBlock = () => {
  const handleDownload = (index, row) => {
    if (row.type === "file") {
      downloadFile({ id: row.id, catalogId: catalogId.value })
        .then((res) => {
          ElMessage({
            message: "下载文件成功",
            type: "success",
          });
        })
        .catch((err) => {
          ElMessage({
            message: "下载文件失败",
            type: "error",
          });
        });
    } else {
      todo("download folder");
    }
  };

  const handleShare = (index, row) => {};

  const handleEdit = (index, row) => {
    console.log("handleEdit");
    row.isEdit = true;
    // 备份原始数据
    row["oldRow"] = JSON.parse(JSON.stringify(row));
    ElMessage({
      message: "开发ing",
      type: "info",
    });
  };

  const handleDelete = (index, row) => {
    if (row.type === "file") {
      deleteFile({ id: row.id, catalogId: catalogId.value })
        .then((res) => {
          freshList();
          ElMessage({
            message: "删除文件成功",
            type: "success",
          });
        })
        .catch((err) => {
          ElMessage({
            message: "删除文件失败",
            type: "error",
          });
        });
    } else if (row.type === "folder") {
      deleteFolder({ id: row.id })
        .then((res) => {
          freshList();
          ElMessage({
            message: "删除文件夹成功",
            type: "success",
          });
        })
        .catch((err) => {
          ElMessage({
            message: "删除文件夹失败",
            type: "error",
          });
        });
    }
  };
  return {
    handleDownload,
    handleShare,
    handleEdit,
    handleDelete,
  };
};
const { handleDownload, handleShare, handleEdit, handleDelete } = rowOperationBlock();

const pageBlock = () => {
  const pageInfo = reactive({
    page: 1, // 当前页码
    pageSize: 10,
    asc: false, // 排序
    sortField: "date",
  });

  const handleSizeChange = (val) => {
    pageInfo.pageSize = val;
    freshList();
  };

  const handleCurrentChange = (val) => {
    pageInfo.page = val;
    freshList();
  };

  return {
    pageInfo,
    handleSizeChange,
    handleCurrentChange,
  };
};
const { pageInfo, handleSizeChange, handleCurrentChange } = pageBlock();

freshList.bind(this);
freshList();
</script>
<style scoped>
.el-table {
  --el-table-header-bg-color: #f5f6f7;
}
.input-with-select {
  margin-left: 20px;
}
.block-vertical-center {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>


