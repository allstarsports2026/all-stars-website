"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { CustomButton } from "@/shared/ui/branded/CustomButton"
import { authClient } from "@/lib/auth-client"
import { Menu, X, ChevronDown, LayoutDashboard } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavbarProps {
    initialSports: any[]
}

export function Navbar({ initialSports }: NavbarProps) {
    const { data: session } = authClient.useSession()
    const [isOpen, setIsOpen] = React.useState(false)
    const [collectionsOpen, setCollectionsOpen] = React.useState(false)
    const pathname = usePathname()
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    React.useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setCollectionsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const [expandedSport, setExpandedSport] = React.useState<string | null>(null)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center group shrink-0">
                    <div className="relative h-14 w-auto overflow-hidden">
                        <Image
                            src="/logo.png"
                            alt="Allstar Sports Apparel"
                            width={140}
                            height={56}
                            className="h-14 w-auto object-contain transform transition-transform duration-300 group-hover:scale-105"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10">
                    <Link
                        href="/"
                        className={cn(
                            "text-xs font-black uppercase tracking-widest transition-colors",
                            pathname === "/" ? "text-primary border-b-2 border-primary pb-0.5" : "text-foreground/40 hover:text-primary"
                        )}
                    >
                        Home
                    </Link>

                    {/* Collections Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setCollectionsOpen(!collectionsOpen)}
                            className={cn(
                                "flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-colors",
                                pathname === "/shop" || pathname.startsWith("/shop/") ? "text-primary" : "text-foreground/40 hover:text-primary"
                            )}
                        >
                            Collections
                            <ChevronDown size={14} strokeWidth={3} className={cn("transition-transform duration-200", collectionsOpen && "rotate-180")} />
                        </button>

                        {/* Mega Dropdown */}
                        {collectionsOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[520px] bg-white border border-black/5 shadow-xl p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                                {initialSports.map((sport) => (
                                    <div key={sport.slug} className="flex flex-col gap-2">
                                        <Link
                                            href={`/shop/${sport.slug}`}
                                            onClick={() => setCollectionsOpen(false)}
                                            className="text-xs font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors"
                                        >
                                            {sport.name}
                                        </Link>
                                        {sport.categories.map((cat: any) => (
                                            <Link
                                                key={cat.slug}
                                                href={`/shop/${sport.slug}?cat=${cat.slug}`}
                                                onClick={() => setCollectionsOpen(false)}
                                                className="text-[10px] font-bold uppercase tracking-widest text-secondary/30 hover:text-primary transition-colors pl-3 border-l border-primary/20"
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                                {/* View All footer */}
                                <div className="col-span-3 pt-4 border-t border-black/5 flex justify-end">
                                    <Link
                                        href="/shop"
                                        onClick={() => setCollectionsOpen(false)}
                                        className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity"
                                    >
                                        View All Collections →
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link
                        href="/about"
                        className={cn(
                            "text-xs font-black uppercase tracking-widest transition-colors",
                            pathname === "/about" ? "text-primary border-b-2 border-primary pb-0.5" : "text-foreground/40 hover:text-primary"
                        )}
                    >
                        Our Story
                    </Link>
                    <Link
                        href="/contact"
                        className={cn(
                            "text-xs font-black uppercase tracking-widest transition-colors",
                            pathname === "/contact" ? "text-primary border-b-2 border-primary pb-0.5" : "text-foreground/40 hover:text-primary"
                        )}
                    >
                        Contact Us
                    </Link>
                </div>

                {/* Conditionally show Dashboard link if authenticated */}
                {session && (
                    <div className="hidden lg:flex items-center gap-6">
                        <Link href="/admin">
                            <CustomButton variant="outline" size="sm" className="shadow-none border-secondary text-xs uppercase tracking-widest px-6 h-10 flex items-center gap-2">
                                <LayoutDashboard size={14} /> Dashboard
                            </CustomButton>
                        </Link>
                    </div>
                )}

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-secondary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-secondary/10 px-8 pb-10 pt-6 flex flex-col gap-5 animate-in slide-in-from-top-4 duration-300 max-h-[85vh] overflow-y-auto">
                    <Link href="/" className="text-lg font-black uppercase italic tracking-tighter text-foreground" onClick={() => setIsOpen(false)}>Home</Link>

                    {/* Sports in mobile */}
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Collections</span>
                        {initialSports.map((sport) => (
                            <div key={sport.slug} className="flex flex-col">
                                <div className="flex items-center justify-between py-1">
                                    <Link
                                        href={`/shop/${sport.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="text-base font-black uppercase italic tracking-tighter text-foreground hover:text-primary transition-colors"
                                    >
                                        {sport.name}
                                    </Link>
                                    <button
                                        onClick={() => setExpandedSport(expandedSport === sport.slug ? null : sport.slug)}
                                        className="p-2 text-secondary/40 hover:text-primary transition-colors"
                                    >
                                        <ChevronDown size={18} className={cn("transition-transform duration-200", expandedSport === sport.slug && "rotate-180")} />
                                    </button>
                                </div>

                                {expandedSport === sport.slug && (
                                    <div className="flex flex-col gap-3 py-3 pl-4 border-l border-primary/10 animate-in fade-in slide-in-from-top-1 duration-200">
                                        {sport.categories.map((cat: any) => (
                                            <Link
                                                key={cat.slug}
                                                href={`/shop/${sport.slug}?cat=${cat.slug}`}
                                                onClick={() => setIsOpen(false)}
                                                className="text-[11px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary"
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <Link href="/about" className="text-lg font-black uppercase italic tracking-tighter text-foreground" onClick={() => setIsOpen(false)}>Our Story</Link>
                    <Link href="/contact" className="text-lg font-black uppercase italic tracking-tighter text-foreground" onClick={() => setIsOpen(false)}>Contact Us</Link>

                    {session && (
                        <Link href="/admin" onClick={() => setIsOpen(false)}>
                            <CustomButton variant="default" size="lg" className="w-full h-14 flex items-center justify-center uppercase italic tracking-widest mt-2 gap-3 text-sm">
                                <LayoutDashboard size={18} /> Admin Dashboard
                            </CustomButton>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    )
}

