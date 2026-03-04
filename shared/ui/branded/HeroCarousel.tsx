"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { CustomButton } from "./CustomButton"

export type HeroSlide = {
    image: string
    label: string
    title: string[]
    description: string
    href: string
}

const DEFAULT_SLIDES: HeroSlide[] = [
    {
        image: "/jerseys/black.png",
        label: "Pro Series",
        title: ["STEALTH", "ELITE"],
        description: "Premium performance fabric engineered for elite athletes. Built to move, designed to dominate.",
        href: "/shop"
    },
    {
        image: "/jerseys/red.png",
        label: "Match Day",
        title: ["POWER", "RED"],
        description: "Match-day intensity meets precision tailoring. Own the field before you even step on it.",
        href: "/shop"
    },
    {
        image: "/jerseys/silver.png",
        label: "Champion Edition",
        title: ["SILVER", "GLORY"],
        description: "Refined construction for those who've earned their place at the top. Champions only.",
        href: "/shop"
    },
]

interface HeroCarouselProps {
    slides?: HeroSlide[]
}

export function HeroCarousel({ slides = DEFAULT_SLIDES }: HeroCarouselProps) {
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

    const handlePrev = () => goTo((current - 1 + slides.length) % slides.length)
    const handleNext = () => goTo((current + 1) % slides.length)

    React.useEffect(() => {
        const t = setInterval(handleNext, 9500)
        return () => clearInterval(t)
    }, [current])

    const slide = slides[current]

    const NavDots = () => (
        <div className="flex items-center gap-2 lg:gap-3">
            {slides.map((_: HeroSlide, i: number) => (
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
        <div className="w-full bg-white flex flex-col" style={{ minHeight: "90svh" }}>
            {/* Navbar offset */}
            <div className="h-20 shrink-0" />

            <div className="flex-grow flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">

                {/* Product Image */}
                <div
                    className={cn(
                        "order-1 lg:order-2 flex items-center justify-center bg-white",
                        "h-[50vw] min-h-[200px] max-h-[320px]", // Reduced height
                        "lg:h-[450px] lg:max-h-none", // Capped LG height
                        "transition-all duration-500 ease-out",
                        fading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    )}
                >
                    <div className="relative w-full h-full p-4 lg:p-16">
                        <Image
                            src={slide.image}
                            alt={slide.title.join(" ")}
                            fill
                            className="object-contain pointer-events-none select-none drop-shadow-xl"
                            priority
                        />
                    </div>
                </div>

                {/* Text + CTA */}
                <div className="order-2 lg:order-1 flex flex-col justify-center items-center text-center lg:items-start lg:text-left px-6 md:px-12 lg:px-20 py-8 lg:py-0">
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
                            className="font-black italic uppercase leading-[0.9] tracking-tighter text-secondary font-kanit mb-4 lg:mb-6"
                            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
                        >
                            {slide.title[0]} <br />
                            {slide.title[1]}
                        </h1>

                        {/* Description */}
                        <p className="hidden sm:block text-sm lg:text-base text-secondary/50 font-medium max-w-sm leading-relaxed mb-8 lg:mb-10">
                            {slide.description}
                        </p>

                        {/* CTA */}
                        <CustomButton asChild>
                            <Link href={slide.href}>Shop the Collection</Link>
                        </CustomButton>

                        {/* Mobile nav — under the button */}
                        <div className="flex items-center justify-between w-full mt-6 lg:hidden">
                            <NavDots />
                            <NavArrows />
                        </div>
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

