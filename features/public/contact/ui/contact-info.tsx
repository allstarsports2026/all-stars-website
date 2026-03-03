import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react"

export function ContactInfo() {
    return (
        <div className="space-y-16">
            <div className="grid gap-12 sm:grid-cols-2">
                <div className="space-y-4 group">
                    <div className="h-12 w-12 bg-surface-alt flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Phone className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-secondary">Call Us</h3>
                    <div className="space-y-1 text-muted-foreground font-medium">
                        <p>Toll Free: +1 (800) 555-0199</p>
                        <p>Local: +1 (555) 123-4567</p>
                    </div>
                </div>

                <div className="space-y-4 group">
                    <div className="h-12 w-12 bg-surface-alt flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Mail className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-secondary">Email Us</h3>
                    <div className="space-y-1 text-muted-foreground font-medium">
                        <p>info@automationsurplus.com</p>
                        <p>support@automationsurplus.com</p>
                    </div>
                </div>

                {/* <div className="space-y-4 group">
                    <div className="h-12 w-12 bg-surface-alt flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-secondary">HQ Location</h3>
                    <div className="space-y-1 text-muted-foreground font-medium">
                        <p>123 Industrial Way,</p>
                        <p>Automation City, ST 12345</p>
                    </div>
                </div> */}

                {/* <div className="space-y-4 group">
                    <div className="h-12 w-12 bg-surface-alt flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-secondary">Business Hours</h3>
                    <div className="space-y-1 text-muted-foreground font-medium">
                        <p>Mon - Fri: 08:00 - 18:00 EST</p>
                        <p>Sat: By Appointment Only</p>
                    </div>
                </div> */}
            </div>

            {/* <div className="p-10 border-l-4 border-primary bg-surface-alt relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 pointer-events-none rotate-45 translate-x-12 -translate-y-12" />
                <h4 className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-secondary mb-4">
                    <Globe className="h-4 w-4 text-primary" /> Global Support Infrastructure
                </h4>
                <p className="text-muted-foreground font-medium leading-relaxed italic">
                    We ship internationally to 140+ countries. Our team provides multilingual support and international shipping documentation on every order.
                </p>
            </div> */}
        </div>
    )
}
