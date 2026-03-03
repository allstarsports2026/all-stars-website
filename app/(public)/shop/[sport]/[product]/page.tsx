import { ProductDetailContent } from "@/features/public/shop/products/ui/ProductDetailContent"
import { getPublicProducts, getPublicSports, getProductBySlug } from "@/lib/actions/public"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

interface Props {
    params: Promise<{ sport: string; product: string }>
}

export async function generateStaticParams() {
    const products = await getPublicProducts()
    return products.map((p) => ({
        sport: p.sport,
        product: p.id,
    }))
}

export async function generateMetadata({ params }: Props) {
    const { sport: sportSlug, product: productId } = await params
    const product = await getProductBySlug(productId)
    const sports = await getPublicSports()
    const sport = sports.find((s) => s.slug === sportSlug)

    if (!product) return {}
    return {
        title: `${product.name} — ${sport?.name ?? sportSlug} | Allstar Sports Apparel`,
        description: product.description,
    }
}

export default async function ProductPage({ params }: Props) {
    const { sport: sportSlug, product: productId } = await params
    const product = await getProductBySlug(productId)
    const sports = await getPublicSports()
    const products = await getPublicProducts()

    if (!product) notFound()

    return (
        <ProductDetailContent
            sportSlug={sportSlug}
            product={product}
            initialSports={sports}
            initialProducts={products}
        />
    )
}

