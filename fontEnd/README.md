# nnu_geodata

## 目标

长三角数据中心网址：http://nnu.geodata.cn:8008/

将长三角数据中心的数据更好的应用到模型中。由于数据根本用不起来，考虑复制部分数据到程序中，然后先把这个模式走通
使用的 vue/cli3，Element 组件地址： https://element-plus.gitee.io/zh-CN/ (vue/cli3 写法有变动，不懂的多看文档或者Google)

## 步骤

1. 把大概页面创建好，可以参考参与式平台

   参考参与式平台的 [个人空间](https://geomodeling.njnu.edu.cn/PExploration/newPersonalPage/tool)，不需要有用户的创建登录

   [参与式代码](https://github.com/TsaiYoung/GeoProblemSolving3.0/tree/zz): 可以下载来看看，不懂的可以问大明

2. 复制数据，用户的验证

3. 跑一些简单的模型或者直接是数据分析

4. 后端代码：[geoDataBackEnd](https://github.com/Ting-xin/geoDataBackEnd)

## 代码结构

node 版本： v16.6.2

参考的前端平台：[gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)

代码结构如下：

```lua
nnu_geodata
├── src   -- 源代码
│   ├── api  -- 所有请求
|   |   ├── data.js  -- 数据相关的 api
|   |   ├── user.js  -- 用户相关的 api
│   ├── assets  --  图片等静态资源
|   ├── components  -- components 通用组件
|   ├── router  -- 路由
|   ├── store  -- store vuex
|   |   ├── modules  -- modules 
|   |   |   ├── catlog.js  -- 目录信息
|   |   |   └── user.js  -- 用户信息
|   |   └── index.js  -- index
|   ├── styles  -- css
|   ├── utils  -- 工具
|   |   ├── bus.js  -- mitt 工具
|   |   ├── date.js  -- 日期转换
|   |   ├── deepClone.js  -- 深拷贝功能
|   |   ├── request.js  -- axios service 服务
|   |   ├── validate.js  -- 一些验证函数
|   ├── view  -- 主要view代码
|   |   ├── data  --  数据管理页面
|   |   ├── help  --  帮助页面
|   |   ├── project  --  项目管理页面
|   |   ├── task  --  任务管理页面
|   |   ├── tool  --  工具管理页面
|   |   ├── user  --  登录注册、个人中心 页面
|   |   ├── index.vue  --  导航页面
│   ├── App.vue  -- 入口页面
│   ├── main.js  -- 入口文件 加载组件 初始化等
│   └── permission.js  -- 跳转限制
├── README.md  -- 说明文档
├── vue.config.js  -- vue-cli 配置
└── package.json  -- package.json
```



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
