import * as React from "react"
import { Input } from "@/shared/ui/shad/input"
import { cn } from "@/lib/utils"

export interface CustomInputProps extends React.ComponentProps<typeof Input> { }

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ className, ...props }, ref) => {
        return (
            <Input
                ref={ref}
                className={cn(
                    "h-14 md:h-16 px-6 bg-slate-50 border-slate-200  text-lg font-medium placeholder:text-slate-300 dark:placeholder:text-zinc-700 transition-all focus:ring-4 focus:ring-primary/10",
                    className
                )}
                {...props}
            />
        )
    }
)
CustomInput.displayName = "CustomInput"

export { CustomInput }
