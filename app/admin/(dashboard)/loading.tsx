export default function AdminLoading() {
    return (
        <div className="flex h-[60vh] w-full items-center justify-center bg-transparent">
            <div className="flex flex-col items-center gap-4">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
                    <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Dashboard...</p>
            </div>
        </div>
    )
}
