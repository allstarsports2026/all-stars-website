import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "./index";

import { posts } from "./schema";
import { blogPosts } from "../../features/marketing/updates/blog-posts";

async function seed() {
  console.log("Seeding blog posts...");

  for (const post of blogPosts) {
    await db.insert(posts).values({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image,
      publishedAt: new Date(post.date),
    }).onConflictDoNothing();
  }

  console.log("Seeding completed!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
