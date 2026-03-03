"use client"

import { useTransition, useState } from "react"
import { Trash2, Loader2, AlertTriangle } from "lucide-react"

interface DeleteButtonProps {
    id: string
    onDelete: (id: string) => Promise<void>
    label?: string
}

export function DeleteButton({ id, onDelete, label = "Delete" }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition()
    const [confirming, setConfirming] = useState(false)

    const handleClick = () => {
        if (!confirming) {
            setConfirming(true)
            // Auto-cancel confirm after 4 seconds
            setTimeout(() => setConfirming(false), 4000)
            return
        }
        setConfirming(false)
        startTransition(async () => {
            await onDelete(id)
        })
    }

    if (isPending) {
        return (
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 text-slate-300 text-[10px] font-black uppercase tracking-widest">
                <Loader2 size={12} className="animate-spin" />
                Deleting...
            </div>
        )
    }

    if (confirming) {
        return (
            <button
                onClick={handleClick}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors animate-pulse"
            >
                <AlertTriangle size={12} />
                Confirm Delete
            </button>
        )
    }

    return (
        <button
            onClick={handleClick}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-slate-100 text-slate-300 text-[10px] font-black uppercase tracking-widest hover:border-red-200 hover:text-red-400 transition-all"
        >
            <Trash2 size={12} />
            {label}
        </button>
    )
}
