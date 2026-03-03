"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { CustomButton } from "./CustomButton"
import { Menu, X, ShoppingBag, Search } from "lucide-react"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-primary/20">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden">
                        {/* Gradient Background placeholder for the logo's gray area */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent" />
                        <Image
                            src="/logo.JPG"
                            alt="Allstar Logo"
                            width={48}
                            height={48}
                            className="object-contain transform transition-transform group-hover:scale-110"
                            priority
                        />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-black text-2xl uppercase italic tracking-tighter">
                            ALL<span className="text-primary italic">STAR</span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">
                            Sports Apparel
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10">
                    <Link href="/collections" className="text-sm font-black uppercase italic tracking-widest hover:text-primary transition-colors">
                        Collections
                    </Link>
                    <Link href="/series" className="text-sm font-black uppercase italic tracking-widest hover:text-primary transition-colors">
                        Series
                    </Link>
                    <Link href="/custom" className="text-sm font-black uppercase italic tracking-widest hover:text-primary transition-colors">
                        Custom Gear
                    </Link>
                    <Link href="/about" className="text-sm font-black uppercase italic tracking-widest hover:text-primary transition-colors">
                        Our Story
                    </Link>
                </div>

                {/* Action Buttons */}
                <div className="hidden lg:flex items-center gap-6">
                    <button className="text-secondary/60 hover:text-primary transition-colors p-2">
                        <Search size={22} strokeWidth={2.5} />
                    </button>
                    {/* Note: User specified no buying, but we can have an 'Enquiry' or 'My List' bag */}
                    <button className="text-secondary/60 hover:text-primary transition-colors p-2 relative">
                        <ShoppingBag size={22} strokeWidth={2.5} />
                        <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center">0</span>
                    </button>
                    <CustomButton variant="default" size="sm">
                        Admin Log
                    </CustomButton>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-secondary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b-4 border-primary p-8 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
                    <Link href="/collections" className="text-3xl font-black uppercase italic tracking-tighter" onClick={() => setIsOpen(false)}>
                        Collections
                    </Link>
                    <Link href="/series" className="text-3xl font-black uppercase italic tracking-tighter" onClick={() => setIsOpen(false)}>
                        Series
                    </Link>
                    <Link href="/custom" className="text-3xl font-black uppercase italic tracking-tighter" onClick={() => setIsOpen(false)}>
                        Custom Gear
                    </Link>
                    <hr className="border-secondary/10" />
                    <CustomButton variant="default" size="lg" className="w-full">
                        Admin Log
                    </CustomButton>
                </div>
            )}
        </nav>
    )
}
