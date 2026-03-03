import { HeroSection } from "@/features/public/home/ui/HeroSection"
import { FeaturedCollection } from "@/features/public/home/ui/FeaturedCollection"
import { ContactSection } from "@/features/public/home/ui/ContactSection"
import { getPublicProducts } from "@/lib/actions/public"

export default async function HomePage() {
  const products = await getPublicProducts()

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <FeaturedCollection products={products} />
      <ContactSection />
    </div>
  )
}