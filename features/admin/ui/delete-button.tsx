"use client"

import { Trash2 } from "lucide-react"
import { deletePost } from "@/lib/actions/posts"
import { toast } from "sonner"
import { useState } from "react"

export function DeletePostButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this entry?")) return

        setLoading(true)
        const result = await deletePost(id)
        if (result?.error) {
            toast.error(result.error)
            setLoading(false)
        } else {
            toast.success("Post deleted")
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-4 rounded-full bg-red-50 dark:bg-red-950/20 text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors border border-red-100 dark:border-red-900/30 disabled:opacity-50"
        >
            <Trash2 size={20} />
        </button>
    )
}
