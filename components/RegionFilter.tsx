'use client';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';

const items = {
    "大陆": "大陆",
    "香港": "香港",
    "台湾": "台湾",
    "美国": "美国",
    "法国": "法国",
    "英国": "英国",
    "日本": "日本",
    "韩国": "韩国",
    "德国": "德国",
    "泰国": "泰国",
    "印度": "印度",
    "意大利": "意大利",
    "西班牙": "西班牙",
    "加拿大": "加拿大",
    "其他": "其他"
}

const RegionFilter = ({current = ''}: { current: string }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onClickTag = (tag: string) => {
        // 保持现有的其他搜索参数，仅修改 page
        const params = new URLSearchParams(searchParams.toString());
        if (tag === '') {
            params.delete('region');
        } else {
            params.set('region', tag);
        }

        // 触发路由跳转，这会导致服务器组件重新渲染数据
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center">
            <div className="w-16 text-sm text-gray-500">按地区</div>
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

export default RegionFilter;
