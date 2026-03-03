import { getCategoriesWithSports, getSports, addCategory } from "@/lib/actions/admin"
import {
    Layers,
    Plus,
    Calendar,
    Hash,
    Trophy,
    Tag
} from "lucide-react"

export const metadata = {
    title: "Manage Categories | Admin Portal",
}

export default async function AdminCategories() {
    const categoriesList = await getCategoriesWithSports()
    const sports = await getSports()

    async function handleAddCategory(formData: FormData) {
        "use server"
        const name = formData.get("name") as string
        const sportId = formData.get("sportId") as string
        if (name && sportId) await addCategory(name, sportId)
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-3">Modular Collection System</h4>
                <div className="flex items-center justify-between">
                    <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        Category <span className="text-secondary/20 block md:inline">Matrix</span>
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-secondary p-8 border border-white/5 relative overflow-hidden group">
                        <div className="relative z-10 space-y-8">
                            <div>
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-white mb-2">Create New Category</h3>
                                <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest leading-relaxed">
                                    Link a new collection segment to an existing sport vessel.
                                </p>
                            </div>

                            <form action={handleAddCategory} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Target Sport</label>
                                    <select
                                        name="sportId"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-sm font-black text-white focus:outline-none focus:border-primary transition-colors appearance-none uppercase"
                                    >
                                        <option value="" className="bg-secondary">SELECT TARGET...</option>
                                        {sports.map((s) => (
                                            <option key={s.id} value={s.id} className="bg-secondary">{s.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Category Name</label>
                                    <input
                                        name="name"
                                        required
                                        placeholder="e.g. VINTAGE"
                                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-sm font-black text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/10 uppercase"
                                    />
                                </div>

                                <button className="w-full h-14 bg-primary text-white hover:bg-white hover:text-secondary transition-all flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest italic group">
                                    Bridge Category <Plus size={16} />
                                </button>
                            </form>
                        </div>
                        {/* Background Decor */}
                        <Layers size={120} className="absolute -bottom-6 -right-6 text-white/[0.02] rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-secondary/30">Module Manifest ({categoriesList.length})</h2>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                            <Tag size={12} /> Live Linkages
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {categoriesList.length === 0 ? (
                            <div className="py-24 text-center bg-white border border-black/5">
                                <Layers size={48} className="mx-auto text-secondary/10 mb-6" />
                                <p className="text-sm font-black uppercase tracking-widest text-secondary/30">No categories mapped in core db</p>
                            </div>
                        ) : (
                            categoriesList.map((cat) => (
                                <div key={cat.id} className="bg-white border border-black/5 p-6 flex flex-col md:flex-row md:items-center justify-between group hover:border-primary/20 transition-all gap-4">
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 bg-surface-alt flex items-center justify-center border border-black/5 group-hover:border-primary/20 transition-all">
                                            <Layers size={18} className="text-secondary/20 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary uppercase">
                                                <Trophy size={10} /> {(cat as any).sport.name}
                                            </div>
                                            <h4 className="text-lg font-black uppercase italic tracking-tight text-secondary leading-none mt-1">{cat.name}</h4>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-black/5 pt-4 md:pt-0 md:pl-8">
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Slug Trace</span>
                                            <span className="text-[10px] font-black text-secondary/60 uppercase tracking-tighter">{cat.slug}</span>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Entry Date</span>
                                            <span className="text-[10px] font-black text-secondary/40">{format(new Date(cat.createdAt), 'MMM yyyy')}</span>
                                        </div>
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

function format(date: Date, str: string) {
    // Simple mock format for server component
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}
