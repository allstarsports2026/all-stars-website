import { Navbar } from "@/features/public/layout/navbar"
import { Footer } from "@/features/public/layout/footer"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}