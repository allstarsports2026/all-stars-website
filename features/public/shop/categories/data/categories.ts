export type Sport = {
    slug: string
    name: string
    subcategories: { slug: string; name: string }[]
}

export const SPORTS: Sport[] = [
    {
        slug: "hockey",
        name: "Hockey",
        subcategories: [{ slug: "hockey-vintage", name: "Vintage" }],
    },
    {
        slug: "basketball",
        name: "Basketball",
        subcategories: [{ slug: "basketball-vintage", name: "Vintage" }],
    },
    {
        slug: "football",
        name: "Football",
        subcategories: [{ slug: "football-vintage", name: "Vintage" }],
    },
    {
        slug: "baseball",
        name: "Baseball",
        subcategories: [{ slug: "baseball-vintage", name: "Vintage" }],
    },
    {
        slug: "soccer",
        name: "Soccer",
        subcategories: [{ slug: "soccer-vintage", name: "Vintage" }],
    },
]
