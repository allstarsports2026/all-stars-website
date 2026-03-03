export type JerseyProduct = {
    id: string
    name: string
    sport: string        // matches Sport.slug  e.g. "hockey"
    category: string     // matches subcategory slug e.g. "hockey-vintage"
    tag?: string | null
    img: string
    description: string
    // variants
    adultSizes: string[]
    youthSizes: string[]
    availableColors: { name: string; hex: string }[]
    availableNumbers: string[]   // jersey numbers available
}

export const JERSEY_PRODUCTS: JerseyProduct[] = [
    // ─── HOCKEY ────────────────────────────────────────────────────────
    {
        id: "hockey-v-1",
        name: "Ice Phantom",
        sport: "hockey",
        category: "hockey-vintage",
        tag: "Limited Edition",
        img: "/jerseys/black.png",
        description: "A throwback to the golden era of hockey. The Ice Phantom features heavyweight mesh construction and classic lace-up collar for an authentic vintage feel.",
        adultSizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Midnight Black", hex: "#161A1D" },
            { name: "Ice White", hex: "#F5F3F4" },
            { name: "Allstar Red", hex: "#D90429" },
        ],
        availableNumbers: ["0", "1", "7", "9", "11", "17", "19", "21", "29", "33", "44", "66", "87", "99"],
    },
    {
        id: "hockey-v-2",
        name: "Glacier King",
        sport: "hockey",
        category: "hockey-vintage",
        tag: null,
        img: "/jerseys/red.png",
        description: "Cold-weather design meets retro styling. The Glacier King brings back the bold shoulder stripes and classic block lettering of vintage hockey.",
        adultSizes: ["S", "M", "L", "XL", "XXL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Allstar Red", hex: "#D90429" },
            { name: "Midnight Black", hex: "#161A1D" },
        ],
        availableNumbers: ["4", "8", "13", "18", "22", "32", "42", "52"],
    },
    {
        id: "hockey-v-3",
        name: "Puck Titan",
        sport: "hockey",
        category: "hockey-vintage",
        tag: null,
        img: "/jerseys/silver.png",
        description: "A muted silver colourway inspired by vintage team jerseys of the 1980s. Durable construction with embroidered twill numbering.",
        adultSizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Silver Slate", hex: "#9B9B9B" },
            { name: "Ice White", hex: "#F5F3F4" },
        ],
        availableNumbers: ["3", "6", "10", "15", "27", "37", "47", "77"],
    },

    // ─── BASKETBALL ────────────────────────────────────────────────────
    {
        id: "bball-v-1",
        name: "Vanguard Pro",
        sport: "basketball",
        category: "basketball-vintage",
        tag: "New Arrival",
        img: "/jerseys/black.png",
        description: "Inspired by the legendary '90s hardwood era. The Vanguard Pro features satin tackle twill numbering and a wide-body cut for that classic look.",
        adultSizes: ["S", "M", "L", "XL", "XXL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Midnight Black", hex: "#161A1D" },
            { name: "Allstar Red", hex: "#D90429" },
            { name: "Ice White", hex: "#F5F3F4" },
        ],
        availableNumbers: ["1", "2", "3", "5", "7", "10", "11", "21", "23", "24", "32", "33", "45"],
    },
    {
        id: "bball-v-2",
        name: "Court Legend",
        sport: "basketball",
        category: "basketball-vintage",
        tag: null,
        img: "/jerseys/red.png",
        description: "Pay homage to the greatest ballers of all time. Court Legend brings back the wide deep-cut armhole and elongated hemline of vintage hoops fashion.",
        adultSizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Allstar Red", hex: "#D90429" },
            { name: "Midnight Black", hex: "#161A1D" },
        ],
        availableNumbers: ["0", "1", "3", "6", "8", "11", "22", "23", "31", "41"],
    },
    {
        id: "bball-v-3",
        name: "Retro Icon",
        sport: "basketball",
        category: "basketball-vintage",
        tag: null,
        img: "/jerseys/silver.png",
        description: "A clean silver edition that channels the neutral colorways of old-school championship squads. Subtle embroidery detailing throughout.",
        adultSizes: ["S", "M", "L", "XL", "XXL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Silver Slate", hex: "#9B9B9B" },
            { name: "Ice White", hex: "#F5F3F4" },
        ],
        availableNumbers: ["4", "12", "20", "25", "30", "34", "40", "50"],
    },

    // ─── FOOTBALL ──────────────────────────────────────────────────────
    {
        id: "football-v-1",
        name: "Crimson Strike",
        sport: "football",
        category: "football-vintage",
        tag: null,
        img: "/jerseys/red.png",
        description: "The Crimson Strike is a tribute to the power running backs of the '70s. Heavy-duty stitching and classic shoulder numbering included.",
        adultSizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Allstar Red", hex: "#D90429" },
            { name: "Midnight Black", hex: "#161A1D" },
            { name: "Ice White", hex: "#F5F3F4" },
        ],
        availableNumbers: ["1", "9", "12", "14", "16", "18", "28", "33", "34", "52", "56", "75", "87", "88"],
    },
    {
        id: "football-v-2",
        name: "Iron Formation",
        sport: "football",
        category: "football-vintage",
        tag: null,
        img: "/jerseys/black.png",
        description: "Dark and dominant like the defenses that built dynasties. Iron Formation uses vintage block fonts and durable twill numbering.",
        adultSizes: ["M", "L", "XL", "XXL", "3XL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Midnight Black", hex: "#161A1D" },
            { name: "Allstar Red", hex: "#D90429" },
        ],
        availableNumbers: ["0", "5", "10", "50", "55", "63", "70", "72", "76", "82", "90", "95", "99"],
    },
    {
        id: "football-v-3",
        name: "Silver Gridiron",
        sport: "football",
        category: "football-vintage",
        tag: "Collector's Pick",
        img: "/jerseys/silver.png",
        description: "A rare silver colorway that echoes the metallic sheen of 1960s uniforms. Crafted for collectors and vintage enthusiasts alike.",
        adultSizes: ["XS", "S", "M", "L", "XL", "XXL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Silver Slate", hex: "#9B9B9B" },
            { name: "Ice White", hex: "#F5F3F4" },
        ],
        availableNumbers: ["7", "16", "32", "44", "56", "71", "80", "88"],
    },

    // ─── BASEBALL ──────────────────────────────────────────────────────
    {
        id: "baseball-v-1",
        name: "Diamond Cut",
        sport: "baseball",
        category: "baseball-vintage",
        tag: null,
        img: "/jerseys/red.png",
        description: "From the dugout to the streets. Diamond Cut replicates the iconic button-up flannel look of early baseball history in modern performance fabric.",
        adultSizes: ["XS", "S", "M", "L", "XL", "XXL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Allstar Red", hex: "#D90429" },
            { name: "Ice White", hex: "#F5F3F4" },
        ],
        availableNumbers: ["1", "3", "4", "5", "7", "8", "9", "14", "21", "24", "34", "42", "44"],
    },
    {
        id: "baseball-v-2",
        name: "Pinstripe Ace",
        sport: "baseball",
        category: "baseball-vintage",
        tag: "Best Seller",
        img: "/jerseys/black.png",
        description: "Clean pinstripes on jet black. The Pinstripe Ace is a modern icon with deep roots in mid-century baseball culture — a timeless wardrobe piece.",
        adultSizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Midnight Black", hex: "#161A1D" },
            { name: "Silver Slate", hex: "#9B9B9B" },
        ],
        availableNumbers: ["2", "6", "10", "13", "15", "23", "27", "32", "51", "52"],
    },
    {
        id: "baseball-v-3",
        name: "Home Run Classic",
        sport: "baseball",
        category: "baseball-vintage",
        tag: null,
        img: "/jerseys/silver.png",
        description: "The timeless white-and-silver colourway worn by legends at legendary home stadiums. Home Run Classic is clean, crisp, and undeniably iconic.",
        adultSizes: ["XS", "S", "M", "L", "XL", "XXL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Silver Slate", hex: "#9B9B9B" },
            { name: "Ice White", hex: "#F5F3F4" },
        ],
        availableNumbers: ["4", "9", "17", "29", "36", "40", "41", "45"],
    },

    // ─── SOCCER ────────────────────────────────────────────────────────
    {
        id: "soccer-v-1",
        name: "Alpine Stealth",
        sport: "soccer",
        category: "soccer-vintage",
        tag: null,
        img: "/jerseys/silver.png",
        description: "Clean lines and muted tones channel the minimalist European kits of the 1980s. Alpine Stealth is the go-to for the purist collector.",
        adultSizes: ["XS", "S", "M", "L", "XL", "XXL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Silver Slate", hex: "#9B9B9B" },
            { name: "Ice White", hex: "#F5F3F4" },
        ],
        availableNumbers: ["1", "5", "7", "9", "10", "11", "14", "17"],
    },
    {
        id: "soccer-v-2",
        name: "Ultras Retro",
        sport: "soccer",
        category: "soccer-vintage",
        tag: "New Arrival",
        img: "/jerseys/red.png",
        description: "Bold red and aggressive cut — the kind of kit that drives ultras wild in the stands. A tribute to the passionate football culture of the '90s.",
        adultSizes: ["S", "M", "L", "XL", "XXL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Allstar Red", hex: "#D90429" },
            { name: "Midnight Black", hex: "#161A1D" },
        ],
        availableNumbers: ["3", "4", "6", "8", "9", "10", "15", "18", "22"],
    },
    {
        id: "soccer-v-3",
        name: "Dark Derby",
        sport: "soccer",
        category: "soccer-vintage",
        tag: null,
        img: "/jerseys/black.png",
        description: "Match-day intensity encoded in deep charcoal. Dark Derby is for the midfielder who plays with edge and dresses like a champion.",
        adultSizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        youthSizes: ["YXS", "YS", "YM", "YL", "YXL"],
        availableColors: [
            { name: "Midnight Black", hex: "#161A1D" },
            { name: "Allstar Red", hex: "#D90429" },
        ],
        availableNumbers: ["2", "4", "7", "8", "10", "11", "16", "20", "23"],
    },
]
