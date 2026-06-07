'use client';

import Link from 'next/link';
import {Mail} from 'lucide-react';
import Script from "next/script";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* 品牌信息 */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-white text-xl font-bold mb-4">小马影视</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            专业的在线视频平台，为您提供最新最热门的电影、电视剧、综艺等内容。
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition-colors">

                            </a>
                            <a href="#" className="hover:text-white transition-colors">

                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <Mail size={20}/>
                            </a>
                        </div>
                    </div>

                    {/* 快速链接 */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">快速链接</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">首页</Link></li>
                            <li><Link href="/film" className="hover:text-white transition-colors">电影</Link></li>
                            <li><Link href="/tv" className="hover:text-white transition-colors">电视剧</Link></li>
                            <li><Link href="/variety" className="hover:text-white transition-colors">综艺</Link></li>
                        </ul>
                    </div>

                    {/* 分类 */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">分类</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/anime" className="hover:text-white transition-colors">动漫</Link></li>
                            <li><Link href="/documentary" className="hover:text-white transition-colors">纪录片</Link>
                            </li>
                            <li><Link href="/match" className="hover:text-white transition-colors">体育赛事</Link></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">登录</Link></li>
                        </ul>
                    </div>

                    {/* 帮助中心 */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">帮助中心</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">关于我们</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">使用条款</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
                        </ul>
                    </div>
                </div>

                {/* 版权信息 */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} xiaomavv. All rights reserved.</p>
                </div>
            </div>
            <Script id={'arms'} strategy={'afterInteractive'}>{`
            !(function(c,b,d,a){c[a]||(c[a]={});c[a]=
    { 
      endpoint: 'https://proj-xtrace-7163232d705a4e5f4fba8b6b3dd9bad0-cn-hangzhou.cn-hangzhou.log.aliyuncs.com/rum/web/v2?workspace=default-cms-1374469303544670-cn-hangzhou&service_id=dj7ihbl1su@a1a2c9020f8cd35ae0a3d',
      // 设置环境信息，参考值：'prod' | 'gray' | 'pre' | 'daily' | 'local'
      env: 'prod', 
      // 设置路由模式， 参考值：'history' | 'hash'
      spaMode: 'history',
      collectors: {
        // 页面性能指标监听开关，默认开启
        perf: true,
        // WebVitals指标监听开关，默认开启
        webVitals: true,
        // Ajax监听开关，默认开启
        api: true,
        // 静态资源开关，默认开启
        staticResource: true,
        // JS错误监听开关，默认开启
        jsError: true,
        // 控制台错误监听开关，默认开启
        consoleError: true,
        // 用户行为监听开关，默认开启
        action: true,
      },
      // 链路追踪配置开关，默认关闭
      tracing: false,
    }
    with(b)with(body)with(insertBefore(createElement("script"),firstChild))setAttribute("crossorigin","",src=d)
})(window, document, "https://sdk.rum.aliyuncs.com/v2/browser-sdk.js", "__rum");
            `}</Script>
        </footer>
    );
}
