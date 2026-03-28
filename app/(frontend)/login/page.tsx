'use client';

import {useState} from "react";
import {signIn} from "next-auth/react";

export default function Login() {
    const [account, setAccount] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // 这里的 "credentials" 对应你在 [...nextauth].ts 中定义的 ID
        const result = await signIn("sanctum", {
            account,
            password,
            redirect: true,      // 登录成功后是否自动跳转
            redirectTo: "/",    // 登录成功后的目标路径
        });

        console.log('result:', result)
    };

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">用户登录</h1>
                <form className="space-y-4" onSubmit={handleLogin} autoComplete="off">
                    <div>
                        <label className="block text-sm font-medium mb-1">用户名</label>
                        <input
                            type="text"
                            placeholder={"邮箱/手机号"}
                            required={true}
                            className="w-full p-2 bg-gray-700 rounded"
                            autoComplete="off"
                            onChange={(e) => setAccount(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">密码</label>
                        <input
                            type="password"
                            pattern="^[a-zA-Z0-9]{6,16}$"
                            placeholder={"密码"}
                            required={true}
                            className="w-full p-2 bg-gray-700 rounded"
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700">
                        登录
                    </button>
                </form>
            </div>
        </div>
    );
}
