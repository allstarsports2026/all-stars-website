export type JerseyProduct = {
    id: string
    name: string
    sport: string        // matches Sport.slug  e.g. "hockey"
    category: string     // matches subcategory slug e.g. "hockey-vintage"
    tag?: string | null
    imgs: string[]
    description: string
    // variants
    adultSizes: string[]
    youthSizes: string[]
    availableColors: { name: string; hex: string }[]
    availableNumbers?: string[]   // jersey numbers available
}
