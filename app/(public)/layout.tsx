import { Navbar } from "@/features/public/layout/navbar"
import { Footer } from "@/features/public/layout/footer"
import { getPublicSports } from "@/lib/actions/public"

export const dynamic = 'force-dynamic'

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
    const sports = await getPublicSports()

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar initialSports={sports} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}