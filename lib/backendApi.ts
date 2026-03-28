// lib/api.ts
// lib/api-client.ts
import {auth} from "@/auth"; // 服务端获取 session
import {getSession} from "next-auth/react"; // 客户端获取 session

const BASE_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface FetchOptions extends RequestInit {
    data?: any;
    params?: Record<string, any>;
}

async function getAuthSession() {
    // 判断环境：如果 window 不存在，说明在服务端
    if (typeof window === "undefined") {
        return await auth();
    }
    return await getSession();
}

export async function apiFetch(endpoint: string, {params, ...customConfig}: FetchOptions = {}) {
    // 1. 处理 URL 参数
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    const url = `${BASE_API_URL}${endpoint}${queryString}`;

    // 2. 默认 Headers 配置
    const defaultHeaders: Record<string, string> = {
        'Accept': 'application/json',
    };

    // 关键：非 FormData 自动设为 JSON 类型
    if (!(customConfig.body instanceof FormData)) {
        defaultHeaders['Content-Type'] = 'application/json';
    }

    // 3. 自动注入 Token (如果是 Token 认证方案)
    // 如果是 Sanctum Cookie 方案，fetch 会自动携带凭证，无需手动加 Authorization
    const session = await getAuthSession();
    const token = (session as any)?.accessToken;
    if (token) defaultHeaders.Authorization = `Bearer ${token}`;

    const config: RequestInit = {
        ...customConfig,
        headers: {
            ...defaultHeaders,
            ...customConfig.headers,
        },
        // 处理 Sanctum/Passport 的跨域凭证
        credentials: 'include',
    };

    try {
        const response = await fetch(url, config);

        // 4. 统一错误拦截
        if (response.status === 401) {
            // 处理未授权，例如跳转登录
            if (typeof window !== 'undefined') window.location.href = '/login';
        }

        if (!response.ok) {
            const errorData = await response.json();
            //console.log('response:',errorData);
            throw {
                status: errorData.code,
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
    return apiFetch(endpoint, {...customConfig, params, method: 'GET'});
}

export function apiPost(endpoint: string, data?: any, customConfig?: FetchOptions) {
    const requestConfig = {...customConfig};
    if (data instanceof FormData) {
        requestConfig.body = data;
    } else {
        requestConfig.body = JSON.stringify(data);
    }
    return apiFetch(endpoint, {...requestConfig, method: 'POST'});
}

export function apiPut(endpoint: string, data?: any, customConfig?: FetchOptions) {
    return apiFetch(endpoint, {
        ...customConfig,
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export function apiDelete(endpoint: string, data?: any, customConfig?: FetchOptions) {
    const requestConfig = {...customConfig};
    if (data) {
        requestConfig.body = JSON.stringify(data);
    }
    return apiFetch(endpoint, {...requestConfig, method: 'DELETE'});
}
