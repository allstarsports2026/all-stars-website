"use client"

import React, { useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ShopHeader } from "@/features/public/shop/shared/ui/ShopHeader"
import { CategoryFilters } from "./CategoryFilters"
import { ProductGridSection } from "@/features/public/shop/products/ui/ProductGridSection"

interface SportPageContentProps {
    sportSlug: string
    initialSports: any[]
    initialProducts: any[]
}

export function SportPageContent({ sportSlug, initialSports, initialProducts }: SportPageContentProps) {
    const sport = initialSports.find((s) => s.slug === sportSlug)
    if (!sport) notFound()

    // Tabs: All + each real category from DB
    const allTab = { slug: "all", name: "All" }
    const tabs = [allTab, ...sport.categories.map((cat: any) => ({ slug: cat.slug, name: cat.name }))]

    const [active, setActive] = useState("all")

    const filtered = React.useMemo(() => {
        const sportProducts = initialProducts.filter((p) => p.sport === sportSlug)
        if (active === "all") return sportProducts
        return sportProducts.filter((p) => p.category === active)
    }, [active, sportSlug, initialProducts])


    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary/30 mb-12">
                    <Link href="/shop" className="hover:text-primary transition-colors">Collections</Link>
                    <ChevronRight size={10} strokeWidth={3} />
                    <span className="text-primary">{sport.name}</span>
                </nav>

                <ShopHeader
                    overline={`${sport.name} Collection`}
                    title={sport.name}
                    highlightedTitle="Jerseys"
                />

                <CategoryFilters
                    tabs={tabs}
                    activeTab={active}
                    onTabChange={setActive}
                />

                <ProductGridSection
                    products={filtered}
                    emptyMessage="No Designs in This Category"
                />

                {/* Other sports */}
                <div className="mt-24 border-t border-black/5 pt-16">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-secondary/30 mb-6">
                        Other Sports
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {initialSports.filter((s) => s.slug !== sportSlug).map((s: any) => (
                            <Link
                                key={s.slug}
                                href={`/shop/${s.slug}`}
                                className="text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-secondary/10 text-secondary/50 hover:border-primary hover:text-primary transition-all"
                            >
                                {s.name} →
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
