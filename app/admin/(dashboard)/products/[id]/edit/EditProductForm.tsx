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
    ArrowLeft
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

    // Form State — pre-populated from product
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
        } catch (error) {
            console.error(error)
            toast.error("Failed to update product.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-10">
            {/* Back Link */}
            <Link
                href={`/admin/products/${product.id}`}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-primary transition-colors"
            >
                <ArrowLeft size={14} /> Back to Product Details
            </Link>

            {/* Header */}
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-3">
                    Editing Product
                </h4>
                <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                    <span className="text-primary">EDIT</span> {product.name}
                </h1>
            </div>

            <form action={onSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: General Info & Images */}
                <div className="space-y-10">
                    <div className="bg-secondary p-8 border border-white/5 space-y-8">
                        <h3 className="text-lg font-black uppercase italic tracking-tight text-white">
                            Visual Identity
                        </h3>

                        {/* Cloudinary Widget */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                                    Display Images ({imageUrls.length}/5)
                                </label>
                                {imageUrls.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setImageUrls([])}
                                        className="text-[8px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {imageUrls.map((url, idx) => (
                                    <div
                                        key={idx}
                                        className="relative aspect-square border border-white/10 bg-white/5 overflow-hidden"
                                    >
                                        <img
                                            src={url}
                                            alt={`Product image ${idx + 1}`}
                                            className="w-full h-full object-contain p-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setImageUrls((prev) =>
                                                    prev.filter((_, i) => i !== idx)
                                                )
                                            }
                                            className="absolute top-0 right-0 h-6 w-6 bg-primary text-white flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                                            title="Remove Image"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}

                                {imageUrls.length < 5 && (
                                    <CldUploadWidget
                                        uploadPreset={
                                            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                                        }
                                        onSuccess={(result: any) => {
                                            if (imageUrls.length < 5) {
                                                setImageUrls((prev) => [
                                                    ...prev,
                                                    result.info.secure_url,
                                                ])
                                            }
                                        }}
                                    >
                                        {({ open }) => (
                                            <button
                                                type="button"
                                                onClick={() => open()}
                                                className="aspect-square border-2 border-dashed border-white/10 hover:border-primary/30 flex flex-col items-center justify-center gap-2 transition-all group"
                                            >
                                                <Plus
                                                    size={20}
                                                    className="text-white/10 group-hover:text-primary transition-colors"
                                                />
                                                <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">
                                                    Add Image
                                                </span>
                                            </button>
                                        )}
                                    </CldUploadWidget>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                                    Product Name
                                </label>
                                <input
                                    name="name"
                                    required
                                    defaultValue={product.name}
                                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm font-black text-white focus:outline-none focus:border-primary uppercase rounded-none"
                                    placeholder="E.G. CLASSIC JERSEY"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    required
                                    defaultValue={product.description}
                                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm font-medium text-white/60 focus:outline-none focus:border-primary min-h-[120px] rounded-none"
                                    placeholder="Enter product details..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-black/5 p-6 md:p-8 space-y-6">
                        <h3 className="text-lg font-black uppercase italic tracking-tight text-secondary">
                            Classification
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-1">
                                    Sport
                                </label>
                                <select
                                    name="sportId"
                                    required
                                    defaultValue={product.sportId}
                                    className="w-full border border-slate-100 bg-slate-50 px-6 py-4 text-[10px] font-black uppercase tracking-widest rounded-none focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                >
                                    <option value="">SELECT...</option>
                                    {sports.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-1">
                                    Category
                                </label>
                                <select
                                    name="categoryId"
                                    required
                                    defaultValue={product.categoryId}
                                    className="w-full border border-slate-100 bg-slate-50 px-6 py-4 text-[10px] font-black uppercase tracking-widest rounded-none focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                >
                                    <option value="">SELECT...</option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-1">
                                    Tag (Optional)
                                </label>
                                <input
                                    name="tag"
                                    defaultValue={product.tag || ""}
                                    placeholder="e.g. NEW ARRIVAL"
                                    className="w-full border border-slate-100 bg-slate-50 px-6 py-4 text-[10px] font-black uppercase tracking-widest rounded-none focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-1">
                                    Price ($)
                                </label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    required
                                    defaultValue={product.price}
                                    placeholder="e.g. 29.99"
                                    className="w-full border border-slate-100 bg-slate-50 px-6 py-4 text-[10px] font-black uppercase tracking-widest rounded-none focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Variants */}
                <div className="space-y-10">
                    {/* Sizes */}
                    <div className="bg-white border border-black/5 p-6 md:p-8 space-y-8">
                        <div className="flex items-center gap-4">
                            <Ruler size={18} className="text-primary" />
                            <h3 className="text-lg font-black uppercase italic tracking-tight text-secondary">
                                Size Options
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 ml-1">
                                    Adult Sizes
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map(
                                        (size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => toggleSize(size, "adult")}
                                                className={cn(
                                                    "h-10 min-w-[50px] px-3 font-black text-[10px] uppercase border transition-all",
                                                    adultSizes.includes(size)
                                                        ? "bg-primary text-white border-primary"
                                                        : "bg-transparent text-secondary/30 border-black/5 hover:border-primary/30"
                                                )}
                                            >
                                                {size}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 ml-1">
                                    Youth Sizes
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["YXS", "YS", "YM", "YL", "YXL"].map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => toggleSize(size, "youth")}
                                            className={cn(
                                                "h-10 min-w-[50px] px-3 font-black text-[10px] uppercase border transition-all",
                                                youthSizes.includes(size)
                                                    ? "bg-secondary text-white border-secondary"
                                                    : "bg-transparent text-secondary/30 border-black/5 hover:border-secondary/30"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Numbers */}
                    <div className="bg-white border border-black/5 p-6 md:p-8 space-y-8">
                        <div className="flex items-center gap-3">
                            <Hash size={18} className="text-primary" />
                            <h3 className="text-lg font-black uppercase italic tracking-tight text-secondary">
                                Available Numbers
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                                {numbers.map((num, i) => (
                                    <div
                                        key={i}
                                        className="bg-surface-alt border border-black/5 px-3 py-2 flex items-center gap-2"
                                    >
                                        <span className="text-[10px] font-black text-secondary">
                                            #{num}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setNumbers(
                                                    numbers.filter((_, idx) => idx !== i)
                                                )
                                            }
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    id="editNewNumber"
                                    placeholder="Add Number"
                                    className="flex-1 border border-black/5 bg-surface-alt px-4 py-3 text-[10px] font-black uppercase tracking-widest"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const input = document.getElementById(
                                            "editNewNumber"
                                        ) as HTMLInputElement
                                        if (input.value) {
                                            setNumbers([...numbers, input.value])
                                            input.value = ""
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
                            className="w-full h-20 text-lg flex items-center justify-center gap-4 group"
                        >
                            {loading ? (
                                <div className="flex items-center gap-3">
                                    <Loader2 size={24} className="animate-spin" />
                                    <span>UPDATING PRODUCT...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Save size={20} className="group-hover:translate-x-1 transition-transform" />
                                    Update Product →
                                </div>
                            )}
                        </CustomButton>
                    </div>
                </div>
            </form>
        </div>
    )
}
