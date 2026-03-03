"use server"

import { db } from "@/lib/db"
import { sports, categories, products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function getPublicSports() {
    return await db.query.sports.findMany({
        with: {
            categories: true
        }
    })
}

export async function getPublicProducts() {
    const rawProducts = await db.query.products.findMany({
        with: {
            sport: true,
            category: true
        },
        orderBy: (products, { desc }) => [desc(products.createdAt)]
    })

    return rawProducts.map(p => ({
        id: p.id,
        name: p.name,
        sport: p.sport.slug,
        category: p.category.slug,
        tag: p.tag,
        img: p.image,
        description: p.description,
        adultSizes: p.adultSizes,
        youthSizes: p.youthSizes,
        availableColors: JSON.parse(p.colors),
        availableNumbers: p.numbers
    }))
}

export async function getProductBySlug(id: string) {
    const p = await db.query.products.findFirst({
        where: eq(products.id, id),
        with: {
            sport: true,
            category: true
        }
    })

    if (!p) return null

    return {
        id: p.id,
        name: p.name,
        sport: p.sport.slug,
        category: p.category.slug,
        tag: p.tag,
        img: p.image,
        description: p.description,
        adultSizes: p.adultSizes,
        youthSizes: p.youthSizes,
        availableColors: JSON.parse(p.colors),
        availableNumbers: p.numbers
    }
}
