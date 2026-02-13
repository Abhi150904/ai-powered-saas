"use client"
import React, {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function VideoUpload() {
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [notification, setNotification] = useState<string | null>(null)

    const router = useRouter()
    //max file size of 70 mb

    const MAX_FILE_SIZE = 70 * 1024 * 1024

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return;
        setNotification(null)

        if (file.size > MAX_FILE_SIZE) {
            setNotification("File size too large. Maximum allowed size is 70 MB.")
            return;
        }

        setIsUploading(true)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("originalSize", file.size.toString());

        try {
            await axios.post("/api/video-upload", formData)
            router.push("/home")
        } catch (error) {
            console.log(error)
            setNotification("Upload failed. Please try again.")
        } finally{
            setIsUploading(false)
        }

    }


    return (
        <div className="max-w-3xl space-y-6">
          {notification && (
            <div className="alert border border-rose-400/30 bg-rose-500/15 text-rose-200">
              <span>{notification}</span>
            </div>
          )}
          <section className="panel-glass rounded-2xl p-6 md:p-8">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-100">Upload Video</h1>
            <p className="mt-2 text-slate-300/80">
              Add a video file and Cloudinary will optimize it for delivery.
            </p>
          </section>
          <form onSubmit={handleSubmit} className="surface-card p-6 md:p-8 space-y-5">
            <div>
              <label className="label pb-2">
                <span className="label-text text-slate-200">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full rounded-xl border-white/15 bg-slate-900/70 text-slate-100 placeholder:text-slate-500 focus-ring"
                placeholder="e.g. Product Demo Reel"
                required
              />
            </div>
            <div>
              <label className="label pb-2">
                <span className="label-text text-slate-200">Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea w-full rounded-xl border-white/15 bg-slate-900/70 text-slate-100 placeholder:text-slate-500 focus-ring min-h-28"
                placeholder="Describe your video content"
              />
            </div>
            <div>
              <label className="label pb-2">
                <span className="label-text text-slate-200">Video File</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="file-input w-full rounded-xl border-white/15 bg-slate-900/70 text-slate-200 focus-ring"
                required
              />
              <p className="mt-2 text-xs text-slate-400">Maximum file size: 70 MB</p>
            </div>
            <button
              type="submit"
              className="btn h-11 rounded-xl border-0 bg-gradient-to-r from-violet-500 to-indigo-500 px-6 text-white shadow-[0_12px_32px_-10px_rgba(124,58,237,0.9)] hover:from-violet-400 hover:to-indigo-400 focus-ring"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>
      );
}

export default VideoUpload
