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
import { formatDistanceToNow } from "date-fns"

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
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-3">Management Portal</h4>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        <span className="text-primary">ALL</span>STAR <span className="opacity-10">/</span> DASHBOARD
                    </h1>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white border border-slate-100 p-8 flex flex-col gap-6 relative overflow-hidden group hover:ring-4 hover:ring-primary/5 transition-all">
                        <div className="flex items-center justify-between relative z-10">
                            <span className="text-[10px] font-black text-white bg-secondary px-2 py-1 tracking-wider italic">{stat.trend}</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black text-secondary tracking-tighter mb-1">{stat.value}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.name}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Quick Actions</h2>
                    <div className="flex flex-col gap-3">
                        {[
                            { name: "Add New Product", icon: Shirt, href: "/admin/products" },
                            { name: "Manage Sports", icon: Trophy, href: "/admin/sports" },
                            { name: "View All Messages", icon: MessageSquare, href: "/admin/messages" },
                        ].map((action) => (
                            <Link
                                key={action.name}
                                href={action.href}
                                className="w-full flex items-center justify-between p-6 bg-secondary text-white group hover:bg-primary transition-all"
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <action.icon size={16} className="text-primary group-hover:text-white transition-colors" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{action.name}</span>
                                </div>
                                <ChevronRight size={14} className="relative z-10 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Recent Activity</h2>
                    <div className="bg-white border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                        {data.recentActivity.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No recent activity logged</p>
                            </div>
                        ) : (
                            data.recentActivity.map((item, i) => (
                                <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors gap-4 md:gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-slate-100 flex items-center justify-center font-black text-xs text-slate-400 shrink-0">
                                            #{i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-[11px] font-black uppercase tracking-tight text-secondary">New message from {item.firstName}</h4>
                                            <p className="text-[10px] font-medium text-slate-400 mt-1">{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:justify-end gap-4">
                                        <div className="md:hidden text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-1">New Entry</div>
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
