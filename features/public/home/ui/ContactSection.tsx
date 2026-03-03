import Link from "next/link"
import { Mail, Phone, Instagram } from "lucide-react"
import { CustomButton } from "@/shared/ui/branded/CustomButton"

const CONTACT_CHANNELS = [
    {
        icon: Mail,
        label: "Email Us",
        value: "info@allstarsportsapparel.com",
        href: "mailto:info@allstarsportsapparel.com",
    },
    {
        icon: Phone,
        label: "Call or Text",
        value: "+1 (800) ALL-STAR",
        href: "tel:+18002557827",
    },
    {
        icon: Instagram,
        label: "Instagram",
        value: "@allstarapparel",
        href: "https://instagram.com/allstarapparel",
    },
]

export function ContactSection() {
    return (
        <section className="py-24 px-6 bg-[#F7F7F7] border-t border-black/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* Left – CTA Text */}
                <div>
                    <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4">
                        Get in Touch
                    </h4>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-8 text-secondary">
                        Like what <br />
                        you <span className="text-primary">see?</span>
                    </h2>
                    <p className="text-base text-secondary/50 font-medium max-w-md leading-relaxed mb-10">
                        We don't have an online checkout — that keeps things personal.
                        Reach out directly and our team will get you sorted with the exact
                        jersey, size, and sport you need.
                    </p>
                    <Link href="/contact">
                        <CustomButton size="lg" className="bg-primary border-0 text-white hover:opacity-90 uppercase tracking-widest text-xs">
                            Send Us a Message
                        </CustomButton>
                    </Link>
                </div>

                {/* Right – Contact Channels */}
                <div className="flex flex-col gap-4">
                    {CONTACT_CHANNELS.map((ch) => (
                        <a
                            key={ch.label}
                            href={ch.href}
                            target={ch.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="group flex items-center gap-5 p-5 bg-white border border-black/5 transition-all duration-300"
                        >
                            <div className="h-12 w-12 flex items-center justify-center transition-colors shrink-0">
                                <ch.icon size={20} className="text-primary" />
                            </div>
                            <div className="flex flex-col min-w-0 overflow-hidden">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/30 mb-0.5">
                                    {ch.label}
                                </span>
                                <span className="text-sm font-black uppercase tracking-wide text-secondary group-hover:text-primary transition-colors break-all">
                                    {ch.value}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
