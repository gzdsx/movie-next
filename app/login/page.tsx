export default function Login() {
  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">用户登录</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">用户名</label>
            <input type="text" className="w-full p-2 bg-gray-700 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">密码</label>
            <input type="password" className="w-full p-2 bg-gray-700 rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700">
            登录
          </button>
        </form>
      </div>
    </div>
  );
}