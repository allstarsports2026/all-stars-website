"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Loader2, LogOut } from "lucide-react"
import { useState } from "react"

export function LogoutButton() {
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    return (
        <button
            disabled={isLoggingOut}
            onClick={async () => {
                setIsLoggingOut(true)
                try {
                    await authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                router.push("/admin/login")
                            }
                        }
                    })
                } catch (error) {
                    setIsLoggingOut(false)
                }
            }}
            className="w-full flex items-center gap-4 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-primary hover:bg-slate-50 transition-all group disabled:opacity-50 disabled:cursor-wait"
        >
            {isLoggingOut ? (
                <>
                    <Loader2 size={18} className="animate-spin text-primary" />
                    Signing out...
                </>
            ) : (
                <>
                    <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                    Log out
                </>
            )}
        </button>
    )
}
