import { HeroCarousel, type HeroSlide } from "@/shared/ui/branded/HeroCarousel"

interface HeroSectionProps {
    slides?: HeroSlide[]
}

export function HeroSection({ slides }: HeroSectionProps) {
    return <HeroCarousel slides={slides} />
}
