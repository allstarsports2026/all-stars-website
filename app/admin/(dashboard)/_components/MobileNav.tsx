"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Trophy,
    Layers,
    Shirt,
    MessageSquare,
    Menu,
    X,
} from "lucide-react"
import { LogoutButton } from "./LogoutButton"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Sports", href: "/admin/sports", icon: Trophy },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Products", href: "/admin/products", icon: Shirt },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
]

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <div className="lg:hidden">
            {/* Header / Trigger */}
            <div className="bg-secondary border-b border-white/5 px-6 h-20 flex items-center justify-between sticky top-0 z-50">
                <Link href="/admin" className="flex flex-col gap-0.5">
                    <span className="font-black text-xl uppercase italic tracking-tighter text-white">
                        ALL<span className="text-primary">STAR</span>
                    </span>
                    <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/30">
                        Admin Portal
                    </span>
                </Link>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="h-10 w-10 bg-white/5 flex items-center justify-center text-primary active:scale-95 transition-all"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Overlay Menu */}
            <div
                className={cn(
                    "fixed inset-0 top-20 bg-secondary z-[49] transition-all duration-500 flex flex-col transform",
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                )}
            >
                <nav className="flex-1 px-6 py-12 flex flex-col gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-6 px-4 py-5 text-[13px] font-black uppercase tracking-[0.2em] transition-all border-b border-white/5",
                                pathname === item.href
                                    ? "text-primary border-primary/20"
                                    : "text-white/40 border-white/5 active:text-white"
                            )}
                        >
                            <item.icon size={20} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-8 border-t border-white/5 bg-black/20">
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}
