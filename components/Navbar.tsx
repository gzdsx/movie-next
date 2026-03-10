'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import { Search } from 'lucide-react';

const navItems = [
    {name: '首页', href: '/'},
    {name: '电影', href: '/film'},
    {name: '电视剧', href: '/tv'},
    {name: '综艺', href: '/variety'},
    {name: '动漫', href: '/anime'},
    {name: '纪录片', href: '/documentary'},
    {name: '体育赛事', href: '/match'},
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center gap-x-4">
                <Link href="/" className="text-white text-xl font-bold mr-8">
                    <img src={"/logo.png"} alt={"小马影视"} className="h-10 inline-block"/>
                </Link>
                <ul className="flex grow gap-x-4">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.href}
                                  className={`hover:text-yellow-500 ${item.href === pathname ? 'text-red-500' : 'text-white'}`}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <form method="get" action="/search">
                    <div className="relative mx-4">
                        <input
                            type="text"
                            name={'q'}
                            placeholder="搜索影片..."
                            className="bg-gray-800 text-white text-sm px-4 py-1.5 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500">
                            <Search size={20}/>
                        </button>
                    </div>
                </form>

                <ul className={"flex gap-x-4"}>
                    <li>
                        <Link href="/login" className="text-white hover:text-gray-300">
                            登录
                        </Link>
                    </li>
                    <li>
                        <Link href="/register" className="text-white hover:text-gray-300">
                            注册
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
