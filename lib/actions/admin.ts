"use server"

import { db } from "@/lib/db"
import { sports, categories, products, contactSubmissions } from "@/lib/db/schema"
import { eq, count } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// ─── DASHBOARD STATS ──────────────────────────────────────────────────

export async function getAdminStats() {
    const [sportsCount] = await db.select({ count: count() }).from(sports)
    const [categoriesCount] = await db.select({ count: count() }).from(categories)
    const [productsCount] = await db.select({ count: count() }).from(products)
    const [messagesCount] = await db.select({ count: count() }).from(contactSubmissions)

    return {
        sports: sportsCount.count,
        categories: categoriesCount.count,
        products: productsCount.count,
        messages: messagesCount.count
    }
}

// ─── SPORTS MANAGEMENT ───────────────────────────────────────────────

export async function addSport(name: string) {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    await db.insert(sports).values({
        name,
        slug
    })
    revalidatePath("/admin/sports")
}

export async function getSports() {
    return await db.query.sports.findMany({
        orderBy: (sports, { desc }) => [desc(sports.createdAt)]
    })
}

// ─── CATEGORY MANAGEMENT ─────────────────────────────────────────────

export async function addCategory(name: string, sportId: string) {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    await db.insert(categories).values({
        name,
        slug,
        sportId
    })
    revalidatePath("/admin/categories")
}

export async function getCategoriesWithSports() {
    return await db.query.categories.findMany({
        with: {
            sport: true
        },
        orderBy: (categories, { desc }) => [desc(categories.createdAt)]
    })
}

// ─── PRODUCT MANAGEMENT ──────────────────────────────────────────────

export async function addProduct(data: {
    name: string
    description: string
    image: string
    sportId: string
    categoryId: string
    tag?: string
    adultSizes: string[]
    youthSizes: string[]
    colors: string // JSON string from Client
    numbers: string[]
}) {
    await db.insert(products).values({
        ...data,
        tag: data.tag || null
    })
    revalidatePath("/admin/products")
    revalidatePath("/shop")
}

export async function getProducts() {
    return await db.query.products.findMany({
        orderBy: (products, { desc }) => [desc(products.createdAt)]
    })
}

// ─── MESSAGE MANAGEMENT ──────────────────────────────────────────────

import { sendContactNotificationEmail } from "@/lib/mail"

export async function submitContactForm(data: {
    firstName: string
    lastName: string
    email: string
    topic: string
    message: string
}) {
    await db.insert(contactSubmissions).values(data)

    // Send email notification (async)
    try {
        await sendContactNotificationEmail(data)
    } catch (e) {
        console.error("Email notification failed", e)
    }

    revalidatePath("/admin/messages")
}

export async function getContactSubmissions() {
    return await db.query.contactSubmissions.findMany({
        orderBy: (subs, { desc }) => [desc(subs.createdAt)]
    })
}

export async function updateMessageStatus(id: string, status: "unread" | "read" | "archived") {
    await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id))
    revalidatePath("/admin/messages")
}
