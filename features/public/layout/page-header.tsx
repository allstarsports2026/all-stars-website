import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
    title: string
    description?: string
    breadcrumb?: string
    className?: string
}

export function PageHeader({ title, description, breadcrumb, className }: PageHeaderProps) {
    return (
        <section className={cn("relative overflow-hidden bg-surface-alt py-24 md:py-32", className)}>
            {/* Technical Background Architecture */}
            <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                    {breadcrumb && (
                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-px w-8 bg-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                                {breadcrumb}
                            </span>
                        </div>
                    )}

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-secondary leading-[0.85] tracking-tighter italic uppercase mb-8">
                        {title}
                    </h1>

                    {description && (
                        <p className="max-w-2xl text-[14px] md:text-[16px] text-muted-foreground font-medium leading-relaxed border-l-4 border-primary pl-8">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Visual Technical Element */}
            <div className="absolute bottom-0 right-0 p-8 hidden md:block">
                <div className="text-[120px] font-black text-secondary/[0.03] leading-none select-none tracking-tighter italic uppercase">
                    {title.split(' ')[0]}
                </div>
            </div>
        </section>
    )
}
