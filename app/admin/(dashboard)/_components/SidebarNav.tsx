"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Trophy,
    Layers,
    Shirt,
    MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Sports", href: "/admin/sports", icon: Trophy },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Products", href: "/admin/products", icon: Shirt },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
]

export function SidebarNav() {
    const pathname = usePathname()

    return (
        <nav className="flex-1 px-4 py-8 flex flex-col gap-1">
            {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-4 px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all group relative",
                            isActive
                                ? "text-primary bg-slate-50"
                                : "text-slate-400 hover:text-secondary hover:bg-slate-50/50"
                        )}
                    >
                        {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                        )}
                        <item.icon
                            size={18}
                            className={cn(
                                "transition-transform group-hover:scale-110",
                                isActive ? "scale-110 text-primary" : "text-slate-300"
                            )}
                        />
                        {item.name}
                    </Link>
                )
            })}
        </nav>
    )
}
