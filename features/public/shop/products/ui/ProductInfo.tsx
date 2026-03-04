interface ProductInfoProps {
    sportName: string
    subcategoryName: string
    productName: string
    description: string
    price: number
}

export function ProductInfo({
    sportName,
    subcategoryName,
    productName,
    description,
    price
}: ProductInfoProps) {
    return (
        <div className="flex flex-col gap-6">
            {/* Title */}
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-3">
                    {sportName} — {subcategoryName}
                </h4>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        {productName}
                    </h1>
                    <span className="text-3xl font-black text-primary italic">
                        ${price ? Number(price).toFixed(2) : "0.00"}
                    </span>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-secondary/60 font-medium leading-relaxed border-l-2 border-primary/20 pl-4">
                {description}
            </p>
        </div>
    )
}
