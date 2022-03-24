<template>
  <div>
      <el-container
    class="layout-container-demo"
    style="border: 1px solid #eee"
  >
    <el-aside style="background-color: rgb(238, 241, 246)">
      <el-scrollbar>
        <el-menu :default-openeds="['3', '1']">
          
            
            <el-menu-item-group>
              
              <el-menu-item index="1-1" ><router-link to="/info" class="black"><UserFilled class="img"/></router-link> </el-menu-item>
              <!-- <el-menu-item index="1-2"><router-link to="/dataSpace" class="black">数据空间</router-link></el-menu-item> -->
              <el-menu-item index="2-1"><router-link to="/save" class="black"><Wallet class="img"/></router-link></el-menu-item>
              <!-- <el-menu-item index="1-4">个人任务</el-menu-item> -->
              <!-- <el-menu-item index="1-5">个人项目</el-menu-item> -->
            </el-menu-item-group>
            
             
          
          
          
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { UserFilled, Wallet } from '@element-plus/icons';
import { useRouter } from "vue-router";

const router = useRouter();
router.push("/info");

</script>

<style scoped>
.black{
    color: black;
}
.layout-container-demo .el-aside {
    position: absolute !important;
/* top: 50px !important; */
  /* max-width: 220px; */
  width: 50px !important;
  color: var(--el-text-color-primary);
  background: #fff !important;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
}
.layout-container-demo .el-main {
    position: relative !important;
  padding: 0;
  left:55px;
  
}
.layout-container-demo{
overflow: hidden !important;
height: 80vh !important;
}

.el-menu-item * {
    vertical-align: bottom;
    text-align: center;
    margin-left: 0%;
    height: 40px !important;
}
.img{
  width: 25px;
  height: 25px;
  margin-left: -5px;
}
</style>