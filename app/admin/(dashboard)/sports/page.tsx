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
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-3">Management Portal</h4>
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        <span className="text-primary">ALL</span>STAR <span className="opacity-10">/</span> SPORTS
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-10 border border-slate-100">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-secondary mb-2">Add New Sport</h3>
                                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed">
                                    The system will automatically generate a slug and link for categories.
                                </p>
                            </div>

                            <form action={handleAddSport} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Sport Name</label>
                                    <input
                                        name="name"
                                        required
                                        placeholder="e.g. HOCKEY"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-none px-6 py-4 text-sm font-black text-secondary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-200 uppercase"
                                    />
                                </div>
                                <button className="w-full h-16 bg-secondary text-white hover:bg-primary transition-all flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest italic">
                                    Create Sport <Plus size={16} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Active Sports ({sports.length})</h2>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                            <Calendar size={12} /> Live Sync
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {sports.length === 0 ? (
                            <div className="py-24 text-center bg-white border border-slate-100">
                                <Trophy size={48} className="mx-auto text-slate-100 mb-6" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No sports registered in system</p>
                            </div>
                        ) : (
                            sports.map((sport) => (
                                <div key={sport.id} className="bg-white border border-slate-100 p-6 flex items-center justify-between group hover:ring-2 hover:ring-primary/5 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary transition-all">
                                            <Trophy size={18} className="text-slate-200 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black uppercase italic tracking-tight text-secondary leading-none mb-1">{sport.name}</h4>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                                                <Hash size={10} /> {sport.slug}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[9px] font-black text-slate-200 uppercase tracking-[0.2em]">Unique ID</span>
                                        <span className="text-[10px] font-black text-slate-300 font-mono select-all hover:text-primary transition-colors cursor-copy">{sport.id.slice(0, 8)}</span>
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
