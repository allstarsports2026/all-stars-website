import { ShopPageContent } from "@/features/public/shop/products/ui/ShopPageContent"
import { getPublicSports, getPublicProducts } from "@/lib/actions/public"

export const metadata = {
  title: "Shop All Jerseys | Allstar Sports Apparel",
  description: "Browse our full collection of vintage hockey, basketball, football, baseball, and soccer jerseys. Made to order — designed for champions.",
}

export default async function ShopPage() {
  const sports = await getPublicSports()
  const products = await getPublicProducts()

  return <ShopPageContent initialSports={sports} initialProducts={products} />
}