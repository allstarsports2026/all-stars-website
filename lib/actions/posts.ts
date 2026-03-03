"use server"

import { db } from "@/lib/db"
import { posts } from "@/lib/db/schema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { eq } from "drizzle-orm"

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const image = formData.get("image") as string
    
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

    try {
        await db.insert(posts).values({
            slug,
            title,
            excerpt,
            content,
            category,
            image,
            publishedAt: new Date(),
        })
    } catch (error) {
        console.error("Failed to create post:", error)
        return { error: "Failed to create post. Slug might be taken." }
    }

    revalidatePath("/updates")
    revalidatePath("/")
    revalidatePath("/admin")
    redirect("/admin")
}

export async function updatePost(id: string, formData: FormData) {
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const image = formData.get("image") as string
    
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

    try {
        await db.update(posts).set({
            slug,
            title,
            excerpt,
            content,
            category,
            image,
            updatedAt: new Date(),
        }).where(eq(posts.id, id))
    } catch (error) {
        console.error("Failed to update post:", error)
        return { error: "Failed to update post." }
    }

    revalidatePath("/updates")
    revalidatePath(`/updates/${slug}`)
    revalidatePath("/")
    revalidatePath("/admin")
    redirect("/admin")
}

export async function deletePost(id: string) {
    try {
        await db.delete(posts).where(eq(posts.id, id))
    } catch (error) {
        console.error("Failed to delete post:", error)
        return { error: "Failed to delete post." }
    }

    revalidatePath("/updates")
    revalidatePath("/")
    revalidatePath("/admin")
}

