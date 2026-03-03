import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { auth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { CustomButton } from "@/shared/ui/branded/CustomButton"

export default async function AdminSetup() {
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
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-6 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="font-black text-3xl tracking-tighter text-secondary uppercase italic mb-3">
                        ALL<span className="text-primary">STAR</span> <span className="text-slate-200">/</span> SETUP
                    </h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Create Your Administrator Account</p>
                </div>

                <div className="bg-white p-10 border border-slate-100">
                    <form action={handleSetup} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Admin Name</label>
                            <input name="name" required className="w-full h-14 bg-slate-50 border border-slate-100 px-6 text-sm font-black text-secondary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all rounded-none" placeholder="YOUR NAME" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Email Address</label>
                            <input name="email" type="email" required className="w-full h-14 bg-slate-50 border border-slate-100 px-6 text-sm font-black text-secondary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all rounded-none" placeholder="name@allstarsports.app" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Password</label>
                            <input name="password" type="password" required className="w-full h-14 bg-slate-50 border border-slate-100 px-6 text-sm font-black text-secondary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all rounded-none" placeholder="MIN. 8 CHARACTERS" />
                        </div>

                        <CustomButton type="submit" className="w-full h-16 rounded-none text-sm italic font-black uppercase tracking-widest mt-4">
                            Create Account
                        </CustomButton>
                    </form>
                </div>
            </div>
        </div>
    )
}
