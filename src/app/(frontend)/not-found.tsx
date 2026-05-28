export default function NotFoundPage() {
    return (
        <div
            className="flex flex-col gap-y-4 items-center justify-center mx-auto px-4 py-4 ext-white min-h-80 md:min-h-160">
            <h1 className="text-2xl font-bold mb-2">你找的页面不存在</h1>
            <div>
                <a href={'/'} className={'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm'}>返回首页</a>
            </div>
        </div>
    )
}