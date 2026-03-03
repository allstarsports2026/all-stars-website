"use client"

import { useState } from "react"
import { CustomInput } from "@/shared/ui/branded/input"
import { CustomTextarea } from "@/shared/ui/branded/textarea"
import { ActionButton } from "@/shared/ui/branded/action-button"
import { CldUploadWidget } from "next-cloudinary"
import { createPost, updatePost } from "@/lib/actions/posts"
import { toast } from "sonner"
import Image from "next/image"

export function PostForm({ post }: { post?: any }) {
    const [imageUrl, setImageUrl] = useState(post?.image || "")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        if (!imageUrl) {
            toast.error("Please upload an image")
            setLoading(false)
            return
        }
        formData.append("image", imageUrl)

        const result = post
            ? await updatePost(post.id, formData)
            : await createPost(formData)

        if (result?.error) {
            toast.error(result.error)
            setLoading(false)
        } else {
            toast.success(post ? "Post updated!" : "Post published!")
        }
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto px-6">
            <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Article Title</label>
                <CustomInput name="title" defaultValue={post?.title} placeholder="A Digital Sanctuary for the Global Church" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Category</label>
                    <div className="relative">
                        <select
                            name="category"
                            required
                            defaultValue={post?.category || "Company"}
                            className="flex h-14 md:h-16 w-full items-center justify-between rounded-xl bg-slate-50 dark:bg-zinc-900 px-6 text-lg border border-slate-200 dark:border-zinc-800 focus:outline-none appearance-none cursor-pointer font-medium"
                        >
                            <option value="Company">Company</option>
                            <option value="Design">Design</option>
                            <option value="Product">Product</option>
                            <option value="Mission">Mission</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Cover Image</label>
                    <CldUploadWidget
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                        onSuccess={(result: any) => {
                            setImageUrl(result.info.secure_url)
                            toast.success("Image uploaded successfully")
                        }}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                onClick={() => open()}
                                className="w-full h-14 md:h-16 rounded-xl border-2 border-dashed border-slate-200 dark:border-zinc-800 flex items-center justify-center gap-2 text-slate-400 hover:border-primary/50 hover:text-primary transition-all font-medium"
                            >
                                {imageUrl ? "Change Image" : "Upload Image"}
                            </button>
                        )}
                    </CldUploadWidget>
                </div>
            </div>

            {imageUrl && (
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-xl">
                    <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                </div>
            )}

            <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Excerpt</label>
                <CustomTextarea name="excerpt" defaultValue={post?.excerpt} placeholder="Brief summary of the article..." required className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Detailed Content (HTML Support)</label>
                <CustomTextarea name="content" defaultValue={post?.content} placeholder="<p>Full article content goes here...</p>" required className="min-h-[400px]" />
            </div>

            <div className="pt-8">
                <ActionButton type="submit" disabled={loading} className="w-full h-20 text-xl">
                    {loading ? (post ? "Updating..." : "Publishing...") : (post ? "Update Article" : "Publish to the Log")}
                </ActionButton>
            </div>

        </form>
    )
}
