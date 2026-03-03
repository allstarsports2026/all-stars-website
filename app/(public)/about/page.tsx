import { PageHeader } from "@/features/public/layout/page-header"
import Image from "next/image"
import Link from "next/link"
import { CustomButton } from "@/shared/ui/branded/CustomButton"
import { Target, Users, Zap, ShoppingBag } from "lucide-react"

export const metadata = {
    title: "Our Story | Allstar Sports Apparel",
    description: "Learn about Allstar Sports Apparel—started with a passion for local sports, growing into the future of custom performance gear.",
}

export default function AboutPage() {
    return (
        <main className="bg-white">
            <PageHeader
                title="Our Story"
                description="Built on grit, local passion, and the pursuit of the perfect game-day kit. We're just getting started."
                breadcrumb="Allstar / About"
            />

            {/* Mission Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-[4/5] bg-surface-alt border border-black/5 overflow-hidden group">
                            <Image
                                src="/jerseys/black.png"
                                alt="Design Process"
                                fill
                                className="object-cover p-12 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        <div className="flex flex-col gap-8">
                            <div>
                                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4">Born in the Community</h4>
                                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-secondary leading-none">
                                    Catering to the <span className="text-primary">Locals First.</span>
                                </h2>
                            </div>

                            <div className="space-y-6 text-sm text-secondary/70 font-medium leading-relaxed">
                                <p>
                                    Allstar Sports Apparel didn't start in a boardroom. It started on the sidelines, in the rinks, and on the courts of our local community. We saw a need for premium, professional-grade jerseys that didn't come with a pro-league price tag or a month-long wait.
                                </p>
                                <p>
                                    We launched recently with a simple mission: to provide our local teams, clubs, and athletes with the highest quality custom apparel available. By focusing on our local roots first, we've been able to perfect our designs and build personal relationships with the athletes we serve.
                                </p>
                                <p className="font-black text-secondary italic border-l-4 border-primary pl-4">
                                    "We believe every local team deserves to look and feel like they're playing in the big leagues."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision / Roadmap Section */}
            <section className="bg-secondary py-24 px-6 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl mb-16">
                        <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4">The Road Ahead</h4>
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white leading-none">
                            The Future of <span className="text-primary">Custom Gear.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Milestone 1 */}
                        <div className="bg-white/5 border border-white/10 p-10 hover:border-primary/50 transition-colors group">
                            <Target className="text-primary mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-xl font-black uppercase italic text-white mb-4">Local Excellence</h3>
                            <p className="text-white/60 text-sm font-medium leading-relaxed">
                                Currently focusing on expanding our local footprint, ensuring every team in our jurisdiction has access to premium custom kits.
                            </p>
                        </div>

                        {/* Milestone 2 */}
                        <div className="bg-white/5 border border-white/10 p-10 hover:border-primary/50 transition-colors group">
                            <ShoppingBag className="text-primary mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-xl font-black uppercase italic text-white mb-4">Ecommerce Evolution</h3>
                            <p className="text-white/60 text-sm font-medium leading-relaxed">
                                We are actively working towards a full ecommerce integration. Soon, you'll be able to customize and checkout your entire team order directly online.
                            </p>
                        </div>

                        {/* Milestone 3 */}
                        <div className="bg-white/5 border border-white/10 p-10 hover:border-primary/50 transition-colors group">
                            <Users className="text-primary mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-xl font-black uppercase italic text-white mb-4">Global Reach</h3>
                            <p className="text-white/60 text-sm font-medium leading-relaxed">
                                While our heart is local, our vision is global. We aim to take North American jersey design standards to athletes worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 px-6 border-b border-black/5">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-secondary mb-12">
                        Why Choose <span className="text-primary text-secondary/20">Allstar?</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-16 w-16 bg-surface-alt flex items-center justify-center border border-black/5 group hover:border-primary transition-colors">
                                <Zap className="text-primary group-hover:scale-110 transition-transform" size={24} />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-secondary">Rapid Production</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-16 w-16 bg-surface-alt flex items-center justify-center border border-black/5 group hover:border-primary transition-colors">
                                <Users className="text-primary group-hover:scale-110 transition-transform" size={24} />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-secondary">Personal Touch</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-16 w-16 bg-surface-alt flex items-center justify-center border border-black/5 group hover:border-primary transition-colors">
                                <Target className="text-primary group-hover:scale-110 transition-transform" size={24} />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-secondary">Pro Standards</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-16 w-16 bg-surface-alt flex items-center justify-center border border-black/5 group hover:border-primary transition-colors">
                                <ShoppingBag className="text-primary group-hover:scale-110 transition-transform" size={24} />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-secondary">Future-Ready</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-secondary mb-8">
                        Ready to Join the <span className="text-primary">League?</span>
                    </h2>
                    <p className="text-secondary/60 font-medium mb-12 leading-relaxed">
                        Whether you're a local squad looking for your first kits or a club planning for next season, we're ready to bring your vision to life.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/shop">
                            <CustomButton size="lg" className="px-12">View Collections</CustomButton>
                        </Link>
                        <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-colors">
                            Speak with a Designer →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
