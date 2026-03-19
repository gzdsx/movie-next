'use client';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';

const items = [
    '2026',
    '2025',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
]

const YearFilter = ({current = ''}: { current: string }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onClickTag = (tag: string) => {
        // 保持现有的其他搜索参数，仅修改 page
        const params = new URLSearchParams(searchParams.toString());
        if (tag === '') {
            params.delete('year');
        } else {
            params.set('year', tag);
        }

        // 触发路由跳转，这会导致服务器组件重新渲染数据
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center">
            <div className="w-16 text-sm text-gray-500">按年份</div>
            <div className="flex flex-row flex-wrap grow gap-1">
                <span
                    onClick={() => onClickTag('')}
                    className={`text-sm px-1.5 py-0.5 inline-block cursor-pointer rounded-sm ${current === '' ? 'bg-gray-500 text-white' : ''}`}>全部</span>
                {
                    items.map((year) => (
                        <span key={year}
                              className={`text-sm px-1.5 py-0.5 inline-block cursor-pointer rounded-sm ${current === year ? 'bg-gray-500 text-white' : ''}`}
                              onClick={() => onClickTag(year)}>{year}</span>
                    ))
                }
            </div>
        </div>
    );
};

export default YearFilter;
