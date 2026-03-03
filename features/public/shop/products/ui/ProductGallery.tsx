"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
    images: string[]
    name: string
    tag?: string | null
}

export function ProductGallery({ images, name, tag }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="space-y-4">
            {/* Main Display */}
            <div className="relative aspect-[3/4] bg-secondary/[0.03] border border-black/5 overflow-hidden">
                <Image
                    src={images[activeIndex]}
                    alt={`${name} - View ${activeIndex + 1}`}
                    fill
                    className="object-contain p-10 transition-all duration-700"
                    priority
                />
                {tag && (
                    <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 z-10">
                        {tag}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-5 gap-4">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={cn(
                                "aspect-square border transition-all relative overflow-hidden bg-slate-50",
                                activeIndex === idx ? "border-primary" : "border-black/5 hover:border-black/20"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`${name} thumb ${idx + 1}`}
                                fill
                                className="object-cover p-1"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
