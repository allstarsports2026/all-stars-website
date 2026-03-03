import { PageHeader } from "@/features/public/layout/page-header"

export const metadata = {
    title: "Terms of Service | Allstar Sports Apparel",
    description: "Terms and conditions for using Allstar Sports Apparel services and website.",
}

export default function TermsOfServicePage() {
    return (
        <main>
            <PageHeader
                title="Terms of Service"
                description="Please read these terms and conditions carefully before using our services or submitting any inquiries."
                breadcrumb="Legal / Terms"
            />

            <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 max-w-4xl">
                <div className="prose prose-slate max-w-none">
                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            1. General Terms
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            By accessing Allstar Sports Apparel is making any inquiry, you agree to be bound by these terms.
                            Our services are provided "as is" and are subject to availability.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            2. Custom Orders
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Allstar Sports Apparel specialises in custom-made jerseys. By submitting an inquiry, you acknowledge that:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                            <li>Production begins only after payment confirmation and design approval.</li>
                            <li>Estimated lead times are provided but not guaranteed due to the custom nature of production.</li>
                            <li>You are responsible for the accuracy of custom details such as names, numbers, and sizes.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            3. Pricing & Payment
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Prices are quoted based on specific order requirements. Full or partial deposit (as agreed) is required
                            to initiate production. All prices are subject to change until an order is confirmed.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            4. Intellectual Property
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            All designs produced by Allstar Sports Apparel remain our property unless otherwise agreed.
                            By providing logos or artwork, you warrant that you have the right to use them.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            5. Governing Law
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}
