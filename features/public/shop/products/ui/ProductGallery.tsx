"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

interface ProductGalleryProps {
    images: string[]
    name: string
    tag?: string | null
}

export function ProductGallery({ images, name, tag }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    // Handle ESC key to close lightbox
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false)
        }
        if (isOpen) window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [isOpen])

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setActiveIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="space-y-4">
            {/* Main Display */}
            <div
                className="relative aspect-[3/4] bg-secondary/[0.03] border border-black/5 overflow-hidden group cursor-zoom-in"
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={images[activeIndex]}
                    alt={`${name} - View ${activeIndex + 1}`}
                    fill
                    className="object-contain p-10 transition-all duration-700 group-hover:scale-105"
                    priority
                />

                {/* Maximize Icon */}
                <div className="absolute bottom-4 right-4 h-10 w-10 bg-white border border-black/5 flex items-center justify-center text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <Maximize2 size={18} />
                </div>

                {tag && (
                    <div className="absolute top-4 left-4 bg-secondary/80 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 z-10 shadow-sm">
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
                                "aspect-square border transition-all relative overflow-hidden bg-slate-50 rounded-none",
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

            {/* Lightbox Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-sm flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-8 right-8 h-12 w-12 bg-primary text-white flex items-center justify-center hover:bg-white hover:text-primary transition-all z-[110]"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={24} />
                    </button>

                    {/* Navigation */}
                    {images.length > 1 && (
                        <>
                            <button
                                className="absolute left-8 top-1/2 -translate-y-1/2 h-16 w-16 border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all z-[110]"
                                onClick={prevImage}
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button
                                className="absolute right-8 top-1/2 -translate-y-1/2 h-16 w-16 border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all z-[110]"
                                onClick={nextImage}
                            >
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full max-w-5xl flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={images[activeIndex]}
                                alt={`${name} full view`}
                                fill
                                className="object-contain"
                                quality={100}
                            />
                        </div>

                        {/* Image Counter */}
                        <div className="absolute bottom-0 left-0 bg-white/5 border border-white/10 px-4 py-2 text-white/40 text-[10px] font-black uppercase tracking-widest text-[8px] md:text-[10px]">
                            {activeIndex + 1} / {images.length} — {name}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

