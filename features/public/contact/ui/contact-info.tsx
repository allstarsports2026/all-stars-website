import { Phone, Mail, Clock } from "lucide-react"

const items = [
    {
        icon: Phone,
        label: "Call Us",
        lines: ["+1 (234) 567-8900"],
    },
    {
        icon: Mail,
        label: "Email Us",
        lines: ["hello@allstar-apparel.com"],
    },
    {
        icon: Clock,
        label: "Hours",
        lines: ["Mon – Fri: 9AM – 6PM", "Sat: 10AM – 2PM"],
    },
]

export function ContactInfo() {
    return (
        <div className="space-y-12">
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Get In Touch</h4>
                <p className="text-muted-foreground font-medium leading-relaxed max-w-sm">
                    Reach out directly for team orders, custom designs, or general inquiries.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {items.map(({ icon: Icon, label, lines }) => (
                    <div
                        key={label}
                        className="group flex flex-col gap-4 p-6 border border-black/5 bg-surface-alt hover:border-primary/30 transition-all"
                    >
                        <div className="h-11 w-11 bg-white border border-black/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                            <Icon className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-secondary mb-2">{label}</h3>
                            {lines.map((line) => (
                                <p key={line} className="text-xs font-bold text-muted-foreground tracking-wide leading-relaxed">{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-8 border-l-4 border-primary bg-surface-alt relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 pointer-events-none rotate-45 translate-x-12 -translate-y-12" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3">Team Orders</h4>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">
                    Outfitting your entire club? Mention your team size and sport in the message for bulk pricing.
                </p>
            </div>
        </div>
    )
}
