import { HeroSection } from "@/features/public/home/ui/HeroSection"
import { FeaturedCollection } from "@/features/public/home/ui/FeaturedCollection"
import { ContactSection } from "@/features/public/home/ui/ContactSection"

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <FeaturedCollection />
      <ContactSection />
    </div>
  )
}