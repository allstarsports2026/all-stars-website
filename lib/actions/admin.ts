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

    const recentActivity = await db.query.contactSubmissions.findMany({
        limit: 5,
        orderBy: (subs, { desc }) => [desc(subs.createdAt)]
    })

    return {
        sports: sportsCount.count,
        categories: categoriesCount.count,
        products: productsCount.count,
        messages: messagesCount.count,
        recentActivity
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
    revalidatePath("/", "layout")
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
    revalidatePath("/", "layout")
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
    images: string[]
    sportId: string
    categoryId: string
    tag?: string
    adultSizes: string[]
    youthSizes: string[]
    colors?: string // JSON string from Client
    numbers?: string[]
    price: number
}) {
    await db.insert(products).values({
        name: data.name,
        description: data.description,
        images: data.images,
        sportId: data.sportId,
        categoryId: data.categoryId,
        adultSizes: data.adultSizes,
        youthSizes: data.youthSizes,
        tag: data.tag || null,
        colors: data.colors || null,
        numbers: data.numbers || [],
        price: data.price.toString(),
    })
    revalidatePath("/admin/products")
    revalidatePath("/shop")
    revalidatePath("/")
}

export async function getProducts() {
    return await db.query.products.findMany({
        with: {
            sport: true,
            category: true,
        },
        orderBy: (products, { desc }) => [desc(products.createdAt)]
    })
}

export async function getProductById(id: string) {
    return await db.query.products.findFirst({
        where: eq(products.id, id),
        with: {
            sport: true,
            category: true,
        }
    })
}

export async function deleteProduct(id: string) {
    await db.delete(products).where(eq(products.id, id))
    revalidatePath("/admin/products")
    revalidatePath("/shop")
    revalidatePath("/")
}

export async function deleteCategory(id: string) {
    await db.delete(categories).where(eq(categories.id, id))
    revalidatePath("/admin/categories")
    revalidatePath("/shop")
    revalidatePath("/")
    revalidatePath("/", "layout")
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


export async function updateProduct(id: string, data: {
    name: string
    description: string
    images: string[]
    sportId: string
    categoryId: string
    tag?: string
    adultSizes: string[]
    youthSizes: string[]
    colors?: string
    numbers?: string[]
    price: number
}) {
    await db.update(products).set({
        name: data.name,
        description: data.description,
        images: data.images,
        sportId: data.sportId,
        categoryId: data.categoryId,
        tag: data.tag || null,
        adultSizes: data.adultSizes,
        youthSizes: data.youthSizes,
        colors: data.colors || null,
        numbers: data.numbers || [],
        price: data.price.toString(),
        updatedAt: new Date(),
    }).where(eq(products.id, id))
    revalidatePath("/admin/products")
    revalidatePath(`/admin/products/${id}`)
    revalidatePath("/shop")
    revalidatePath("/")
}