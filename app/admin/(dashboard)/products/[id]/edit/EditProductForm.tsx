"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CldUploadWidget } from "next-cloudinary"
import { toast } from "sonner"
import {
    Plus,
    X,
    Save,
    Hash,
    Ruler,
    Loader2,
    ArrowLeft,
    Image as ImageIcon
} from "lucide-react"
import { updateProduct } from "@/lib/actions/admin"
import { CustomButton } from "@/shared/ui/branded/CustomButton"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface EditProductFormProps {
    product: {
        id: string
        name: string
        description: string
        images: string[]
        sportId: string
        categoryId: string
        tag: string | null
        adultSizes: string[]
        youthSizes: string[]
        numbers: string[] | null
        price: number
    }
    sports: { id: string; name: string }[]
    categories: { id: string; name: string; sportId: string }[]
}

export function EditProductForm({ product, sports, categories }: EditProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [imageUrls, setImageUrls] = useState<string[]>(product.images)

    // Form State
    const [adultSizes, setAdultSizes] = useState<string[]>(product.adultSizes)
    const [youthSizes, setYouthSizes] = useState<string[]>(product.youthSizes)
    const [numbers, setNumbers] = useState<string[]>(product.numbers || [])

    const toggleSize = (size: string, type: "adult" | "youth") => {
        const list = type === "adult" ? adultSizes : youthSizes
        const setList = type === "adult" ? setAdultSizes : setYouthSizes
        if (list.includes(size)) setList(list.filter((s) => s !== size))
        else setList([...list, size])
    }

    async function onSubmit(formData: FormData) {
        setLoading(true)
        try {
            if (imageUrls.length === 0) throw new Error("At least one image required")

            await updateProduct(product.id, {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                images: imageUrls,
                sportId: formData.get("sportId") as string,
                categoryId: formData.get("categoryId") as string,
                tag: formData.get("tag") as string,
                adultSizes,
                youthSizes,
                numbers,
                price: Number(formData.get("price")),
            })

            toast.success("Product updated successfully!")
            router.push(`/admin/products/${product.id}`)
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error("Failed to update product.")
        } finally {
            setLoading(false)
        }
    }

    const inputClasses = "w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-colors text-secondary placeholder:text-slate-300 placeholder:font-medium placeholder:uppercase"
    const selectClasses = "w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary transition-colors text-secondary appearance-none"

    return (
        <div className="space-y-12">
            {/* Context Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <Link
                        href={`/admin/products/${product.id}`}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary/50 hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft size={14} /> Back to Product Details
                    </Link>
                    <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-2">
                        Admin Workspace
                    </h4>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        <span className="text-primary underline decoration-4 underline-offset-8">EDIT</span> {product.name}
                    </h1>
                </div>
            </div>

            <form action={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left Col: Visuals (4/12) */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-2">Phase 01</h4>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-secondary">Media Asset</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {/* Primary Image Preview */}
                            <div className="aspect-[3/4] bg-slate-50 border border-slate-100 relative overflow-hidden flex items-center justify-center p-8 group">
                                {imageUrls[0] ? (
                                    <>
                                        <img src={imageUrls[0]} className="w-full h-full object-contain" alt="Primary" />
                                        <button
                                            type="button"
                                            onClick={() => setImageUrls(prev => prev.filter((_, i) => i !== 0))}
                                            className="absolute top-4 right-4 h-8 w-8 bg-white border border-black/5 flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                                        >
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center space-y-3 opacity-20">
                                        <ImageIcon size={48} className="mx-auto" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Main Preview</p>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails & Upload */}
                            <div className="grid grid-cols-4 gap-3">
                                {imageUrls.slice(1).map((url, idx) => (
                                    <div key={idx} className="aspect-square bg-slate-50 border border-slate-100 relative group overflow-hidden">
                                        <img src={url} className="w-full h-full object-contain p-2" alt={`Gallery ${idx}`} />
                                        <button
                                            type="button"
                                            onClick={() => setImageUrls(prev => prev.filter((_, i) => i !== idx + 1))}
                                            className="absolute inset-0 bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <X size={14} />
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
                                                className="aspect-square border-2 border-dashed border-slate-200 hover:border-primary/30 flex items-center justify-center transition-all bg-white group"
                                            >
                                                <Plus size={20} className="text-slate-200 group-hover:text-primary transition-colors" />
                                            </button>
                                        )}
                                    </CldUploadWidget>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Details (8/12) */}
                <div className="lg:col-span-8 space-y-16">

                    {/* General Info */}
                    <div className="space-y-10">
                        <div>
                            <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-2">Phase 02</h4>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-secondary">Core specifications</h3>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/50">Product Name</label>
                                <input
                                    name="name"
                                    required
                                    defaultValue={product.name}
                                    className={inputClasses}
                                    placeholder="E.G. VINTAGE FOOTBALL KIT"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/50">Detailed Description</label>
                                <textarea
                                    name="description"
                                    required
                                    defaultValue={product.description}
                                    className={cn(inputClasses, "min-h-[100px] resize-none")}
                                    placeholder="DESCRIBE THE MATERIALS, FIT, AND STYLE..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/50">Classification</label>
                                    <select name="sportId" required defaultValue={product.sportId} className={selectClasses}>
                                        <option value="">SELECT SPORT...</option>
                                        {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/50">Category Tag</label>
                                    <select name="categoryId" required defaultValue={product.categoryId} className={selectClasses}>
                                        <option value="">SELECT CATEGORY...</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/50">Listing Tag</label>
                                    <input name="tag" defaultValue={product.tag || ""} className={inputClasses} placeholder="E.G. LIMITED EDITION" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/50">Price (USD)</label>
                                    <input name="price" type="number" step="0.01" required defaultValue={product.price} className={inputClasses} placeholder="29.99" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modification Control */}
                    <div className="space-y-10 border-t border-black/5 pt-16">
                        <div>
                            <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-2">Phase 03</h4>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-secondary">Product Variants</h3>
                        </div>

                        <div className="space-y-12">
                            {/* Sizes */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Ruler size={14} className="text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Available Sizes</span>
                                </div>

                                <div className="space-y-6">
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

                            {/* Numbers */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Hash size={14} className="text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Product Numbers</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {numbers.map((num, i) => (
                                        <div key={i} className="bg-slate-50 border border-black/5 px-3 py-2 flex items-center gap-2 group/num">
                                            <span className="text-[10px] font-black text-secondary">#{num}</span>
                                            <button type="button" onClick={() => setNumbers(numbers.filter((_, idx) => idx !== i))} className="text-secondary/50 hover:text-red-500 transition-colors">
                                                <X size={10} />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="flex items-center">
                                        <input
                                            id="editNewNumber"
                                            placeholder="Add #"
                                            className="w-16 h-10 border-b border-black/10 bg-transparent px-2 text-[10px] font-black focus:outline-none focus:border-primary"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    const input = e.currentTarget as HTMLInputElement
                                                    if (input.value) {
                                                        setNumbers([...numbers, input.value])
                                                        input.value = ''
                                                    }
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const input = document.getElementById('editNewNumber') as HTMLInputElement
                                                if (input.value) {
                                                    setNumbers([...numbers, input.value])
                                                    input.value = ''
                                                }
                                            }}
                                            className="h-10 w-10 flex items-center justify-center text-primary"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Submission */}
                    <div className="pt-10 border-t border-black/5">
                        <CustomButton
                            type="submit"
                            disabled={loading || imageUrls.length === 0}
                            className="w-full h-20 text-lg flex items-center justify-center gap-4 group bg-secondary hover:bg-primary text-white transition-all shadow-2xl shadow-primary/10"
                        >
                            {loading ? (
                                <div className="flex items-center gap-3">
                                    <Loader2 size={24} className="animate-spin" />
                                    <span>COMMITING CHANGES...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Save size={20} className="group-hover:translate-x-1 transition-transform" />
                                    <span className="uppercase tracking-widest font-black italic">Submit</span>
                                </div>
                            )}
                        </CustomButton>
                    </div>
                </div>
            </form>
        </div>
    )
}
