import { getContactSubmissions, updateMessageStatus } from "@/lib/actions/admin"
import { format } from "date-fns"
import {
    MessageSquare,
    CheckCircle,
    Archive,
    Tag,
    Calendar,
    Mail
} from "lucide-react"

export const metadata = {
    title: "Manage Messages | Admin Portal",
}

export default async function AdminMessages() {
    const messages = await getContactSubmissions()

    return (
        <div className="space-y-12">
            <div>
                <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-3">Customer Support</h4>
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-secondary">
                        <span className="text-primary">ALL</span>STAR <span className="opacity-10">/</span> MESSAGES
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {messages.length === 0 ? (
                    <div className="py-24 text-center bg-white border border-slate-100">
                        <MessageSquare size={48} className="mx-auto text-slate-100 mb-6" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No messages received yet</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="bg-white border border-slate-100 p-8 flex flex-col md:flex-row gap-8 relative group">
                            <div className="flex-1 space-y-6 relative z-10">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                        <Calendar size={12} />
                                        {format(new Date(msg.createdAt), "MMM d, yyyy • HH:mm")}
                                    </div>
                                    <div className="h-px w-8 bg-slate-100" />
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <Tag size={12} />
                                        {msg.topic}
                                    </div>
                                    <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 ${msg.status === 'unread' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'
                                        }`}>
                                        {msg.status}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-1 space-y-2">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                                            Sender Details
                                        </div>
                                        <p className="text-xl font-black uppercase italic tracking-tighter text-secondary">
                                            {msg.firstName} {msg.lastName}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-bold text-primary hover:underline">
                                            <Mail size={12} /> {msg.email}
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                                            Message Content
                                        </div>
                                        <p className="text-sm text-secondary/70 font-medium leading-relaxed bg-slate-50 p-6 border border-slate-100 italic">
                                            "{msg.message}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-2 relative z-10 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 justify-center min-w-[180px]">
                                <form action={async () => {
                                    "use server"
                                    await updateMessageStatus(msg.id, "read")
                                }}>
                                    <button className="w-full h-12 px-6 bg-secondary text-white hover:bg-primary transition-all flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest">
                                        <CheckCircle size={14} /> Mark as Read
                                    </button>
                                </form>
                                <form action={async () => {
                                    "use server"
                                    await updateMessageStatus(msg.id, "archived")
                                }}>
                                    <button className="w-full h-12 px-6 border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest">
                                        <Archive size={14} /> Archive
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
