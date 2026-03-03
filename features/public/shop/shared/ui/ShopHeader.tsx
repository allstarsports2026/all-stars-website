import { cn } from "@/lib/utils"

interface ShopHeaderProps {
    overline: string
    title: string
    highlightedTitle: string
    description?: string
}

export function ShopHeader({ overline, title, highlightedTitle, description }: ShopHeaderProps) {
    return (
        <div className="mb-16">
            <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-3">
                {overline}
            </h4>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                {title} <span className="text-primary">{highlightedTitle}</span>
            </h1>
            {description && (
                <p className="mt-5 text-sm text-secondary/50 font-medium max-w-lg leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    )
}
