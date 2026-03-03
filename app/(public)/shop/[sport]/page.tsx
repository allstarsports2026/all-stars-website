import { SportPageContent } from "@/features/public/shop/categories/ui/SportPageContent"
import { SPORTS } from "@/features/public/shop/categories/data/categories"
import { notFound } from "next/navigation"

interface Props {
    params: Promise<{ sport: string }>
}

export async function generateStaticParams() {
    return SPORTS.map((s) => ({ sport: s.slug }))
}

export async function generateMetadata({ params }: Props) {
    const { sport: sportSlug } = await params
    const sport = SPORTS.find((s) => s.slug === sportSlug)
    if (!sport) return {}
    return {
        title: `${sport.name} Jerseys | Allstar Sports Apparel`,
        description: `Shop vintage ${sport.name} jerseys made to order. Bold designs, premium quality, personal service.`,
    }
}

export default async function SportPage({ params }: Props) {
    const { sport: sportSlug } = await params
    const sport = SPORTS.find((s) => s.slug === sportSlug)
    if (!sport) notFound()
    return <SportPageContent sportSlug={sportSlug} />
}
