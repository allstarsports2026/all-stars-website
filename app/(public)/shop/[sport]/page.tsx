import { SportPageContent } from "@/features/public/shop/categories/ui/SportPageContent"
import { getPublicSports, getPublicProducts } from "@/lib/actions/public"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

interface Props {
    params: Promise<{ sport: string }>
}

export async function generateStaticParams() {
    const sports = await getPublicSports()
    return sports.map((s) => ({ sport: s.slug }))
}

export async function generateMetadata({ params }: Props) {
    const { sport: sportSlug } = await params
    const sports = await getPublicSports()
    const sport = sports.find((s) => s.slug === sportSlug)
    if (!sport) return {}
    return {
        title: `${sport.name} Jerseys | Allstar Sports Apparel`,
        description: `Shop vintage ${sport.name} jerseys made to order. Bold designs, premium quality, personal service.`,
    }
}

export default async function SportPage({ params }: Props) {
    const { sport: sportSlug } = await params
    const sports = await getPublicSports()
    const products = await getPublicProducts()

    const sport = sports.find((s) => s.slug === sportSlug)
    if (!sport) notFound()

    return <SportPageContent sportSlug={sportSlug} initialSports={sports} initialProducts={products} />
}

