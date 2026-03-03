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
    availableNumbers,
}: ProductVariantsProps) {
    return (
        <div className="flex flex-col gap-8">
            {/* Sizes */}
            {(adultSizes.length > 0 || youthSizes.length > 0) && (
                <div className="space-y-6">
                    {adultSizes.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Ruler size={12} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/50">
                                    Available Adult Sizes
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {adultSizes.map((size) => (
                                    <div
                                        key={size}
                                        className="h-10 min-w-[44px] px-3 flex items-center justify-center text-[10px] font-black uppercase tracking-widest border border-secondary/15 text-secondary/60 bg-secondary/[0.02]"
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {youthSizes.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Ruler size={12} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/50">
                                    Available Youth Sizes
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {youthSizes.map((size) => (
                                    <div
                                        key={size}
                                        className="h-10 min-w-[44px] px-3 flex items-center justify-center text-[10px] font-black uppercase tracking-widest border border-secondary/15 text-secondary/60 bg-secondary/[0.02]"
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Jersey Number */}
            {availableNumbers && availableNumbers.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Hash size={12} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/50">
                            Jersey Numbers In Stock
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {availableNumbers.map((num) => (
                            <div
                                key={num}
                                className="h-9 min-w-[40px] px-2 flex items-center justify-center text-[10px] font-black uppercase tracking-widest border border-secondary/15 text-secondary/60 bg-secondary/[0.02]"
                            >
                                #{num}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CTA */}
            <div className="border-t border-black/5 pt-8 flex flex-col gap-4">
                <p className="text-xs text-secondary/50 font-medium leading-relaxed">
                    Online ordering is currently unavailable. This store displays our current inventory for viewing purposes only.
                    If you'd like to reserve an item or have questions about a specific size, please reach out to our team directly.
                    Availability is subject to our <Link href="/refund-policy" className="underline hover:text-primary">Refund Policy</Link>.
                </p>

                <Link href="/contact">
                    <CustomButton
                        size="lg"
                        className="w-full flex items-center justify-center gap-3 text-sm h-16"
                    >
                        <Phone size={14} strokeWidth={3} />
                        Contact for Inquiries →
                    </CustomButton>
                </Link>

                <a
                    href="https://instagram.com/allstarapparel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-colors pt-2"
                >
                    <Instagram size={11} /> DM us on Instagram @allstarapparel
                </a>
            </div>
        </div>
    )
}
