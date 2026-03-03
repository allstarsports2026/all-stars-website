import Image from "next/image"

interface ProductGalleryProps {
    img: string
    name: string
    tag?: string | null
}

export function ProductGallery({ img, name, tag }: ProductGalleryProps) {
    return (
        <div className="relative aspect-[3/4] bg-secondary/[0.03] border border-black/5 overflow-hidden">
            <Image
                src={img}
                alt={name}
                fill
                className="object-contain p-10"
                priority
            />
            {tag && (
                <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5">
                    {tag}
                </div>
            )}
        </div>
    )
}
