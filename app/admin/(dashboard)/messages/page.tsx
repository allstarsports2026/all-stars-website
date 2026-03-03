import { getContactSubmissions, updateMessageStatus } from "@/lib/actions/admin"
import { format } from "date-fns"
import {
    MessageSquare,
    CheckCircle,
    Archive,
    Mail,
    Calendar,
    User,
    Tag
} from "lucide-react"

export const metadata = {
    title: "Manage Messages | Admin Portal",
}

export default async function AdminMessages() {
    const messages = await getContactSubmissions()

    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-3">Manifest Log</h4>
                <div className="flex items-center justify-between">
                    <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        Transmission <span className="text-secondary/20 block md:inline">Inbound</span>
                    </h1>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-6">
                {messages.length === 0 ? (
                    <div className="py-24 text-center bg-white border border-black/5">
                        <MessageSquare size={48} className="mx-auto text-secondary/10 mb-6" />
                        <p className="text-sm font-black uppercase tracking-widest text-secondary/30">No active transmissions</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="bg-white border border-black/5 p-8 flex flex-col md:flex-row gap-8 relative group overflow-hidden">
                            <div className="flex-1 space-y-6 relative z-10">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                        <Calendar size={12} />
                                        {format(new Date(msg.createdAt), "MMM d, yyyy • HH:mm")}
                                    </div>
                                    <div className="h-px w-8 bg-black/10" />
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary/40">
                                        <Tag size={12} />
                                        {msg.topic}
                                    </div>
                                    <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-none ${msg.status === 'unread' ? 'bg-primary text-white' : 'bg-surface-alt text-secondary/40'
                                        }`}>
                                        {msg.status}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary/30">
                                            <User size={10} /> Sender
                                        </div>
                                        <p className="text-lg font-black uppercase italic tracking-tight text-secondary">
                                            {msg.firstName} {msg.lastName}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-bold text-primary hover:underline cursor-pointer">
                                            <Mail size={12} /> {msg.email}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary/30">
                                            Message Manifest
                                        </div>
                                        <p className="text-sm text-secondary/70 font-medium leading-relaxed bg-surface-alt p-4 border border-black/5 italic">
                                            "{msg.message}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex md:flex-col gap-2 relative z-10 border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-8 justify-center">
                                <form action={async () => {
                                    "use server"
                                    await updateMessageStatus(msg.id, "read")
                                }}>
                                    <button className="w-full h-12 px-6 bg-secondary text-white hover:bg-primary transition-all flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest">
                                        <CheckCircle size={14} /> Mark Read
                                    </button>
                                </form>
                                <form action={async () => {
                                    "use server"
                                    await updateMessageStatus(msg.id, "archived")
                                }}>
                                    <button className="w-full h-12 px-6 border border-secondary/10 text-secondary/40 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest">
                                        <Archive size={14} /> Archive
                                    </button>
                                </form>
                            </div>

                            {/* Background Number */}
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none translate-x-1/4 -translate-y-1/4">
                                <div className="text-[140px] font-black text-secondary leading-none italic uppercase">
                                    MSG
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
