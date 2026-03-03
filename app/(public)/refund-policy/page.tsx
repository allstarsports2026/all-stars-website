import { PageHeader } from "@/features/public/layout/page-header"

export const metadata = {
    title: "Refund Policy | Allstar Sports Apparel",
    description: "Our policy regarding refunds, returns, and cancellations for custom jersey orders.",
}

export default function RefundPolicyPage() {
    return (
        <main>
            <PageHeader
                title="Refund Policy"
                description="Understand our commitment to quality and our policy on returns and refunds for custom apparel."
                breadcrumb="Legal / Refunds"
            />

            <div className="container mx-auto px-4 py-12 md:py-20 sm:px-6 lg:px-8 max-w-4xl">
                <div className="prose prose-slate max-w-none">
                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            1. Custom Product Exclusion
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Because our products are custom-made to your specific requirements (size, color, name, number),
                            <strong> we do not offer refunds or exchanges for change of mind or incorrect size selection.</strong>
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            2. Manufacturing Defects
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We take pride in our quality. If your order arrives with a manufacturing defect or is significantly
                            different from the approved design:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                            <li>Contact us within 7 days of receiving your order.</li>
                            <li>Provide clear photos of the issue.</li>
                            <li>We will review the claim and, if verified, provide a replacement at no additional cost.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            3. Order Cancellations
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Orders can be cancelled for a full refund if production has not yet started. Once materials have been
                            purchased or production has commenced, cancellations may incur a fee or be ineligible for a refund.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            4. Shipping Liability
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            While we ensure all items are dispatched in perfect condition, we are not liable for delays or
                            damage caused by third-party shipping carriers.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}
