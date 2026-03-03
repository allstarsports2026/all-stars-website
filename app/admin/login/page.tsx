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
                toast.success("Welcome back, Captain.")
                router.push("/admin")
            },
            onError: (ctx: { error: { message?: string } }) => {
                toast.error(ctx.error.message || "Invalid credentials")
                setLoading(false)
            }
        })
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col justify-center items-center px-6">
            <div className="w-full max-w-sm">
                <div className="text-center mb-12">
                    <h1 className="font-black text-3xl tracking-tighter text-slate-900 dark:text-white uppercase italic mb-2">
                        ALL<span className="text-primary">STAR</span> Admin
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Command Registry Access</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-8 border border-slate-200 ">
                    <div className="space-y-6">
                        <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1"> Email</label>
                        <CustomInput
                            name="email"
                            type="email"
                            placeholder="ADMIN@ALLSTAR.APP"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-6">
                        <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Password</label>
                        <CustomInput
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <CustomButton type="submit" disabled={loading} className="w-full h-16">
                        {loading ? "LOGGING IN..." : "Login"}
                    </CustomButton>
                </form>

                <div className="mt-8 text-center">
                    <a href="/" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">Back to Site Site</a>
                </div>
            </div>
        </div>
    )
}
