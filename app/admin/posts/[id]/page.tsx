import { getPostById } from "@/lib/db/queries"
import { PostForm } from "@/features/admin/ui/post-form"
import { ScrollReveal } from "@/features/animations/scroll-reveal"
import { notFound } from "next/navigation"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const post = await getPostById(id)

    if (!post) {
        notFound()
    }

    return (
        <section className="pb-24">
            <div className="max-w-7xl mx-auto px-6">
                <ScrollReveal direction="up" className="text-center mb-16">
                    <h2 className="text-[10px] md:text-sm font-black tracking-[0.4em] text-primary uppercase mb-6">Editing</h2>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                        Refining the <br /> <span className="italic text-primary">Sacred Script.</span>
                    </h1>
                </ScrollReveal>

                <PostForm post={post} />
            </div>
        </section>
    )
}
