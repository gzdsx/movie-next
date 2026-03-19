'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import { Search } from 'lucide-react';
import {useState} from "react";

const navItems = [
    {name: '首页', href: '/'},
    {name: '电影', href: '/film'},
    {name: '电视剧', href: '/tv'},
    {name: '综艺', href: '/variety'},
    {name: '动漫', href: '/anime'},
    {name: '纪录片', href: '/documentary'},
    {name: '体育赛事', href: '/match'},
];

const Navbar = () => {
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <nav className="min-h-16 relative border-b border-gray-800 hidden md:block">
            <div className="fixed w-full px-4 bg-black/95 z-50">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <Link href="/">
                            <img src="/logo.png" alt="小马影视" className="w-32 h-auto"/>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    pathname === item.href
                                        ? 'text-red-500 bg-red-500/10'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <form
                            method="get"
                            action="/search"
                            autoComplete="off"
                            className="hidden sm:flex items-center bg-gray-900 rounded-full px-4 py-2 border border-gray-800">
                            <input
                                type="text"
                                placeholder="搜索影片..."
                                defaultValue={searchQuery}
                                name="q"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-white text-sm ml-2 w-48"
                            />
                            <button>
                                <Search className="w-4 h-4 text-gray-400"/>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
