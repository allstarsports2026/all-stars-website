import { getSports, getCategoriesWithSports, getProducts } from "@/lib/actions/admin"
import { ProductForm } from "./components/ProductForm"
import { Shirt, Package, Plus, ChevronDown } from "lucide-react"

export const metadata = {
    title: "Product Inventory | Admin Portal",
}

export default async function AdminProducts() {
    const sports = await getSports()
    const categories = await getCategoriesWithSports()
    const products = await getProducts()

    return (
        <div className="space-y-16 pb-24">
            {/* Header */}
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-3">Inventory Manifest</h4>
                <div className="flex items-center justify-between">
                    <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        Product <span className="text-secondary/20 block md:inline">Logistics</span>
                    </h1>
                </div>
            </div>

            {/* Form Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-secondary flex items-center justify-center text-primary">
                        <Plus size={20} />
                    </div>
                    <h2 className="text-xl font-black uppercase italic tracking-tight text-secondary">Initialize New Asset</h2>
                </div>
                <ProductForm sports={sports} categories={categories} />
            </section>

            {/* List Section */}
            <section className="space-y-12 border-t border-black/5 pt-16">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-surface-alt flex items-center justify-center text-secondary/30 border border-black/5">
                            <Package size={20} />
                        </div>
                        <h2 className="text-xl font-black uppercase italic tracking-tight text-secondary">Active Inventory ({products.length})</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.length === 0 ? (
                        <div className="col-span-full py-24 text-center bg-white border border-black/5">
                            <Shirt size={48} className="mx-auto text-secondary/10 mb-6" />
                            <p className="text-sm font-black uppercase tracking-widest text-secondary/30">No products initiated in core db</p>
                        </div>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="bg-white border border-black/5 overflow-hidden group hover:border-primary/20 transition-all flex flex-col">
                                <div className="aspect-[3/4] bg-surface-alt relative overflow-hidden flex items-center justify-center p-8">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {product.tag && (
                                        <div className="absolute top-4 left-4 bg-primary text-white text-[8px] font-black uppercase tracking-widest px-2 py-1">
                                            {product.tag}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col gap-4">
                                    <div>
                                        <h4 className="text-lg font-black uppercase italic tracking-tight text-secondary leading-none mb-1 group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h4>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-secondary/30">ID: {product.id.slice(0, 8)}...</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mt-auto">
                                        {/* Color preview dots */}
                                        {JSON.parse(product.colors).map((c: any, i: number) => (
                                            <div key={i} className="h-2 w-2 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} title={c.name} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    )
}
