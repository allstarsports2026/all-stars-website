"use client"

import React, { useState } from "react"
import { SPORTS } from "@/features/public/shop/categories/data/categories"
import { JERSEY_PRODUCTS } from "@/features/public/shop/products/data/mock-products"
import { ShopHeader } from "@/features/public/shop/shared/ui/ShopHeader"
import { CategoryFilters } from "@/features/public/shop/categories/ui/CategoryFilters"
import { ProductGridSection } from "./ProductGridSection"

export function ShopPageContent() {
    const allTab = { slug: "all", name: "All" }
    // Build flat tab list: All > Sport > Sport Vintage …
    const tabs = [
        allTab,
        ...SPORTS.flatMap((s) => [
            { slug: s.slug, name: s.name },
            ...s.subcategories.map((sub) => ({
                slug: sub.slug,
                name: `${s.name} — ${sub.name}`,
            })),
        ]),
    ]

    const [active, setActive] = useState("all")

    const filtered = React.useMemo(() => {
        if (active === "all") return JERSEY_PRODUCTS
        // Check if it's a sport slug or a subcategory slug
        const isSport = SPORTS.some((s) => s.slug === active)
        if (isSport) return JERSEY_PRODUCTS.filter((p) => p.sport === active)
        return JERSEY_PRODUCTS.filter((p) => p.category === active)
    }, [active])

    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">

                <ShopHeader
                    overline="Our Collections"
                    title="Shop All"
                    highlightedTitle="Jerseys"
                    description="Every jersey is made-to-order. Choose your sport, find the design you love, and reach out to us directly to customise your order."
                />

                <CategoryFilters
                    tabs={tabs}
                    activeTab={active}
                    onTabChange={setActive}
                />

                <ProductGridSection
                    products={filtered}
                />

                {/* Bottom CTA */}
                <div className="mt-24 border-t border-black/5 pt-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-secondary mb-4">
                        Don't see what you need?
                    </h2>
                    <p className="text-sm text-secondary/50 font-medium mb-8 max-w-md mx-auto leading-relaxed">
                        We do fully custom jersey orders. Just reach out and we'll make it happen.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-primary text-white text-xs font-black uppercase tracking-widest px-10 py-4 border-l-4 border-secondary shadow-[8px_8px_0px_var(--secondary)] hover:brightness-110 transition-all italic"
                    >
                        Contact Us →
                    </a>
                </div>
            </div>
        </div>
    )
}
