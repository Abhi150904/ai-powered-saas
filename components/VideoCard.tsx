import React, {useState, useCallback} from 'react'
import {getCldImageUrl, getCldVideoUrl} from "next-cloudinary"
import { Download, Clock, FileDown, FileUp } from "lucide-react";
import dayjs from 'dayjs';
import realtiveTime from "dayjs/plugin/relativeTime"
import {filesize} from "filesize"
import { Video } from '@/types';

dayjs.extend(realtiveTime)

interface VideoCardProps {
    video: Video;
    onDownload: (url: string, title: string) => void;
}

const  VideoCard: React.FC<VideoCardProps> = ({video, onDownload}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [previewError, setPreviewError] = useState(false)
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

    const getThumbnailUrl = useCallback((publicId: string) => {
        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: "fill",
            gravity: "auto",
            format: "jpg",
            quality: "auto",
            assetType: "video"
        })
    }, [])

    const getFullVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 1920,
            height: 1080,

        })
    }, [])

    const getPreviewVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            quality: "auto",
            format: "auto:video",
            rawTransformations: ["so_0,du_8"]

        })
    }, [])

    const formatSize = useCallback((size: number) => {
        return filesize(size)
    }, [])

    const formatDuration = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
      }, []);

      const compressionPercentage = Math.round(
        (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
      );

      const handlePreviewError = () => {
        setPreviewError(true);
      };

      return (
        <div
          className="card surface-card overflow-hidden hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(124,58,237,0.75)] transition-all duration-300"
          onMouseEnter={() => {
            setPreviewError(false);
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <figure className="aspect-video relative m-3 mb-0 overflow-hidden rounded-xl border border-white/10">
            {isHovered ? (
              previewError ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-900/80">
                  <p className="text-error font-medium">Preview not available</p>
                </div>
              ) : !cloudName ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-900/80">
                  <p className="text-error font-medium">Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</p>
                </div>
              ) : (
                <video
                  src={getPreviewVideoUrl(video.publicId)}
                  poster={getThumbnailUrl(video.publicId)}
                  preload="metadata"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onError={handlePreviewError}
                />
              )
            ) : (
              <img
                src={getThumbnailUrl(video.publicId)}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            )}
            <div
              className={`absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-900/10 to-transparent transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute left-3 top-3 rounded-md border border-white/20 bg-black/45 px-2 py-1 text-[11px] font-medium text-slate-100 transition-all duration-300 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
            >
              Preview Clip
            </div>
            <div className="absolute bottom-2 right-2 bg-black/65 text-white px-2 py-1 rounded-lg text-sm flex items-center backdrop-blur-sm">
              <Clock size={16} className="mr-1" />
              {formatDuration(video.duration)}
            </div>
          </figure>
          <div className="card-body p-5 pt-4">
            <h2 className="card-title text-xl font-bold leading-tight">{video.title}</h2>
            <p className="text-sm text-base-content/75 min-h-10">
              {video.description}
            </p>
            <div className="flex items-center justify-between text-xs text-base-content/60">
              <p className="truncate">Uploaded {dayjs(video.createdAt).fromNow()}</p>
              <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 text-violet-200">
                Video
              </span>
            </div>
            <div className="mt-1 h-px w-full bg-white/10" />
            <div className="grid grid-cols-2 gap-3 text-sm mt-1">
              <div className="flex items-center rounded-xl border border-base-300 bg-base-200/40 p-2">
                <FileUp size={18} className="mr-2 text-primary" />
                <div>
                  <div className="font-semibold text-xs uppercase tracking-wide">Original</div>
                  <div className="font-medium">{formatSize(Number(video.originalSize))}</div>
                </div>
              </div>
              <div className="flex items-center rounded-xl border border-base-300 bg-base-200/40 p-2">
                <FileDown size={18} className="mr-2 text-secondary" />
                <div>
                  <div className="font-semibold text-xs uppercase tracking-wide">Compressed</div>
                  <div className="font-medium">{formatSize(Number(video.compressedSize))}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-base-300">
              <div className="text-sm font-semibold">
                Compression:{" "}
                <span className="text-success">{compressionPercentage}%</span>
              </div>
              <button
                className="btn btn-primary btn-sm gap-2"
                onClick={() =>
                  onDownload(getFullVideoUrl(video.publicId), video.title)
                }
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        </div>
      );
}

export default VideoCard
