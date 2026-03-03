import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"

export default async function AdminSetup() {
    // Check if any user exists
    const users = await db.select().from(user).limit(1)

    // If user exists, setup is locked
    if (users.length > 0) {
        redirect("/admin/login")
    }

    async function handleSetup(formData: FormData) {
        "use server"
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const name = formData.get("name") as string

        if (!email || !password || !name) return

        try {
            await auth.api.signUpEmail({
                body: {
                    email,
                    password,
                    name,
                }
            })
            redirect("/admin/login")
        } catch (e) {
            console.error("Setup failed", e)
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-6">
            <div className="w-full max-w-sm space-y-12">
                <div className="text-center">
                    <h1 className="font-black text-4xl tracking-tighter text-white uppercase italic mb-2">
                        System <span className="text-primary">Initialization</span>
                    </h1>
                    <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Establish Primary Admin Manifest</p>
                </div>

                <form action={handleSetup} className="space-y-6 bg-zinc-900 p-10 border border-white/5 shadow-2xl">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black tracking-[0.2em] text-white/20 uppercase">Admin Name</label>
                        <input name="name" required className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-black text-white focus:outline-none focus:border-primary uppercase" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black tracking-[0.2em] text-white/20 uppercase">Email Designator</label>
                        <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-black text-white focus:outline-none focus:border-primary uppercase" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black tracking-[0.2em] text-white/20 uppercase">Secure Cipher</label>
                        <input name="password" type="password" required className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-black text-white focus:outline-none focus:border-primary" />
                    </div>

                    <button type="submit" className="w-full h-16 bg-primary text-white hover:bg-white hover:text-secondary transition-all flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest italic pt-1">
                        INITIALIZE COMMANDER →
                    </button>
                </form>
            </div>
        </div>
    )
}
