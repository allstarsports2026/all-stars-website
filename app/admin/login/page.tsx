"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { CustomInput } from "@/shared/ui/branded/input"
import { CustomButton } from "@/shared/ui/branded/CustomButton"

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
                toast.success("Welcome back.")
                setTimeout(() => {
                    window.location.href = "/admin"
                }, 300)
            },
            onError: (ctx: { error: { message?: string } }) => {
                toast.error(ctx.error.message || "Invalid credentials")
                setLoading(false)
            }
        })
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-start md:justify-center items-center px-6 pt-16 pb-12 md:py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="font-black text-3xl tracking-tighter text-secondary uppercase italic mb-3">
                        ALL<span className="text-primary">STAR</span> <span className="text-slate-200">/</span> ADMIN
                    </h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Admin Login</p>
                </div>

                <div className="bg-white p-10 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Email Address</label>
                            <CustomInput
                                name="email"
                                type="email"
                                placeholder="name@allstarsports.app"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-slate-50 border-transparent focus:bg-white rounded-none"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Password</label>
                            <CustomInput
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-slate-50 border-transparent focus:bg-white rounded-none"
                            />
                        </div>

                        <CustomButton type="submit" disabled={loading} className="w-full h-16 rounded-none text-sm italic font-black uppercase tracking-widest">
                            {loading ? "Verifying..." : "Login Admin"}
                        </CustomButton>
                    </form>
                </div>

                <div className="mt-10 text-center">
                    <a href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">← Return to Website</a>
                </div>
            </div>
        </div>
    )
}
