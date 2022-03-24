<template>
  <div class="inline">
     
    
      <el-card v-for="it in data" :key="it" :body-style="{ padding: '0px' }" class="card">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        
        <div style="padding: 14px">
          <span>{{it.name}}</span>
          <div class="bottom">
            <time class="time">{{it.describ}}</time>
            <el-button type="text" class="button">查看</el-button>
          </div>
        </div>
      </el-card>
    
  
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue'

const currentDate = ref(new Date())
let data=reactive(
    [
        {
            name:"zzzmodel",
            describ:"It is model from zzz to analyze the mechanism of sociaty",
            img:"",
        },
        {
            name:"zzzmodel",
            describ:"It is model from zzz to analyze the mechanism of sociaty",
            img:"",
        },
        {
            name:"zzzmodel",
            describ:"It is model from zzz to analyze the mechanism of sociaty",
            img:"",
        },
        {
            name:"zzzmodel",
            describ:"It is model from zzz to analyze the mechanism of sociaty",
            img:"",
        },
    ]
)
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
.card{
    position: relative;
    width: 200px;
    height: 300px;
    float: left;
}
.inline{
    display: inline;
}
</style>