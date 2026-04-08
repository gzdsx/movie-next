'use client';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';

const items = {
    "欧冠": "欧冠",
    "欧联": "欧联",
    "英超": "英超",
    "西甲": "西甲",
    "意甲": "意甲",
    "德甲": "德甲",
    "法甲": "法甲",
    "中超": "中超",
    "NBA": "NBA",
    "CBA": "CBA",
    "世俱杯": "世俱杯"
}

const MatchFilter = ({current = ''}: { current: string }) => {
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
            <div className="w-16 text-sm text-gray-500">按赛事</div>
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

export default MatchFilter;
