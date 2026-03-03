"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export function LogoutButton() {
    const router = useRouter()

    return (
        <button
            onClick={async () => {
                await authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.push("/admin/login")
                        }
                    }
                })
            }}
            className="w-full flex items-center gap-4 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-primary hover:bg-slate-50 transition-all group"
        >
            <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
            Log out
        </button>
    )
}
