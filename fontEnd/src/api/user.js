import service from '@/utils/request';

// 注册用户
export function register(data) {
    return service.post('/user', data)
}

// 登录
export function login(data) {
    return service.post('/user/login', data)
}