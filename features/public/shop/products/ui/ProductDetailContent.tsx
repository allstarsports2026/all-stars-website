"use client"

import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

// Components
import { ProductGallery } from "./ProductGallery"
import { ProductInfo } from "./ProductInfo"
import { ProductVariants } from "./ProductVariants"
import { RelatedJerseys } from "./RelatedJerseys"

interface ProductDetailContentProps {
    sportSlug: string
    product: any
    initialSports: any[]
    initialProducts: any[]
}

export function ProductDetailContent({ sportSlug, product, initialSports, initialProducts }: ProductDetailContentProps) {
    const sport = initialSports.find((s) => s.slug === sportSlug)

    // Related products (same sport, exclude current)
    const related = initialProducts
        .filter((p) => p.sport === sportSlug && p.id !== product.id)
        .slice(0, 3)


    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary/30 mb-12 flex-wrap">
                    <Link href="/shop" className="hover:text-primary transition-colors">Collections</Link>
                    <ChevronRight size={10} strokeWidth={3} />
                    <Link href={`/shop/${sportSlug}`} className="hover:text-primary transition-colors capitalize">
                        {sport?.name ?? sportSlug}
                    </Link>
                    <ChevronRight size={10} strokeWidth={3} />
                    <span className="text-primary">{product.name}</span>
                </nav>

                {/* Main product layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left — Product Gallery */}
                    <ProductGallery
                        img={product.img}
                        name={product.name}
                        tag={product.tag}
                    />

                    {/* Right — Product Details */}
                    <div className="flex flex-col gap-8">
                        <ProductInfo
                            sportName={sport?.name ?? sportSlug}
                            subcategoryName="Vintage Collection"
                            productName={product.name}
                            description={product.description}
                        />

                        <ProductVariants
                            adultSizes={product.adultSizes}
                            youthSizes={product.youthSizes}
                            availableColors={product.availableColors}
                            availableNumbers={product.availableNumbers}
                        />
                    </div>
                </div>

                {/* Related Jerseys */}
                <RelatedJerseys
                    sportName={sport?.name ?? sportSlug}
                    relatedProducts={related}
                />
            </div>
        </div>
    )
}
