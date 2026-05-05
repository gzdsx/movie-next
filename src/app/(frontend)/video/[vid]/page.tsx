import {Star, ThumbsUp, MessageCircle, Share2} from 'lucide-react';
import {apiGet} from "@/lib/api";
import Link from "next/link";
import {MovieCard} from "@/components/MovieCard";
import {Metadata} from "next";
import AdsenseBanner from "@/components/AdsenseBanner";
import VideoPlayer from "@/components/VideoPlayer";

const getVideo = async (vid: string) => {
    try {
        const res = await apiGet(`/movies/${vid}`);
        return res.data;
    } catch (e) {
        console.error(e);
        return {};
    }
}

const getRelatedVideos = async (id: number) => {
    try {
        const res = await apiGet(`/movies/${id}/related`, {limit: 10});
        return res.data.items;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function generateMetadata({params}: any): Promise<Metadata> {
    const {vid} = await params;

    // 从你的 Laravel API 获取电影详情
    const movie = await getVideo(vid);

    return {
        title: `${movie.title + '-' + movie.source_name} - 小马影视`,
        keywords: `名称:${movie.title},别名:${movie.alias},导演:${movie.directors},主演:${movie.actors}`,
        description: `剧情介绍：${movie.description.slice(0, 100)}...`,
        openGraph: {
            images: [movie.thumbnail], // 社交媒体分享时的预览图
        },
    };
}

export default async function VideoPage({params}: { params: { vid: string } }) {
    const {vid} = await params;
    const video: any = await getVideo(vid);
    const relatedVideos = await getRelatedVideos(video.id);
    const comments: any[] = [];
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnail,
        uploadDate: new Date(video.created_at).toISOString(),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            <div className="container mx-auto px-4 py-4 ext-white">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="grow">
                        {/* 视频播放器 */}
                        <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-8">
                            <div className="aspect-video bg-black flex items-center justify-center">
                                <VideoPlayer
                                    src={video.source_src}
                                    currentSourceId={video.source_id}
                                    sources={video.sources}
                                    poster={video.thumbnail}
                                />
                            </div>
                        </div>
                        {/* 视频信息 */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-2">{video?.title + ' - ' + video?.source_name}</h1>
                            <div className="flex items-center gap-4 text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
                          9.7
                        </span>
                                <span>{video.year}</span>
                                <span>{video.regions}</span>
                                <span>{video.tags}</span>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <span>导演:{video.directors}</span>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <span>演员:{video.actors}</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                {video?.description}
                            </p>
                            <div className="gap-4 mt-4">
                                <h2>剧集</h2>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {
                                        video.sources.map((source: any) => (
                                            <Link
                                                href={`/video/${source.vid}`} key={source.id}
                                                className={`border border-gray-300 rounded px-2 py-1 text-sm ${source.id === video.source_id ? 'bg-red-400! border-red-400' : ''}`}
                                            >
                                                <span>{source.name}</span>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                    <ThumbsUp className="w-4 h-4"/>
                                    点赞
                                </button>
                                <button
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                    <Share2 className="w-4 h-4"/>
                                    分享
                                </button>
                            </div>
                        </div>
                        <AdsenseBanner dataAdSlot="9313405668"/>
                        {/* 评论区 */}
                        <div>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <MessageCircle className="w-5 h-5"/>
                                评论 ({comments.length})
                            </h2>

                            {/* 发表评论 */}
                            <form className="mb-6">
                              <textarea
                                  placeholder="发表你的评论..."
                                  className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 resize-none"
                                  rows={3}
                              />
                                <button
                                    type="button"
                                    className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                                >
                                    发表评论
                                </button>
                            </form>

                            {/* 评论列表 */}
                            <div className="space-y-4">
                                {comments.map((item) => (
                                    <div key={item.id} className="bg-gray-900 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">{item.user}</span>
                                            <span className="text-sm text-gray-500">{item.time}</span>
                                        </div>
                                        <p className="text-gray-300 mb-3">{item.content}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <button
                                                className="flex items-center gap-1 hover:text-red-500 transition-colors">
                                                <ThumbsUp className="w-4 h-4"/>A
                                                {item.likes}
                                            </button>
                                            <button className="hover:text-red-500 transition-colors">回复</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:min-w-110 md:max-w-110">
                        {/* 相关视频 */}
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-bold mb-4">相关推荐</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {relatedVideos.map((vod: any) => (
                                    <MovieCard key={vod.id} movie={vod} linkTarget={'_self'}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
