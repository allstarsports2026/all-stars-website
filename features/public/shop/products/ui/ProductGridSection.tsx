import { ProductCard } from "./ProductCard"
import { JerseyProduct } from "@/features/public/shop/products/data/mock-products"

interface ProductGridSectionProps {
    products: JerseyProduct[]
    emptyMessage?: string
}

export function ProductGridSection({ products, emptyMessage = "No Jerseys Found" }: ProductGridSectionProps) {
    return (
        <>
            {/* Count */}
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/30 mb-8">
                {products.length} {products.length === 1 ? "design" : "designs"} found
            </p>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {products.length === 0 && (
                <div className="py-24 text-center">
                    <p className="text-2xl font-black uppercase italic tracking-tighter text-secondary/20">
                        {emptyMessage}
                    </p>
                </div>
            )}
        </>
    )
}
