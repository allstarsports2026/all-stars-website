"use client"

import { cn } from "@/lib/utils"

interface Tab {
    slug: string
    name: string
}

interface CategoryFiltersProps {
    tabs: Tab[]
    activeTab: string
    onTabChange: (slug: string) => void
}

export function CategoryFilters({ tabs, activeTab, onTabChange }: CategoryFiltersProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-12">
            {tabs.map((tab) => (
                <button
                    key={tab.slug}
                    onClick={() => onTabChange(tab.slug)}
                    className={cn(
                        "text-[10px] font-black uppercase tracking-widest px-4 py-2 border transition-all duration-200",
                        activeTab === tab.slug
                            ? "bg-primary text-white border-primary"
                            : "bg-transparent text-secondary/50 border-secondary/10 hover:border-primary/30 hover:text-primary"
                    )}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    )
}
