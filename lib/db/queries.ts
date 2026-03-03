import { db } from "./index";
import { posts } from "./schema";
import { desc, eq } from "drizzle-orm";

export async function getRecentPosts(limit = 4) {
  return await db.query.posts.findMany({
    orderBy: [desc(posts.publishedAt)],
    limit,
  });
}

export async function getAllPosts() {
  return await db.query.posts.findMany({
    orderBy: [desc(posts.publishedAt)],
  });
}

export async function getPostBySlug(slug: string) {
  return await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });
}

export async function getPostById(id: string) {
  return await db.query.posts.findFirst({
    where: eq(posts.id, id),
  });
}

