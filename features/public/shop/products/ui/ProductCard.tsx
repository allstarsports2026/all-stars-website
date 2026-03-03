import Image from "next/image"
import Link from "next/link"
import { JerseyProduct } from "@/features/public/shop/products/types"

interface ProductCardProps {
    product: JerseyProduct
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            href={`/shop/${product.sport}/${product.id}`}
            className="group cursor-pointer block"
        >
            {/* Image Container — same as FeaturedCollection */}
            <div className="relative aspect-[3/4] bg-secondary/[0.03] overflow-hidden border border-black/5 group-hover:border-primary/20 transition-all duration-300">
                <Image
                    src={product.imgs[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                {product.tag && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-[9px] font-black uppercase tracking-widest px-2 py-1">
                        {product.tag}
                    </div>
                )}
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-all duration-300 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary border border-primary bg-white px-4 py-2">
                        View Details →
                    </span>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-black uppercase italic tracking-tight text-secondary">
                    {product.name}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/30 mt-1">
                    {product.sport.charAt(0).toUpperCase() + product.sport.slice(1)}
                </p>
            </div>
        </Link>
    )
}
