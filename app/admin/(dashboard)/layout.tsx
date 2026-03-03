import Link from "next/link"
import {
    LayoutDashboard,
    Trophy,
    Layers,
    Shirt,
    MessageSquare,
    LogOut
} from "lucide-react"
import { LogoutButton } from "./_components/LogoutButton"
import { MobileNav } from "./_components/MobileNav"
import { SidebarNav } from "./_components/SidebarNav"

export const metadata = {
    title: "Admin Dashboard | Allstar Sports Apparel",
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col lg:flex-row h-screen bg-slate-50 overflow-hidden">
            {/* Mobile Nav */}
            <MobileNav />

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-slate-100">
                <div className="p-8 bg-secondary">
                    <Link href="/admin" className="flex flex-col gap-1 group">
                        <span className="font-black text-2xl uppercase italic tracking-tighter text-white">
                            ALL<span className="text-primary">STAR</span>
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                            Admin Portal
                        </span>
                    </Link>
                </div>

                <SidebarNav />

                <div className="p-6 mt-auto border-t border-slate-50">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-6 md:p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

