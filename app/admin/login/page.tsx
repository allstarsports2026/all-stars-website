"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { CustomButton } from "@/shared/ui/branded/CustomButton"
import Image from "next/image"
import Link from "next/link"
import { Loader2, ArrowRight } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const { error } = await authClient.signIn.email({
            email,
            password,
        }, {
            onSuccess: () => {
                toast.success("Authentication successful. Welcome to the workspace.")
                setTimeout(() => {
                    window.location.href = "/admin"
                }, 300)
            },
            onError: (ctx: { error: { message?: string } }) => {
                toast.error(ctx.error.message || "Invalid administrative credentials")
                setLoading(false)
            }
        })
    }

    const inputClasses = "w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-colors text-secondary placeholder:text-slate-300 placeholder:font-medium placeholder:uppercase"

    return (
        <div className="min-h-screen flex bg-white">

            {/* Left Column: Visual Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative overflow-hidden bg-secondary">
                <Image
                    src="/admin-bg.png"
                    alt="Admin Background"
                    fill
                    className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent" />

                <div className="absolute bottom-20 left-16 right-16 z-10 space-y-6">
                    <div className="h-0.5 w-20 bg-primary" />
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white leading-tight">
                        Admin <br />
                        <span className="text-primary underline decoration-primary decoration-4 underline-offset-8">Login.</span>
                    </h1>
                </div>

                <div className="absolute top-12 left-12 z-10 scale-75 origin-top-left">
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={120}
                            height={48}
                            className="h-12 w-auto object-contain brightness-0 invert"
                        />
                    </Link>
                </div>
            </div>

            {/* Right Column: Authentication Form */}
            <div className="flex-1 flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 xl:px-32 py-12">
                <div className="w-full max-w-sm space-y-12">

                    {/* Header - (Removed as requested) */}
                    <div className="space-y-4">
                        <div className="lg:hidden mb-12 flex justify-center">
                            <Link href="/">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    width={120}
                                    height={48}
                                    className="h-12 w-auto object-contain"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClasses}
                                placeholder="ADMIN@ALLSTARSPORTS.APP"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/50">Security Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={inputClasses}
                                placeholder="••••••••••••"
                            />
                        </div>

                        <div className="pt-4">
                            <CustomButton
                                type="submit"
                                disabled={loading}
                                className="w-full h-16 rounded-none text-sm italic font-black uppercase tracking-widest flex items-center justify-center gap-3 group"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        <span>Verifying Session...</span>
                                    </>
                                ) : (
                                    <>
                                        Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </CustomButton>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="pt-6 text-center lg:text-left">
                        <Link href="/" className="text-[9px] font-black uppercase tracking-widest text-secondary/50 hover:text-primary transition-all flex items-center justify-center lg:justify-start gap-2">
                            <div className="h-px w-4 bg-slate-200" /> Back to Storefront
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
