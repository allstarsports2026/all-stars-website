"use client"

import { logout } from "@/lib/actions/auth"
import { LogOut } from "lucide-react"

export function LogoutButton() {
    return (
        <button
            onClick={() => logout()}
            className="p-3 rounded-full bg-slate-50 dark:bg-zinc-800 text-slate-400 hover:text-primary transition-colors border border-slate-200 dark:border-zinc-800"
            title="Logout"
        >
            <LogOut size={18} />
        </button>
    )
}
