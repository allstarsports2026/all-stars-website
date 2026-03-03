import { getProductById, deleteProduct } from "@/lib/actions/admin"
import { notFound, redirect } from "next/navigation"
import { DeleteButton } from "@/app/admin/(dashboard)/_components/DeleteButton"
import Link from "next/link"
import { ChevronLeft, Shirt, Hash, Ruler, Tag, Package } from "lucide-react"

interface AdminProductDetailPageProps {
    params: Promise<{ id: string }>
}

export default async function AdminProductDetailPage({ params }: AdminProductDetailPageProps) {
    const { id } = await params
    const product = await getProductById(id)

    if (!product) {
        notFound()
    }

    async function handleDelete() {
        "use server"
        await deleteProduct(id)
        redirect("/admin/products")
    }

    return (
        <div className="space-y-12 pb-24">
            {/* Header / Breadcrumb */}
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/products"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-primary transition-colors"
                >
                    <ChevronLeft size={14} /> Back to Products
                </Link>
                <DeleteButton id={id} onDelete={handleDelete} label="Delete Product" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Left: Images */}
                <div className="space-y-6">
                    <div className="aspect-[3/4] bg-slate-50 border border-slate-100 flex items-center justify-center p-12 relative overflow-hidden">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-contain"
                        />
                        {product.tag && (
                            <div className="absolute top-8 left-8 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 shadow-[6px_6px_0px_var(--secondary)]">
                                {product.tag}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {product.images.slice(1).map((img, idx) => (
                            <div key={idx} className="aspect-square bg-slate-50 border border-slate-100 p-4">
                                <img src={img} alt={`View ${idx + 2}`} className="h-full w-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Details */}
                <div className="space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Package size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Product Spec</span>
                        </div>
                        <h1 className="text-5xl font-black uppercase italic tracking-tighter text-secondary leading-none">
                            {product.name}
                        </h1>
                        <p className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                            Reference ID: {product.id}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-12 border-y border-slate-100 py-10">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Sport</span>
                            <p className="text-xl font-black uppercase italic tracking-tight text-secondary">{(product as any).sport.name}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Category</span>
                            <p className="text-xl font-black uppercase italic tracking-tight text-secondary">{(product as any).category.name}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-secondary">
                            <Shirt size={16} />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Description</h3>
                        </div>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xl italic">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-10 bg-slate-50 p-10 border border-slate-100">
                        {/* Sizes */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-secondary">
                                <Ruler size={16} className="text-primary" />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">In-Stock Sizes</h3>
                            </div>
                            <div className="flex flex-col gap-6">
                                {product.adultSizes.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Adult Range</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.adultSizes.map(s => (
                                                <span key={s} className="min-w-[40px] h-10 flex items-center justify-center bg-white border border-slate-100 text-[10px] font-black text-secondary">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {product.youthSizes.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Youth Range</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.youthSizes.map(s => (
                                                <span key={s} className="min-w-[40px] h-10 flex items-center justify-center bg-white border border-slate-100 text-[10px] font-black text-secondary">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Numbers */}
                        {product.numbers && product.numbers.length > 0 && (
                            <div className="space-y-4 border-t border-slate-200 pt-8 mt-8">
                                <div className="flex items-center gap-3 text-secondary">
                                    <Hash size={16} className="text-primary" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Stock Numbers</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.numbers.map(n => (
                                        <span key={n} className="min-w-[40px] h-10 flex items-center justify-center bg-primary text-white text-[10px] font-black">#{n}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
