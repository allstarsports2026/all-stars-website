import { ProductDetailContent } from "@/features/public/shop/products/ui/ProductDetailContent"
import { JERSEY_PRODUCTS } from "@/features/public/shop/products/data/mock-products"
import { SPORTS } from "@/features/public/shop/categories/data/categories"
import { notFound } from "next/navigation"

interface Props {
    params: Promise<{ sport: string; product: string }>
}

export async function generateStaticParams() {
    return JERSEY_PRODUCTS.map((p) => ({
        sport: p.sport,
        product: p.id,
    }))
}

export async function generateMetadata({ params }: Props) {
    const { sport: sportSlug, product: productId } = await params
    const product = JERSEY_PRODUCTS.find((p) => p.id === productId && p.sport === sportSlug)
    const sport = SPORTS.find((s) => s.slug === sportSlug)
    if (!product) return {}
    return {
        title: `${product.name} — ${sport?.name ?? sportSlug} | Allstar Sports Apparel`,
        description: product.description,
    }
}

export default async function ProductPage({ params }: Props) {
    const { sport: sportSlug, product: productId } = await params
    const product = JERSEY_PRODUCTS.find((p) => p.id === productId && p.sport === sportSlug)
    if (!product) notFound()
    return <ProductDetailContent sportSlug={sportSlug} productId={productId} />
}
