import { getSports, getCategoriesWithSports, getProducts, deleteProduct } from "@/lib/actions/admin"
import { ProductForm } from "./components/ProductForm"
import { DeleteButton } from "@/app/admin/(dashboard)/_components/DeleteButton"
import { Shirt, Package, Plus } from "lucide-react"
import Link from "next/link"

export const metadata = {
    title: "Manage Products | Admin Portal",
}

export default async function AdminProducts() {
    const sports = await getSports()
    const categories = await getCategoriesWithSports()
    const products = await getProducts()

    return (
        <div className="space-y-16 pb-24">
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-3">Management Portal</h4>
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        <span className="text-primary">ALL</span>STAR <span className="opacity-10">/</span> PRODUCTS
                    </h1>
                </div>
            </div>

            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-secondary flex items-center justify-center text-primary">
                        <Plus size={20} />
                    </div>
                    <h2 className="text-xl font-black uppercase italic tracking-tight text-secondary">New Product Entry</h2>
                </div>
                <ProductForm sports={sports} categories={categories} />
            </section>

            <section className="space-y-12 border-t border-slate-100 pt-16">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                            <Package size={20} />
                        </div>
                        <h2 className="text-xl font-black uppercase italic tracking-tight text-secondary">Active Products ({products.length})</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.length === 0 ? (
                        <div className="col-span-full py-24 text-center bg-white border border-slate-100">
                            <Shirt size={48} className="mx-auto text-slate-100 mb-6" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No products registered in system</p>
                        </div>
                    ) : (
                        products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/admin/products/${product.id}`}
                                className="bg-white border border-slate-100 overflow-hidden group hover:ring-2 hover:ring-primary/5 transition-all flex flex-col items-center p-6 text-center"
                            >
                                <div className="aspect-square w-full bg-slate-50 relative overflow-hidden flex items-center justify-center p-6 mb-6">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {product.tag && (
                                        <div className="absolute top-2 left-2 bg-primary text-white text-[7px] font-black uppercase tracking-widest px-2 py-1">
                                            {product.tag}
                                        </div>
                                    )}
                                </div>

                                <h4 className="text-sm font-black uppercase italic tracking-tight text-secondary leading-tight group-hover:text-primary transition-colors">
                                    {product.name}
                                </h4>
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-200 mt-2">View Full Details →</span>
                            </Link>
                        ))
                    )}
                </div>
            </section>
        </div>
    )
}
