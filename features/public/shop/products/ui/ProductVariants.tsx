"use client"

import { useState } from "react"
import Link from "next/link"
import { Ruler, Palette, Hash, Phone, Instagram } from "lucide-react"
import { CustomButton } from "@/shared/ui/branded/CustomButton"
import { cn } from "@/lib/utils"

interface ProductVariantsProps {
    adultSizes: string[]
    youthSizes: string[]
    availableColors: { name: string; hex: string }[]
    availableNumbers: string[]
}

export function ProductVariants({
    adultSizes,
    youthSizes,
    availableColors,
    availableNumbers,
}: ProductVariantsProps) {
    const [sizeCategory, setSizeCategory] = useState<"adult" | "youth">("adult")
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null)
    const [selectedNumber, setSelectedNumber] = useState<string | null>(null)

    const sizes = sizeCategory === "adult" ? adultSizes : youthSizes

    return (
        <div className="flex flex-col gap-6">

            {/* Size Category Toggle */}
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        setSizeCategory("adult")
                        setSelectedSize(null)
                    }}
                    className={cn(
                        "flex-1 py-3 text-[10px] font-black uppercase tracking-widest border transition-all duration-200",
                        sizeCategory === "adult"
                            ? "bg-secondary text-white border-secondary"
                            : "bg-transparent text-secondary/40 border-secondary/10 hover:border-secondary/30"
                    )}
                >
                    Adult
                </button>
                <button
                    onClick={() => {
                        setSizeCategory("youth")
                        setSelectedSize(null)
                    }}
                    className={cn(
                        "flex-1 py-3 text-[10px] font-black uppercase tracking-widest border transition-all duration-200",
                        sizeCategory === "youth"
                            ? "bg-secondary text-white border-secondary"
                            : "bg-transparent text-secondary/40 border-secondary/10 hover:border-secondary/30"
                    )}
                >
                    Youth
                </button>
            </div>

            {/* Size Selection */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Ruler size={12} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/50">
                        Select {sizeCategory === "adult" ? "Adult" : "Youth"} Size
                        {selectedSize && <span className="text-primary ml-2">— {selectedSize}</span>}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                                "h-10 min-w-[44px] px-3 text-[10px] font-black uppercase tracking-widest border transition-all duration-200",
                                selectedSize === size
                                    ? "bg-primary text-white border-primary"
                                    : "bg-transparent text-secondary/60 border-secondary/15 hover:border-primary hover:text-primary"
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color (Commented out as per request)
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Palette size={12} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/50">
                        Color
                        {selectedColor && <span className="text-primary ml-2">— {selectedColor.name}</span>}
                    </span>
                </div>
                <div className="flex flex-wrap gap-3">
                    {availableColors.map((color) => (
                        <button
                            key={color.name}
                            title={color.name}
                            onClick={() => setSelectedColor(color)}
                            className={cn(
                                "h-9 w-9 border-2 transition-all duration-200",
                                selectedColor?.name === color.name
                                    ? "border-primary scale-110 shadow-[0_0_0_2px_white,0_0_0_4px_var(--primary)]"
                                    : "border-transparent hover:border-secondary/20"
                            )}
                            style={{ backgroundColor: color.hex }}
                        />
                    ))}
                </div>
            </div> */}

            {/* Jersey Number */}
            {availableNumbers && availableNumbers.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Hash size={12} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/50">
                            Jersey Number
                            {selectedNumber && <span className="text-primary ml-2">— #{selectedNumber}</span>}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {availableNumbers.map((num) => (
                            <button
                                key={num}
                                onClick={() => setSelectedNumber(num)}
                                className={cn(
                                    "h-9 min-w-[40px] px-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-200",
                                    selectedNumber === num
                                        ? "bg-secondary text-white border-secondary"
                                        : "bg-transparent text-secondary/60 border-secondary/15 hover:border-secondary hover:text-secondary"
                                )}
                            >
                                #{num}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* CTA */}
            <div className="border-t border-black/5 pt-6 flex flex-col gap-4">
                <p className="text-xs text-secondary/50 font-medium leading-relaxed">
                    We don't have a direct checkout — all orders are placed personally with our team.
                    Select your variants above, then reach out and we'll take care of the rest.
                    Orders are subject to our <Link href="/refund-policy" className="underline hover:text-primary">Refund Policy</Link>.
                </p>

                <Link href="/contact">
                    <CustomButton
                        size="lg"
                        className="w-full flex items-center justify-center gap-3 text-sm"
                    >
                        <Phone size={14} strokeWidth={3} />
                        Contact Us to Order →
                    </CustomButton>
                </Link>

                <a
                    href="https://instagram.com/allstarapparel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-colors pt-1"
                >
                    <Instagram size={11} /> DM us on Instagram @allstarapparel
                </a>
            </div>
        </div>
    )
}
