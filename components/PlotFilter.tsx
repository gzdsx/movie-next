'use client';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';

const items = {
    "喜剧": "喜剧",
    "爱情": "爱情",
    "恐怖": "恐怖",
    "动作": "动作",
    "科幻": "科幻",
    "剧情": "剧情",
    "战争": "战争",
    "警匪": "警匪",
    "犯罪": "犯罪",
    "动画": "动画",
    "奇幻": "奇幻",
    "武侠": "武侠",
    "冒险": "冒险",
    "枪战": "枪战",
    "悬疑": "悬疑",
    "惊悚": "惊辣",
    "经典": "经典",
    "青春": "青春",
    "文艺": "文艺",
    "伦理": "伦理",
    "古装": "古装",
    "历史": "历史",
    "运动": "运动",
    "农村": "农村",
    "儿童": "儿童"
}

const PlotFilter = ({current = ''}: { current: string }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onClickTag = (tag: string) => {
        // 保持现有的其他搜索参数，仅修改 page
        const params = new URLSearchParams(searchParams.toString());
        if (tag === '') {
            params.delete('tag');
        } else {
            params.set('tag', tag);
        }

        // 触发路由跳转，这会导致服务器组件重新渲染数据
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center">
            <div className="w-16 text-sm text-gray-500">按剧情</div>
            <div className="flex flex-row flex-wrap grow gap-1">
                <span
                    onClick={() => onClickTag('')}
                    className={`text-sm px-1.5 py-0.5 inline-block cursor-pointer rounded-sm ${current === '' ? 'bg-gray-500 text-white' : ''}`}>全部</span>
                {
                    Object.entries(items).map(([key, value]) => (
                        <span key={key}
                              className={`text-sm px-1.5 py-0.5 inline-block cursor-pointer rounded-sm ${current === key ? 'bg-gray-500 text-white' : ''}`}
                              onClick={() => onClickTag(key)}>{value}</span>
                    ))
                }
            </div>
        </div>
    );
};

export default PlotFilter;
