'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'
import { CheckCircle2, Info, AlertTriangle, AlertCircle } from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group-[.toaster]:bg-secondary group-[.toaster]:text-white group-[.toaster]:border-none group-[.toaster]:shadow-2xl group-[.toaster]:rounded-none font-bold normal-case tracking-tight text-sm px-6 py-4 flex items-center gap-3',
          description: 'group-[.toast]:text-white/60 font-medium normal-case tracking-normal text-xs',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-none',
          cancelButton: 'group-[.toast]:bg-white/5 group-[.toast]:text-white/60 group-[.toast]:rounded-none',
          success: 'group-[.toast]:bg-secondary group-[.toast]:text-white',
          error: 'group-[.toast]:bg-red-500 group-[.toast]:text-white',
        },
      }}
      icons={{
        success: <CheckCircle2 className="h-5 w-5 text-primary" />,
        info: <Info className="h-5 w-5 text-primary" />,
        warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        error: <AlertCircle className="h-5 w-5 text-white" />,
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
