"use client"

import { submitContactForm } from "@/lib/actions/admin"
import { toast } from "sonner"
import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/shared/ui/shad/button"

export function ContactForm() {
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPending(true)
        const formData = new FormData(e.currentTarget)
        const data = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            topic: formData.get("topic") as string,
            message: formData.get("message") as string,
        }

        toast.promise(submitContactForm(data), {
            loading: "Sending message...",
            success: () => {
                setIsPending(false)
                return "Message successfully sent. We'll be in touch soon."
            },
            error: () => {
                setIsPending(false)
                return "Failed to send message. Please try again."
            },
        })
        e.currentTarget.reset()
    }

    return (
        <div className="bg-surface-alt p-8 md:p-12 relative border border-black/5">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-10 text-secondary">Enquire or Place Order</h2>
            <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="grid gap-10 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            required
                            className="w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-colors text-secondary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Last Name</label>
                        <input
                            name="lastName"
                            type="text"
                            required
                            className="w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-colors text-secondary"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Email Address</label>
                    <input
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-colors text-secondary"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Topic</label>
                    <select
                        name="topic"
                        required
                        className="w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-colors appearance-none text-secondary"
                    >
                        <option value="">Select Topic...</option>
                        <option>Custom Team Order</option>
                        <option>Sponsorship Inquiry</option>
                        <option>General Support</option>
                        <option>Bulk Pricing</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Message / Custom Details</label>
                    <textarea
                        name="message"
                        required
                        className="min-h-[120px] w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-colors text-secondary"
                        placeholder="HOW CAN WE HELP YOU?"
                    ></textarea>
                </div>
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-16 bg-primary text-white hover:bg-secondary transition-all rounded-none"
                >
                    <span className="text-sm font-black uppercase italic tracking-widest flex items-center justify-center gap-3">
                        {isPending ? <Loader2 className="animate-spin" /> : <>Send Message <Send className="h-4 w-4" /></>}
                    </span>
                </Button>
                <p className="text-[10px] text-muted-foreground mt-4 text-center">
                    By submitting this form, you agree to our <a href="/terms" className="underline hover:text-primary transition-colors">Terms of Service</a> and <a href="/privacy-policy" className="underline hover:text-primary transition-colors">Privacy Policy</a>.
                </p>
            </form>
        </div>
    )
}
