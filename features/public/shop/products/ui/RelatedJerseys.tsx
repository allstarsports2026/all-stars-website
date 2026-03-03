import { ProductCard } from "@/features/public/shop/products/ui/ProductCard"
import { JerseyProduct } from "@/features/public/shop/products/types"

interface RelatedJerseysProps {
    sportName: string
    relatedProducts: JerseyProduct[]
}

export function RelatedJerseys({ sportName, relatedProducts }: RelatedJerseysProps) {
    if (relatedProducts.length === 0) return null

    return (
        <div className="mt-24 border-t border-black/5 pt-16">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-secondary/30 mb-8">
                More {sportName} Jerseys
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    )
}
