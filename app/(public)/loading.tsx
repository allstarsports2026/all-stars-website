export default function PublicLoading() {
    return (
        <div className="flex h-[70vh] w-full items-center justify-center bg-transparent">
            <div className="flex flex-col items-center gap-6">
                <div className="relative h-20 w-20">
                    <div className="absolute inset-0 rounded-full border border-black/5" />
                    <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <div className="absolute inset-2 rounded-full border border-secondary/10 border-b-transparent animate-[spin_2s_linear_infinite]" />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xl font-black uppercase italic tracking-tighter text-secondary">
                        ALL<span className="text-primary">STAR</span>
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-[0.5em] text-secondary/30 -mt-1 ml-1">
                        Sports Apparel
                    </span>
                </div>
            </div>
        </div>
    )
}
