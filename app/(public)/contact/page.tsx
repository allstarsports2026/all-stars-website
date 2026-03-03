import { PageHeader } from "@/features/public/layout/page-header"
import { ContactInfo } from "@/features/public/contact/ui/contact-info"
import { ContactForm } from "@/features/public/contact/ui/contact-form"

export default function ContactPage() {
    return (
        <div className="flex flex-col pb-20">
            <PageHeader
                title="Contact"
                description="Have a question about a part or looking to sell your surplus? Our team of experts is ready to assist you in minimizing downtime."
                breadcrumb="Contact"
            />

            <div className="container mx-auto px-4 py-12 md:py-20 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:gap-24 lg:grid-cols-2">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
