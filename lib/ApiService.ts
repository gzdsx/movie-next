import axios from 'axios';

const instance = axios.create({
    //baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // 比如 http://localhost:8000
    baseURL: 'https://www.xiaomavv.com/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // 关键：允许携带 Cookie (Sanctum 必备)
});

// 请求拦截器
instance.interceptors.request.use(config => {
    // 如果是客户端环境，可以从本地或其他地方补丁 Token (非 HttpOnly 模式下)
    return config;
});

// 响应拦截器
instance.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response) {
            if (error.response?.status === 401) {
                // 如果是客户端报错，重定向到登录页
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error);
        }
    }
);

export default instance;
