"use client"

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

interface SubmitButtonProps {
    label: string
    icon?: React.ReactNode
}

export function SubmitButton({ label, icon }: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full h-16 bg-secondary text-white hover:bg-primary disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest italic"
        >
            {pending ? (
                <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    {label}
                    {icon}
                </>
            )}
        </button>
    )
}
