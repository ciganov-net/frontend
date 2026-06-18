import * as React from "react"

import { cn } from '@/libs/tw-merge'

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        [
          'h-[48px] gap-3 px-4 py-3 typo-small rounded-[var(--radius-xs)] border',
          'border-[var(--textfield-border-default)]',
          'bg-[var(--textfield-background-default)]',
          'outline-none transition-all',
          'text-[var(--textfield-text-default)]',
          'placeholder:text-[var(--textfield-label-default)]',
          'hover:border-[var(--textfield-border-hover)]',
          'focus-visible:[border-color:var(--textfield-border-active)]',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:border-[var(--textfield-border-error)]',
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground'
        ],
        className
      )}
      {...props}
    />
  )
}

export { Input }
