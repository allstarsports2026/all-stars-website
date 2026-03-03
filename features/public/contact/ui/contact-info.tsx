import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactInfo() {
    return (
        <div className="space-y-12">
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Get In Touch</h4>
                <p className="text-muted-foreground font-medium leading-relaxed max-w-sm">
                    Follow us on social media or reach out directly for team orders, custom designs, or general inquiries.
                </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-2">
                <div className="space-y-4 group">
                    <div className="h-12 w-12 bg-surface-alt border border-black/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                        <Phone className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-secondary mb-1">Call Us</h3>
                        <p className="text-xs font-bold text-muted-foreground tracking-wide">+1 (234) 567-8900</p>
                    </div>
                </div>

                <div className="space-y-4 group">
                    <div className="h-12 w-12 bg-surface-alt border border-black/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                        <Mail className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-secondary mb-1">Email Us</h3>
                        <p className="text-xs font-bold text-muted-foreground tracking-wide">hello@allstar-apparel.com</p>
                    </div>
                </div>

                <div className="space-y-4 group">
                    <div className="h-12 w-12 bg-surface-alt border border-black/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                        <Clock className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-secondary mb-1">Hours</h3>
                        <p className="text-xs font-bold text-muted-foreground tracking-wide">Mon - Fri: 9AM - 6PM</p>
                        <p className="text-xs font-bold text-muted-foreground tracking-wide">Sat: 10AM - 2PM</p>
                    </div>
                </div>

                <div className="space-y-4 group">
                    <div className="h-12 w-12 bg-surface-alt border border-black/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                        <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-secondary mb-1">Location</h3>
                        <p className="text-xs font-bold text-muted-foreground tracking-wide">Ontario, Canada</p>
                        <p className="text-xs font-bold text-muted-foreground tracking-wide">Serving North America</p>
                    </div>
                </div>
            </div>

            <div className="p-8 border-l-4 border-primary bg-surface-alt relative overflow-hidden mt-8">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 pointer-events-none rotate-45 translate-x-12 -translate-y-12" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-4">Team Orders</h4>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">
                    Interested in outfitting your entire club? Mention your team size and sport in the message for bulk pricing options.
                </p>
            </div>
        </div>
    )
}

