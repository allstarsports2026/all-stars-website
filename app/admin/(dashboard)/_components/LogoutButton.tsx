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
            className="w-full flex items-center gap-4 px-4 py-4 text-xs font-black uppercase tracking-widest text-white/20 hover:text-red-400 transition-colors"
        >
            <LogOut size={18} />
            Detach Registry
        </button>
    )
}
