import {createRouter, createWebHistory} from 'vue-router'
import { ElMessage } from "element-plus";

import Navigation from '@/view/navigation.vue'
import Register from '@/view/user/register.vue'
import Login from '@/view/user/login.vue'
import User from '@/view/user/user.vue'
import Data from '@/view/data/data.vue'
import Tool from '@/view/tool/tool.vue'
import Task from '@/view/task/task.vue'
import Project from '@/view/project/project.vue'
import Help from '@/view/help/help.vue'
import { ElMessageBox } from 'element-plus';

const routes = [
    {
        path: '/',
        name: 'navigation',
        component: Navigation,
        children: [
            {
                path: '/register',
                name: 'register',
                component: Register
            },
            {
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/user',
                name: 'user',
                component: User
            },
            {
                path: '/data',
                name: 'data',
                component: Data
            },
            {
                path: '/tool',
                name: 'tool',
                component: Tool
            },
            {
                path: '/task',
                name: 'task',
                component: Task
            },
            {
                path: '/project',
                name: 'project',
                component: Project
            },
            {
                path: '/help',
                name: 'help',
                component: Help
            },
        ]
    }
]

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: routes
})


export default router;