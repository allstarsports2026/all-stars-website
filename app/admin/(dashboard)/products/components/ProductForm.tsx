"use client"

import { useState } from "react"
import { CldUploadWidget } from "next-cloudinary"
import { toast } from "sonner"
import {
    Plus,
    X,
    Image as ImageIcon,
    Trash2,
    Palette,
    Hash,
    Ruler,
    Shirt,
    Loader2
} from "lucide-react"
import { addProduct } from "@/lib/actions/admin"
import { CustomButton } from "@/shared/ui/branded/CustomButton"
import { cn } from "@/lib/utils"

interface ProductFormProps {
    sports: any[]
    categories: any[]
}

export function ProductForm({ sports, categories }: ProductFormProps) {
    const [loading, setLoading] = useState(false)
    const [imageUrls, setImageUrls] = useState<string[]>([])

    // Form State
    const [adultSizes, setAdultSizes] = useState<string[]>(["S", "M", "L", "XL", "XXL"])
    const [youthSizes, setYouthSizes] = useState<string[]>(["YXS", "YS", "YM", "YL", "YXL"])
    const [colors, setColors] = useState<{ name: string, hex: string }[]>([
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" }
    ])
    const [numbers, setNumbers] = useState<string[]>(["0", "1", "7", "9", "10", "11", "23", "99"])

    // Helper for adding/removing items
    const toggleSize = (size: string, type: 'adult' | 'youth') => {
        const list = type === 'adult' ? adultSizes : youthSizes
        const setList = type === 'adult' ? setAdultSizes : setYouthSizes
        if (list.includes(size)) setList(list.filter(s => s !== size))
        else setList([...list, size])
    }

    const addColor = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get("colorName") as string
        const hex = formData.get("colorHex") as string
        if (name && hex) {
            setColors([...colors, { name, hex }])
            e.currentTarget.reset()
        }
    }

    const removeColor = (index: number) => setColors(colors.filter((_, i) => i !== index))

    async function onSubmit(formData: FormData) {
        setLoading(true)
        try {
            if (imageUrls.length === 0) throw new Error("At least one image required")

            await addProduct({
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                images: imageUrls,
                sportId: formData.get("sportId") as string,
                categoryId: formData.get("categoryId") as string,
                tag: formData.get("tag") as string,
                adultSizes,
                youthSizes,
                colors: colors.length > 0 ? JSON.stringify(colors) : undefined,
                numbers,
            })

            // Reset form
            setImageUrls([])
            window.location.reload() // Simple way to reset everything for now
        } catch (error) {
            console.error(error)
            toast.error("Failed to add product entry.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form action={onSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left: General Info & Image */}
            <div className="space-y-10">
                <div className="bg-secondary p-8 border border-white/5 space-y-8">
                    <h3 className="text-lg font-black uppercase italic tracking-tight text-white">Visual Identity</h3>

                    {/* Cloudinary Widget */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Display Images ({imageUrls.length}/5)</label>
                            {imageUrls.length > 0 && (
                                <button type="button" onClick={() => setImageUrls([])} className="text-[8px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">Clear All</button>
                            )}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {imageUrls.map((url, idx) => (
                                <div key={idx} className="relative aspect-square border border-white/10 bg-white/5 overflow-hidden">
                                    <img
                                        src={url}
                                        alt={`Product image ${idx + 1}`}
                                        className="w-full h-full object-contain p-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setImageUrls(prev => prev.filter((_, i) => i !== idx))}
                                        className="absolute top-0 right-0 h-6 w-6 bg-primary text-white flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                                        title="Remove Image"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}

                            {imageUrls.length < 5 && (
                                <CldUploadWidget
                                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                    onSuccess={(result: any) => {
                                        if (imageUrls.length < 5) {
                                            setImageUrls(prev => [...prev, result.info.secure_url])
                                        }
                                    }}
                                >
                                    {({ open }) => (
                                        <button
                                            type="button"
                                            onClick={() => open()}
                                            className="aspect-square border-2 border-dashed border-white/10 hover:border-primary/30 flex flex-col items-center justify-center gap-2 transition-all group"
                                        >
                                            <Plus size={20} className="text-white/10 group-hover:text-primary transition-colors" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">Add Image</span>
                                        </button>
                                    )}
                                </CldUploadWidget>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Product Name</label>
                            <input name="name" required className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm font-black text-white focus:outline-none focus:border-primary uppercase rounded-none" placeholder="E.G. CLASSIC JERSEY" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Description</label>
                            <textarea name="description" required className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm font-medium text-white/60 focus:outline-none focus:border-primary min-h-[120px] rounded-none" placeholder="Enter product details..." />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-black/5 p-6 md:p-8 space-y-6">
                    <h3 className="text-lg font-black uppercase italic tracking-tight text-secondary">Classification</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-1">Sport</label>
                            <select name="sportId" required className="w-full border border-slate-100 bg-slate-50 px-6 py-4 text-[10px] font-black uppercase tracking-widest rounded-none focus:ring-4 focus:ring-primary/10 transition-all outline-none">
                                <option value="">SELECT...</option>
                                {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-1">Category</label>
                            <select name="categoryId" required className="w-full border border-slate-100 bg-slate-50 px-6 py-4 text-[10px] font-black uppercase tracking-widest rounded-none focus:ring-4 focus:ring-primary/10 transition-all outline-none">
                                <option value="">SELECT...</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-1">Tag (Optional)</label>
                        <input name="tag" placeholder="e.g. NEW ARRIVAL" className="w-full border border-slate-100 bg-slate-50 px-6 py-4 text-[10px] font-black uppercase tracking-widest rounded-none focus:ring-4 focus:ring-primary/10 transition-all outline-none" />
                    </div>
                </div>
            </div>

            {/* Right: Variants */}
            <div className="space-y-10">

                {/* Sizes */}
                <div className="bg-white border border-black/5 p-6 md:p-8 space-y-8">
                    <div className="flex items-center gap-4">
                        <Ruler size={18} className="text-primary" />
                        <h3 className="text-lg font-black uppercase italic tracking-tight text-secondary">Size Options</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 ml-1">Adult Sizes</p>
                            <div className="flex flex-wrap gap-2">
                                {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => toggleSize(size, 'adult')}
                                        className={cn(
                                            "h-10 min-w-[50px] px-3 font-black text-[10px] uppercase border transition-all",
                                            adultSizes.includes(size) ? "bg-primary text-white border-primary" : "bg-transparent text-secondary/30 border-black/5 hover:border-primary/30"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 ml-1">Youth Sizes</p>
                            <div className="flex flex-wrap gap-2">
                                {["YXS", "YS", "YM", "YL", "YXL"].map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => toggleSize(size, 'youth')}
                                        className={cn(
                                            "h-10 min-w-[50px] px-3 font-black text-[10px] uppercase border transition-all",
                                            youthSizes.includes(size) ? "bg-secondary text-white border-secondary" : "bg-transparent text-secondary/30 border-black/5 hover:border-secondary/30"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Colors (Commented out as per request)
                <div className="bg-white border border-black/5 p-6 md:p-8 space-y-8">
                    <div className="flex items-center gap-4">
                        <Palette size={18} className="text-primary" />
                        <h3 className="text-lg font-black uppercase italic tracking-tight text-secondary">Color Options</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-4">
                            {colors.map((color, i) => (
                                <div key={i} className="flex items-center gap-2 bg-surface-alt border border-black/5 px-3 py-2 pr-1">
                                    <div className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary/60">{color.name}</span>
                                    <button type="button" onClick={() => removeColor(i)} className="p-1 hover:text-red-500 transition-colors">
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input id="colorName" name="colorName" placeholder="Name" className="flex-1 border border-black/5 bg-surface-alt px-4 py-3 text-[10px] font-black uppercase tracking-widest" />
                            <input id="colorHex" name="colorHex" type="color" defaultValue="#ff0000" className="w-12 h-10 border-0 p-1 bg-surface-alt border-black/5 cursor-pointer" />
                            <button
                                type="button"
                                onClick={(e) => {
                                    const name = (document.getElementById('colorName') as HTMLInputElement).value;
                                    const hex = (document.getElementById('colorHex') as HTMLInputElement).value;
                                    if (name && hex) {
                                        setColors([...colors, { name, hex }]);
                                        (document.getElementById('colorName') as HTMLInputElement).value = '';
                                    }
                                }}
                                className="bg-secondary text-white px-4 hover:bg-primary transition-all"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>
                </div> */}

                {/* Numbers */}
                <div className="bg-white border border-black/5 p-6 md:p-8 space-y-8">
                    <div className="flex items-center gap-3">
                        <Hash size={18} className="text-primary" />
                        <h3 className="text-lg font-black uppercase italic tracking-tight text-secondary">Available Numbers</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                            {numbers.map((num, i) => (
                                <div key={i} className="bg-surface-alt border border-black/5 px-3 py-2 flex items-center gap-2">
                                    <span className="text-[10px] font-black text-secondary">#{num}</span>
                                    <button type="button" onClick={() => setNumbers(numbers.filter((_, idx) => idx !== i))} className="hover:text-red-500 transition-colors">
                                        <X size={10} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input id="newNumber" placeholder="Add Number" className="flex-1 border border-black/5 bg-surface-alt px-4 py-3 text-[10px] font-black uppercase tracking-widest" />
                            <button
                                type="button"
                                onClick={() => {
                                    const input = document.getElementById('newNumber') as HTMLInputElement;
                                    if (input.value) {
                                        setNumbers([...numbers, input.value]);
                                        input.value = '';
                                    }
                                }}
                                className="bg-secondary text-white px-6 hover:bg-primary transition-all uppercase text-[10px] font-black tracking-widest"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="pt-6">
                    <CustomButton
                        type="submit"
                        disabled={loading || imageUrls.length === 0}
                        className="w-full h-20 text-lg flex items-center justify-center gap-4"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin text-white" />
                                SAVING...
                            </>
                        ) : (
                            <>
                                <Plus size={20} className="text-white" />
                                Save Product Entry →
                            </>
                        )}
                    </CustomButton>
                </div>
            </div>
        </form>
    )
}
