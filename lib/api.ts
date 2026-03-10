// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
    data?: any;
    params?: Record<string, any>;
}

export async function apiFetch(endpoint: string, {data, params, ...customConfig}: FetchOptions = {}) {
    // 1. 处理 URL 参数
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    const url = `${BASE_URL}${endpoint}${queryString}`;

    // 2. 默认 Headers 配置
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // 必须！让 Laravel 识别为 AJAX 请求
    };

    // 3. 自动注入 Token (如果是 Token 认证方案)
    // 如果是 Sanctum Cookie 方案，fetch 会自动携带凭证，无需手动加 Authorization
    // const token = getCookie('token');
    // if (token) headers.Authorization = `Bearer ${token}`;

    const config: RequestInit = {
        method: data ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
        // 处理 Sanctum/Passport 的跨域凭证
        credentials: 'include',
    };

    if (data) config.body = JSON.stringify(data);

    try {
        const response = await fetch(url, config);

        // 4. 统一错误拦截
        if (response.status === 401) {
            // 处理未授权，例如跳转登录
            if (typeof window !== 'undefined') window.location.href = '/login';
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                message: errorData.message || '请求失败',
                errors: errorData.errors, // Laravel 的表单验证错误通常放在这里
            };
        }

        // 204 No Content 处理
        if (response.status === 204) return null;

        return await response.json();
    } catch (error) {
        return Promise.reject(error);
    }
}

export function apiGet(endpoint: string, params?: Record<string, any>, customConfig?: FetchOptions) {
    return apiFetch(endpoint, {...customConfig, params});
}

export function apiPost(endpoint: string, data?: any, customConfig?: FetchOptions) {
    return apiFetch(endpoint, {...customConfig, data});
}
