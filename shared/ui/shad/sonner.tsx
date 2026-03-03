'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'
import { CheckCircle2, Info, AlertTriangle, AlertCircle } from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group-[.toaster]:bg-secondary group-[.toaster]:text-white group-[.toaster]:border-primary group-[.toaster]:shadow-none group-[.toaster]:rounded-none font-bold uppercase tracking-[0.05em] text-[10px] px-6 py-4',
          description: 'group-[.toast]:text-white/60 font-medium normal-case tracking-normal',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-none',
          cancelButton: 'group-[.toast]:bg-white/10 group-[.toast]:text-white/60 group-[.toast]:rounded-none',
          success: 'group-[.toast]:border-primary',
          error: 'group-[.toast]:border-red-500',
        },
      }}
      icons={{
        success: <CheckCircle2 className="h-4 w-4 text-primary" />,
        info: <Info className="h-4 w-4 text-primary" />,
        warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
        error: <AlertCircle className="h-4 w-4 text-red-500" />,
      }}
      style={
        {
          '--normal-bg': '#101010',
          '--normal-text': '#FFFFFF',
          '--normal-border': 'rgba(217, 4, 41, 0.2)', // primary with alpha
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
