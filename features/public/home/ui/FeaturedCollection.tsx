import Image from "next/image"
import Link from "next/link"
import { CustomButton } from "@/shared/ui/branded/CustomButton"

import { JERSEY_PRODUCTS } from "@/features/public/shop/products/data/mock-products"
import { ProductCard } from "@/features/public/shop/products/ui/ProductCard"

export function FeaturedCollection() {
    const featured = JERSEY_PRODUCTS.slice(0, 6)

    return (
        <section className="py-24 px-6 bg-white border-t border-black/5">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div>
                        <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-3">Top Picks</h4>
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                            Featured <span className="text-primary">Collections</span>
                        </h2>
                    </div>
                    <Link href="/shop">
                        <CustomButton variant="outline" size="sm" className="border-secondary/20 text-secondary uppercase tracking-widest text-xs shrink-0">
                            Browse All →
                        </CustomButton>
                    </Link>
                </div>

                {/* Jersey Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
                    {featured.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
