import { getCategoriesWithSports, getSports, addCategory } from "@/lib/actions/admin"
import { format } from "date-fns"
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
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-3">Management Portal</h4>
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        <span className="text-primary">ALL</span>STAR <span className="opacity-10">/</span> CATEGORIES
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-10 border border-slate-100">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-secondary mb-2">Add New Category</h3>
                                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed">
                                    Link a new segment to an existing sport.
                                </p>
                            </div>

                            <form action={handleAddCategory} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Parent Sport</label>
                                    <select
                                        name="sportId"
                                        required
                                        className="w-full bg-slate-50 border border-slate-100 rounded-none px-6 py-4 text-sm font-black text-secondary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none uppercase"
                                    >
                                        <option value="" className="text-slate-200">SELECT SPORT...</option>
                                        {sports.map((s) => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Category Name</label>
                                    <input
                                        name="name"
                                        required
                                        placeholder="e.g. VINTAGE"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-none px-6 py-4 text-sm font-black text-secondary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-200 uppercase"
                                    />
                                </div>

                                <button className="w-full h-16 bg-secondary text-white hover:bg-primary transition-all flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest italic shadow-xl shadow-secondary/10 hover:shadow-primary/20">
                                    Create Category <Plus size={16} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-6">


                    <div className="grid grid-cols-1 gap-2">
                        {categoriesList.length === 0 ? (
                            <div className="py-24 text-center bg-white border border-slate-100">
                                <Layers size={48} className="mx-auto text-slate-100 mb-6" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No categories registered in system</p>
                            </div>
                        ) : (
                            categoriesList.map((cat) => (
                                <div key={cat.id} className="bg-white border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between group hover:ring-2 hover:ring-primary/5 transition-all gap-4">
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary transition-all">
                                            <Layers size={18} className="text-slate-200 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary uppercase">
                                                <Trophy size={10} /> {(cat as any).sport.name}
                                            </div>
                                            <h4 className="text-lg font-black uppercase italic tracking-tight text-secondary leading-none mt-1">{cat.name}</h4>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-slate-50 pt-4 md:pt-0 md:pl-8">
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[9px] font-black text-slate-200 uppercase tracking-[0.2em]">URL Segment</span>
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{cat.slug}</span>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[9px] font-black text-slate-200 uppercase tracking-[0.2em]">Created</span>
                                            <span className="text-[10px] font-black text-slate-300">{format(new Date(cat.createdAt), 'MMM yyyy')}</span>
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
