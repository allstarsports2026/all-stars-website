'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'
import { CheckCircle2, Info, AlertTriangle, AlertCircle } from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{ 
        classNames: {
          toast: 'group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: 'group-[.toast]:text-primary',
          info: 'group-[.toast]:text-primary',
        },
      }}
      icons={{
        success: <CheckCircle2 className="h-4 w-4 text-primary" />,
        info: <Info className="h-4 w-4 text-primary" />,
        warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
        error: <AlertCircle className="h-4 w-4 text-destructive" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
