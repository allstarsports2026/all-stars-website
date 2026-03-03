import { PageHeader } from "@/features/public/layout/page-header"

export const metadata = {
    title: "Privacy Policy | Allstar Sports Apparel",
    description: "Learn how Allstar Sports Apparel collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
    return (
        <main>
            <PageHeader
                title="Privacy Policy"
                description="Your privacy is important to us. This policy explains how we handle your data when you submit a form."
                breadcrumb="Legal / Privacy"
            />

            <div className="container mx-auto px-4 py-12 md:py-20 sm:px-6 lg:px-8 max-w-4xl">
                <div className="prose prose-slate max-w-none">
                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            1. Information We Collect
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            When you submit a contact or inquiry form on our website, we may collect:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Custom order details and specifications</li>
                            <li>IP address for security purposes</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            2. How We Use Your Data
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We use the collected information solely for:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                            <li>Responding to your inquiries and providing quotes.</li>
                            <li>Processing and managing your custom orders.</li>
                            <li>Improving our products and website experience.</li>
                            <li>Complying with legal obligations.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            3. Data Protection
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We implement industry-standard security measures to protect your personal information.
                            We do not sell, trade, or otherwise transfer your information to outside parties except
                            as necessary to provide our services (e.g., shipping carriers).
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            4. Your Rights
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            You have the right to request access to the personal data we hold about you, or to request
                            its deletion. Please contact us via our contact form for any such requests.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-secondary mb-6 border-l-4 border-primary pl-4">
                            5. Cookies
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Our website may use cookies to enhance user experience and analyze traffic. You can choose to
                            disable cookies via your browser settings.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}
