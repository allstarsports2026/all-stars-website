import { getProductById, getSports, getCategoriesWithSports } from "@/lib/actions/admin"
import { notFound } from "next/navigation"
import { EditProductForm } from "./EditProductForm"

export const metadata = {
    title: "Edit Product | Admin Portal",
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const [product, sports, categories] = await Promise.all([
        getProductById(id),
        getSports(),
        getCategoriesWithSports(),
    ])

    if (!product) {
        notFound()
    }

    return (
        <div className="pb-24">
            <EditProductForm
                product={product}
                sports={sports}
                categories={categories}
            />
        </div>
    )
}