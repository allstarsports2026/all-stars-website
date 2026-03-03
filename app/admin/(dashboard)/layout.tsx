import Link from "next/link"
import {
    LayoutDashboard,
    Trophy,
    Layers,
    Shirt,
    MessageSquare,
    LogOut,
    Menu,
    X
} from "lucide-react"
import { LogoutButton } from "./_components/LogoutButton"

export const metadata = {
    title: "Admin Dashboard | Allstar Sports Apparel",
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-surface-alt overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col bg-secondary border-r border-white/5">
                <div className="p-8">
                    <Link href="/admin" className="flex flex-col gap-1 group">
                        <span className="font-black text-2xl uppercase italic tracking-tighter text-white">
                            ALL<span className="text-primary">STAR</span>
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                            Admin Portal
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
                    {[
                        { name: "Overview", href: "/admin", icon: LayoutDashboard },
                        { name: "Sports", href: "/admin/sports", icon: Trophy },
                        { name: "Categories", href: "/admin/categories", icon: Layers },
                        { name: "Products", href: "/admin/products", icon: Shirt },
                        { name: "Messages", href: "/admin/messages", icon: MessageSquare },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-4 px-4 py-4 text-xs font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all group"
                        >
                            <item.icon size={18} className="text-primary group-hover:scale-110 transition-transform" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-6 md:p-12">
                    {children}
                </div>
            </main>
        </div>
    )
}
