import {
    Trophy,
    Layers,
    Shirt,
    MessageSquare,
    TrendingUp,
    ChevronRight,
    Search
} from "lucide-react"
import Link from "next/link"
import { getAdminStats } from "@/lib/actions/admin"

export default async function AdminDashboard() {
    const data = await getAdminStats()

    const stats = [
        { name: "Total Sports", value: data.sports.toString(), icon: Trophy, trend: "+0", color: "text-blue-500" },
        { name: "Categories", value: data.categories.toString(), icon: Layers, trend: "+0", color: "text-purple-500" },
        { name: "Total Products", value: data.products.toString(), icon: Shirt, trend: "+0", color: "text-primary" },
        { name: "Messages Received", value: data.messages.toString(), icon: MessageSquare, trend: "+0", color: "text-green-500" },
    ]

    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-3">System Overview</h4>
                <div className="flex items-center justify-between">
                    <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        Admin <span className="text-secondary/20 block md:inline">Command</span>
                    </h1>
                    <div className="hidden md:flex items-center gap-4 text-xs font-black uppercase tracking-widest text-secondary/30">
                        <TrendingUp size={16} className="text-primary" />
                        System Online
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white border border-black/5 p-8 flex flex-col gap-6 relative overflow-hidden group hover:border-primary/20 transition-all">
                        <div className="flex items-center justify-between relative z-10">
                            <stat.icon size={24} className={stat.color} />
                            <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5">{stat.trend}</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black text-secondary leading-none mb-2">{stat.value}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-secondary/30">{stat.name}</p>
                        </div>
                        {/* Decorative Background Icon */}
                        <stat.icon size={80} className="absolute -bottom-4 -right-4 text-secondary/[0.02] rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                ))}
            </div>

            {/* Quick Actions & Recent Messages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Quick Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-secondary/30">Quick Operations</h2>
                    <div className="flex flex-col gap-3">
                        {[
                            { name: "Add New Product", icon: Shirt, href: "/admin/products" },
                            { name: "Manage Sports", icon: Trophy, href: "/admin/sports" },
                            { name: "View All Messages", icon: MessageSquare, href: "/admin/messages" },
                        ].map((action) => (
                            <Link
                                key={action.name}
                                href={action.href}
                                className="w-full flex items-center justify-between p-5 bg-secondary text-white group hover:bg-primary transition-all overflow-hidden relative"
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <action.icon size={16} className="text-primary group-hover:text-white transition-colors" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{action.name}</span>
                                </div>
                                <ChevronRight size={14} className="relative z-10 transform group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Placeholder for Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-secondary/30">Recent Manifest</h2>
                    <div className="bg-white border border-black/5 divide-y divide-black/5">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-surface-alt flex items-center justify-center font-black text-xs text-secondary/40">
                                        #0{i}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-tight text-secondary">New Subscription Order Pending</h4>
                                        <p className="text-[10px] font-medium text-secondary/30 mt-1">Status: Logged into system database • 2h ago</p>
                                    </div>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
