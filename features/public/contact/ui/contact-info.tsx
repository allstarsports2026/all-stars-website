import { Phone, Mail, Clock, Users } from "lucide-react"
import { cn } from "@/lib/utils"

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
    {
        icon: Users,
        label: "Bulk Pricing",
        lines: ["Outfitting your entire club?", "Mention team size/sport for bulk rates."],
    },
]

export function ContactInfo() {
    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {items.map(({ icon: Icon, label, lines }) => (
                    <div
                        key={label}
                        className="group flex flex-col items-center text-center md:items-start md:text-left gap-4 transition-all col-span-1"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="h-10 w-10 border border-black/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-secondary">{label}</h3>
                        </div>
                        <div className="md:pl-14 border-l-0 md:border-l-2 border-black/5 group-hover:border-primary/30 transition-colors">
                            {lines.map((line) => (
                                <p key={line} className="text-xs font-bold text-secondary tracking-wide leading-relaxed">{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
