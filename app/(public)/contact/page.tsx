import { PageHeader } from "@/features/public/layout/page-header"
import { ContactInfo } from "@/features/public/contact/ui/contact-info"
import { ContactForm } from "@/features/public/contact/ui/contact-form"

export default function ContactPage() {
    return (
        <div className="flex flex-col pb-20">
            <PageHeader
                title="Contact"
                description="Ready to place an order or have a question about our designs? Reach out for team orders, custom kits, or general inquiries."
                breadcrumb="Contact"
            />

            <div className="container mx-auto px-4 py-12 md:py-20 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:gap-24 lg:grid-cols-2">
                    <div className="order-2 lg:order-1">
                        <ContactInfo />
                    </div>
                    <div className="order-1 lg:order-2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
