import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap uppercase italic font-black transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground border-l-4 border-secondary shadow-[8px_8px_0px_var(--secondary)] hover:brightness-110",
                outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 shadow-[4px_4px_0px_var(--primary)]",
                ghost: "hover:bg-accent hover:text-accent-foreground border-none shadow-none",
                secondary: "bg-secondary text-secondary-foreground border-l-4 border-primary shadow-[8px_8px_0px_var(--primary)] hover:brightness-110",
            },
            size: {
                default: "px-10 py-4 tracking-widest",
                sm: "px-6 py-2 text-xs tracking-wider",
                lg: "px-14 py-6 text-lg tracking-[0.2em]",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
CustomButton.displayName = "CustomButton"

export { CustomButton, buttonVariants }
