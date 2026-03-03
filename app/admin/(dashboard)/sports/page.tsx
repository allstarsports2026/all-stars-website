import { getSports, addSport } from "@/lib/actions/admin"
import {
    Trophy,
    Plus,
    Calendar,
    Hash,
    ChevronRight,
    Search
} from "lucide-react"

export const metadata = {
    title: "Manage Sports | Admin Portal",
}

export default async function AdminSports() {
    const sports = await getSports()

    async function handleAddSport(formData: FormData) {
        "use server"
        const name = formData.get("name") as string
        if (name) await addSport(name)
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-3">Athletic Infrastructure</h4>
                <div className="flex items-center justify-between">
                    <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        Sport <span className="text-secondary/20 block md:inline">Registry</span>
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-secondary p-8 border border-white/5 relative overflow-hidden group">
                        <div className="relative z-10 space-y-8">
                            <div>
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-white mb-2">Initialize New Sport</h3>
                                <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest leading-relaxed">
                                    System will automatically generate slug and category hooks.
                                </p>
                            </div>

                            <form action={handleAddSport} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Sport Nomenclature</label>
                                    <input
                                        name="name"
                                        required
                                        placeholder="e.g. HOCKEY"
                                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-sm font-black text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/10 uppercase"
                                    />
                                </div>
                                <button className="w-full h-14 bg-primary text-white hover:bg-white hover:text-secondary transition-all flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest italic group">
                                    Activate Registry <Plus size={16} />
                                </button>
                            </form>
                        </div>
                        {/* Background Decor */}
                        <Trophy size={120} className="absolute -bottom-6 -right-6 text-white/[0.02] rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-secondary/30">Active Manifest ({sports.length})</h2>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                            <Calendar size={12} /> Real-time Sync
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {sports.length === 0 ? (
                            <div className="py-24 text-center bg-white border border-black/5">
                                <Trophy size={48} className="mx-auto text-secondary/10 mb-6" />
                                <p className="text-sm font-black uppercase tracking-widest text-secondary/30">No sports registered in core db</p>
                            </div>
                        ) : (
                            sports.map((sport) => (
                                <div key={sport.id} className="bg-white border border-black/5 p-6 flex items-center justify-between group hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 bg-surface-alt flex items-center justify-center border border-black/5 group-hover:border-primary/20 transition-all">
                                            <Trophy size={18} className="text-secondary/20 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black uppercase italic tracking-tight text-secondary leading-none mb-1">{sport.name}</h4>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-secondary/30">
                                                <Hash size={10} /> {sport.slug}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Sport ID</span>
                                        <span className="text-[10px] font-black text-secondary/40 font-mono select-all hover:text-primary transition-colors cursor-copy">{sport.id.slice(0, 8)}...</span>
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
