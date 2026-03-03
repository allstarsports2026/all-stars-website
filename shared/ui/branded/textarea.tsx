import * as React from "react"
import { Textarea } from "@/shared/ui/shad/textarea"
import { cn } from "@/lib/utils"

export interface CustomTextareaProps extends React.ComponentProps<typeof Textarea> { }

const CustomTextarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <Textarea
                ref={ref}
                className={cn(
                    "min-h-[120px] p-6 bg-slate-50 border-slate-200  rounded-xl text-lg font-medium placeholder:text-slate-300 dark:placeholder:text-zinc-700 transition-all focus:ring-4 focus:ring-primary/10",
                    className
                )}
                {...props}
            />
        )
    }
)
CustomTextarea.displayName = "CustomTextarea"

export { CustomTextarea }
