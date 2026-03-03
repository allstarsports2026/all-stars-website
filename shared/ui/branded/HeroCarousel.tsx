"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { CustomButton } from "./CustomButton"

const SLIDES = [
    {
        image: "/jerseys/black.png",
        label: "Pro Series",
        title: ["STEALTH", "ELITE"],
        description: "Premium performance fabric engineered for elite athletes. Built to move, designed to dominate.",
    },
    {
        image: "/jerseys/red.png",
        label: "Match Day",
        title: ["POWER", "RED"],
        description: "Match-day intensity meets precision tailoring. Own the field before you even step on it.",
    },
    {
        image: "/jerseys/silver.png",
        label: "Champion Edition",
        title: ["SILVER", "GLORY"],
        description: "Refined construction for those who've earned their place at the top. Champions only.",
    },
]

export function HeroCarousel() {
    const [current, setCurrent] = React.useState(0)
    const [fading, setFading] = React.useState(false)

    const goTo = (index: number) => {
        if (index === current) return
        setFading(true)
        setTimeout(() => {
            setCurrent(index)
            setFading(false)
        }, 350)
    }

    const handlePrev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length)
    const handleNext = () => goTo((current + 1) % SLIDES.length)

    React.useEffect(() => {
        const t = setInterval(handleNext, 9500)
        return () => clearInterval(t)
    }, [current])

    const slide = SLIDES[current]

    const NavDots = () => (
        <div className="flex items-center gap-2 lg:gap-3">
            {SLIDES.map((_, i) => (
                <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={cn(
                        "rounded-full transition-all duration-300",
                        i === current
                            ? "w-8 h-2 bg-primary"
                            : "w-2 h-2 bg-secondary/15 hover:bg-secondary/30"
                    )}
                />
            ))}
        </div>
    )

    const NavArrows = () => (
        <div className="flex items-center gap-2">
            <button
                onClick={handlePrev}
                className="h-9 w-9 lg:h-10 lg:w-10 rounded-full flex items-center justify-center text-secondary/40 hover:text-primary transition-all active:scale-90"
                aria-label="Previous slide"
            >
                <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
                onClick={handleNext}
                className="h-9 w-9 lg:h-10 lg:w-10 rounded-full flex items-center justify-center text-secondary/40 hover:text-primary transition-all active:scale-90"
                aria-label="Next slide"
            >
                <ChevronRight size={18} strokeWidth={2.5} />
            </button>
        </div>
    )

    return (
        <div className="w-full bg-white flex flex-col" style={{ minHeight: "100svh" }}>
            {/* Navbar offset */}
            <div className="h-20 shrink-0" />

            <div className="flex-grow flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">

                {/* Product Image */}
                <div
                    className={cn(
                        "order-1 lg:order-2 flex items-center justify-center bg-white",
                        "h-[55vw] min-h-[220px] max-h-[380px]",
                        "lg:h-auto lg:max-h-none",
                        "transition-all duration-500 ease-out",
                        fading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    )}
                >
                    <div className="relative w-full h-full p-0 lg:p-12">
                        <Image
                            src={slide.image}
                            alt={slide.title.join(" ")}
                            fill
                            className="object-contain pointer-events-none select-none drop-shadow-xl"
                            priority
                        />
                    </div>
                </div>

                {/* Mobile-only nav — sits directly under the image */}
                <div className="order-2 lg:hidden flex items-center justify-between px-6 py-3">
                    <NavDots />
                    <NavArrows />
                </div>

                {/* Text + CTA */}
                <div className="order-3 lg:order-1 flex flex-col justify-center items-center text-center lg:items-start lg:text-left px-6 md:px-12 lg:px-20 py-8 lg:py-0">
                    <div className={cn(
                        "transition-all duration-350 ease-out",
                        fading ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
                    )}>
                        {/* Series Label */}
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                            <div className="h-[2px] w-8 bg-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                                {slide.label}
                            </span>
                        </div>

                        {/* Title */}
                        <h1
                            className="font-black italic uppercase leading-none tracking-tighter text-secondary font-kanit mb-4 lg:mb-6"
                            style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
                        >
                            {slide.title[0]}<br />
                            <span className="text-primary">{slide.title[1]}</span>
                        </h1>

                        {/* Description */}
                        <p className="hidden sm:block text-sm lg:text-base text-secondary/50 font-medium max-w-sm leading-relaxed mb-8 lg:mb-10">
                            {slide.description}
                        </p>

                        {/* CTA */}
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-3 bg-primary text-white px-6 py-3 lg:px-8 lg:py-4 font-black uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
                        >
                            <CustomButton variant="outline" size="lg"  />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Desktop-only bottom navigation bar */}
            <div className="hidden lg:flex h-20 items-center justify-between px-20 shrink-0">
                <NavDots />
                <NavArrows />
            </div>
        </div>
    )
}

