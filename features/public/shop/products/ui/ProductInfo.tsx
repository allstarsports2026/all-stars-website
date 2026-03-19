interface ProductInfoProps {
    sportName: string
    subcategoryName: string
    productName: string
    description: string
    price: number
    originalPrice?: number | null
    isOnSale?: boolean
    saleText?: string | null
}

export function ProductInfo({
    sportName,
    subcategoryName,
    productName,
    description,
    price,
    originalPrice,
    isOnSale,
    saleText
}: ProductInfoProps) {
    return (
        <div className="flex flex-col gap-6">
            {/* Title */}
            <div>
                <div className="flex flex-wrap items-center gap-4 mb-3">
                    <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs">
                        {sportName} — {subcategoryName}
                    </h4>
                    {isOnSale && saleText && (
                        <div className="bg-primary text-white text-[9px] font-black px-3 py-1 uppercase tracking-[0.2em] italic rounded-full shadow-lg shadow-primary/20 animate-pulse">
                            SALE: {saleText}
                        </div>
                    )}
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        {productName}
                    </h1>
                    <div className="flex items-center gap-3">
                        {isOnSale && originalPrice && (
                            <span className="text-xl font-bold text-secondary/30 line-through italic">
                                ${Number(originalPrice).toFixed(2)}
                            </span>
                        )}
                        <span className="text-3xl font-black text-primary italic">
                            ${price ? Number(price).toFixed(2) : "0.00"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-secondary/60 font-medium leading-relaxed border-l-2 border-primary/20 pl-4">
                {description}
            </p>
        </div>
    )
}
