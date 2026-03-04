'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'
import { CheckCircle2, Info, AlertTriangle, AlertCircle } from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group-[.toaster]:bg-white group-[.toaster]:text-secondary group-[.toaster]:border-none group-[.toaster]:shadow-lg group-[.toaster]:rounded-none font-bold uppercase tracking-[0.05em] text-[10px] px-6 py-4',
          description: 'group-[.toast]:text-secondary/60 font-medium normal-case tracking-normal',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-none',
          cancelButton: 'group-[.toast]:bg-black/5 group-[.toast]:text-secondary/60 group-[.toast]:rounded-none',
          success: 'group-[.toast]:border-none',
          error: 'group-[.toast]:border-none',
        },
      }}
      icons={{
        success: <CheckCircle2 className="h-4 w-4 text-primary" />,
        info: <Info className="h-4 w-4 text-blue-500" />,
        warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
        error: <AlertCircle className="h-4 w-4 text-red-500" />,
      }}
      style={
        {
          '--normal-bg': '#FFFFFF',
          '--normal-text': '#101010',
          '--normal-border': 'transparent',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
