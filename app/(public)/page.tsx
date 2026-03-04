import { HeroSection } from "@/features/public/home/ui/HeroSection"
import { FeaturedCollection } from "@/features/public/home/ui/FeaturedCollection"
import { ContactSection } from "@/features/public/home/ui/ContactSection"
import { getPublicProducts } from "@/lib/actions/public"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const products = await getPublicProducts()

  // HERO DATA: Pick 5 random products to rotate in Hero
  const shuffled = [...products].sort(() => 0.5 - Math.random())
  const heroSlides = shuffled.slice(0, 5).map(p => ({
    image: p.imgs[0],
    label: p.tag || "New Discovery",
    title: [p.name.split(' ')[0], p.name.split(' ').slice(1).join(' ') || "JERSEY"],
    description: p.description,
    href: `/shop/${p.sport}/${p.id}`
  }))

  // Filtering criteria: Prioritize products with tags, then by date
  const featuredProducts = products
    .sort((a, b) => {
      if (a.tag && !b.tag) return -1
      if (!a.tag && b.tag) return 1
      return 0
    })
    .slice(0, 9)

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection slides={heroSlides} />
      <FeaturedCollection products={featuredProducts} />
      <ContactSection />
    </div>
  )
}