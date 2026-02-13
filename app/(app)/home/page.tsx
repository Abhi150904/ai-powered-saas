"use client"
import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/types'
function Home() {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchVideos = useCallback(async () => {
        try {
            const response = await axios.get("/api/videos")
            if(Array.isArray(response.data)) {
                setVideos(response.data)
            } else {
                throw new Error(" Unexpected response format");

            }
        } catch (error) {
            console.log(error);
            setError("Failed to fetch videos")

        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchVideos()
    }, [fetchVideos])

    const handleDownload = useCallback((url: string, title: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title}.mp4`);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [])

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-10 w-56 rounded-lg bg-white/10 animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="h-96 rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
          <section className="panel-glass rounded-2xl p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-100">Video Library</h1>
                <p className="text-slate-300/80 mt-1">
                  Browse uploaded videos, preview clips, and download originals.
                </p>
              </div>
              <div className="badge badge-lg border-0 bg-gradient-to-r from-violet-500 to-indigo-500 text-white">
                {videos.length} videos
              </div>
            </div>
          </section>

          {error && (
            <div role="alert" className="alert border border-rose-400/30 bg-rose-500/15 text-rose-200">
              <span>{error}</span>
            </div>
          )}

          {videos.length === 0 ? (
            <div className="surface-card border-dashed p-12 text-center">
              <h2 className="text-xl font-semibold mb-2 text-slate-100">No videos yet</h2>
              <p className="text-slate-300/80">Upload your first video to see it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </div>
      );
}

export default Home
