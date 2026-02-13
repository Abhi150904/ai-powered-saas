"use client"

import React, {useState, useEffect, useRef} from 'react'
import { CldImage } from 'next-cloudinary';

const socialFormats = {
    "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
    "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
    "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
    "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
    "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
  };

  type SocialFormat = keyof typeof socialFormats;

  export default function SocialShare() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
    const [isUploading, setIsUploading] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);


    useEffect(() => {
        if(uploadedImage){
            setIsTransforming(true);
        }
    }, [selectedFormat, uploadedImage])

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/image-upload", {
                method: "POST",
                body: formData
            })

            if(!response.ok) throw new Error("Failed to upload image");

            const data = await response.json();
            setUploadedImage(data.publicId);


        } catch (error) {
            console.log(error)
            alert("Failed to upload image");
        } finally{
            setIsUploading(false);
        }
    };

    const handleDownload = () => {
        if(!imageRef.current) return;

        fetch(imageRef.current.src)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a");
            link.href = url;
            link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
    }


    return (
        <div className="max-w-4xl space-y-6">
          <section className="panel-glass rounded-2xl p-6 md:p-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
              Social Media Image Creator
            </h1>
            <p className="mt-2 text-slate-300/80">
              Generate perfectly sized images for each channel with one upload.
            </p>
          </section>

          <div className="surface-card">
            <div className="card-body p-6 md:p-8">
              <h2 className="card-title mb-4 text-slate-100">Upload an Image</h2>
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text text-slate-200">Choose an image file</span>
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="file-input w-full rounded-xl border-white/15 bg-slate-900/70 text-slate-200 focus-ring"
                />
              </div>

              {isUploading && (
                <div className="mt-4">
                  <progress className="progress w-full"></progress>
                </div>
              )}

              {uploadedImage && (
                <div className="mt-6">
                  <h2 className="card-title mb-4 text-slate-100">Select Social Media Format</h2>
                  <div className="form-control">
                    <select
                      className="select w-full rounded-xl border-white/15 bg-slate-900/70 text-slate-100 focus-ring"
                      value={selectedFormat}
                      onChange={(e) =>
                        setSelectedFormat(e.target.value as SocialFormat)
                      }
                    >
                      {Object.keys(socialFormats).map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-6 relative">
                    <h3 className="text-lg font-semibold mb-3 text-slate-100">Preview</h3>
                    <div className="flex justify-center rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      {isTransforming && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 z-10 rounded-2xl">
                          <span className="loading loading-spinner loading-lg"></span>
                        </div>
                      )}
                      <CldImage
                        width={socialFormats[selectedFormat].width}
                        height={socialFormats[selectedFormat].height}
                        src={uploadedImage}
                        sizes="100vw"
                        alt="transformed image"
                        crop="fill"
                        aspectRatio={socialFormats[selectedFormat].aspectRatio}
                        gravity='auto'
                        className="rounded-xl"
                        ref={imageRef}
                        onLoad={() => setIsTransforming(false)}
                        />
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button
                      className="btn h-11 rounded-xl border-0 bg-linear-to-r from-violet-500 to-indigo-500 px-6 text-white shadow-[0_12px_32px_-10px_rgba(124,58,237,0.9)] hover:from-violet-400 hover:to-indigo-400 focus-ring"
                      onClick={handleDownload}
                    >
                      Download for {selectedFormat}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
}
