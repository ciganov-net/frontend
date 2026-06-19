import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/libs/tw-merge'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        solid: '',
        outline: ''
      },
      color: {
        primary: '',
        secondary: ''
      },
      size: {
        large: 'h-[62px] gap-2 px-8 py-4 typo-large-caps',
        medium: 'h-[40px] gap-2 px-3 py-2 typo-small-bold',
        sm: 'h-[24px] gap-2 px-2 py-2 typo-small-bold',
        icon: 'h-[8px] p-2'
      }
    },
    compoundVariants: [
      {
        variant: 'solid',
        color: 'primary',
        className: [
          '[background:var(--button-primary-solid-background-default)]',
          'text-[var(--button-primary-solid-text-default)]',
          'hover:[background:var(--button-primary-solid-background-hover)]',
          'active:[background:var(--button-primary-solid-background-active)]',
          'disabled:[background:var(--button-primary-solid-background-disabled)]',
          'disabled:text-[var(--button-primary-solid-text-disabled)]'
        ]
      },
      {
        variant: 'solid',
        color: 'secondary',
        className: [
          '[background:var(--button-secondary-solid-background-default)]',
          'text-[var(--button-secondary-solid-text-default)]',
          'hover:[background:var(--button-secondary-solid-background-hover)]',
          'active:[background:var(--button-secondary-solid-background-active)]',
          'disabled:[background:var(--button-secondary-solid-background-disabled)]',
          'disabled:text-[var(--button-secondary-solid-text-disabled)]'
        ]
      },
      {
        variant: 'outline',
        color: 'primary',
        className: [
          'bg-transparent',
          'text-[var(--button-primary-outline-text-default)]',
          'border-[var(--button-primary-outline-border-default)]',
          'hover:text-[var(--button-primary-outline-text-hover)]',
          'hover:border-[var(--button-primary-outline-border-hover)]',
          'active:text-[var(--button-primary-outline-text-active)]',
          'active:border-[var(--button-primary-outline-border-active)]',
          'disabled:[background:var(--button-secondary-solid-background-disabled)]',
          'disabled:text-[var(--button-secondary-solid-text-disabled)]'
        ]
      },
      {
        variant: 'outline',
        color: 'secondary',
        className: [
          'bg-transparent',
          'text-[var(--button-secondary-outline-text-default)]',
          'border-[var(--button-secondary-outline-border-default)]',
          'hover:text-[var(--button-secondary-outline-text-hover)]',
          'hover:border-[var(--button-secondary-outline-border-hover)]',
          'active:text-[var(--button-secondary-outline-text-active)]',
          'active:border-[var(--button-secondary-outline-border-active)]',
          'disabled:[background:var(--button-secondary-solid-background-disabled)]',
          'disabled:text-[var(--button-secondary-solid-text-disabled)]'
        ]
      }
    ]
  }
)

function Button({
  className,
  variant = 'solid',
  color = 'primary',
  size = 'large',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot='button'
      data-variant={variant}
      data-color={color}
      data-size={size}
      className={cn(buttonVariants({ variant, color, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
