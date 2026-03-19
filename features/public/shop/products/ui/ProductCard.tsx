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
                <div className="absolute inset-0 p-3 pointer-events-none flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        {product.tag ? (
                            <div className="bg-secondary/80 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 shadow-sm">
                                {product.tag}
                            </div>
                        ) : <div />}
                        
                        {product.isOnSale && product.saleText && (
                            <div className="bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center text-center text-[8px] font-black uppercase tracking-tight shadow-lg rotate-12 flex-shrink-0 animate-pulse-subtle">
                                <span className="leading-[0.85]">{product.saleText.split(' ').join('\n')}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-all duration-300 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary border border-primary bg-white px-4 py-2">
                        View Details →
                    </span>
                </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] md:text-[16px] font-black uppercase italic tracking-tight text-secondary leading-tight">
                        {product.name}
                    </h3>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-secondary/30 mt-1">
                        {product.sport}
                    </p>
                </div>
                <div className="shrink-0 flex flex-col items-end">
                    {product.isOnSale && product.originalPrice && (
                        <span className="text-[10px] font-bold text-secondary/30 line-through italic leading-none mb-1">
                            ${Number(product.originalPrice).toFixed(2)}
                        </span>
                    )}
                    <span className="text-xs md:text-sm font-black text-primary">
                        ${product.price ? Number(product.price).toFixed(2) : "0.00"}
                    </span>
                </div>
            </div>
        </Link>
    )
}
