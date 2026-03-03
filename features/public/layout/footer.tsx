import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-black/5 bg-white py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Brand */}
                <div className="flex flex-col items-center md:items-start gap-1">
                    <span className="font-black text-2xl uppercase italic tracking-tighter text-secondary">
                        ALL<span className="text-primary">STAR</span>
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-secondary/30">
                        Sports Apparel
                    </span>
                </div>

                {/* Nav Links */}
                <div className="flex flex-wrap items-center justify-center gap-8">
                    {[
                        { name: "Home", href: "/" },
                        { name: "Collections", href: "/shop" },
                        { name: "Our Story", href: "/about" },
                        { name: "Contact", href: "/contact" },
                    ].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-5">
                    <a href="#" className="text-secondary/30 hover:text-primary transition-colors">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="text-secondary/30 hover:text-primary transition-colors">
                        <Twitter size={18} />
                    </a>
                    <a href="#" className="text-secondary/30 hover:text-primary transition-colors">
                        <Facebook size={18} />
                    </a>
                </div>
            </div>

            {/* Bottom line */}
            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-secondary/25">
                    © {new Date().getFullYear()} Allstar Sports Apparel. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <Link href="/privacy-policy" className="text-[9px] font-black uppercase tracking-widest text-secondary/25 hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="text-[9px] font-black uppercase tracking-widest text-secondary/25 hover:text-primary transition-colors">Terms of Service</Link>
                    <Link href="/refund-policy" className="text-[9px] font-black uppercase tracking-widest text-secondary/25 hover:text-primary transition-colors">Refund Policy</Link>
                </div>
            </div>
        </footer>
    )
}
