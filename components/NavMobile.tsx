'use client';

import {useState} from 'react';
import {Menu, X, Home, Film, Tv, Radio, Zap, BookOpen, Trophy} from 'lucide-react';
import Link from "next/link";

const navItems = [
    {name: '首页', href: '/', icon: Home},
    {name: '电影', href: '/film', icon: Film},
    {name: '电视剧', href: '/tv', icon: Tv},
    {name: '综艺', href: '/variety', icon: Radio},
    {name: '动漫', href: '/anime', icon: Zap},
    {name: '纪录片', href: '/documentary', icon: BookOpen},
    {name: '体育赛事', href: '/match', icon: Trophy},
];

const NavMobile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
            <div className="flex items-center justify-between px-2 py-2 gap-3">
                <Link href="/" className="inline-block">
                    <img src="/logo.png" alt="小马影视" className="w-24 h-auto"/>
                </Link>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="搜索..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-900 text-white text-sm px-4 py-2 pr-10 min-w-20 rounded-full border border-gray-700 focus:border-red-600 focus:outline-none w-32 focus:w-48 transition-all duration-300"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
            </div>

            {isOpen && (
                <div className="border-t border-gray-800 bg-black/95">
                    <nav className="py-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <item.icon className="w-5 h-5 text-red-500"/>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default NavMobile;


