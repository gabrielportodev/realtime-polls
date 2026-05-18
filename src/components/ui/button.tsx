import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'cursor-pointer inline-flex shrink-0 items-center justify-center gap-2 rounded-xs text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary/90',
        full: 'bg-primary text-white hover:bg-primary/90 w-full',
        outline: 'border border-primary text-primary bg-white hover:bg-primary/5',
        secondary: 'bg-neutral-dark text-text-white hover:bg-neutral-dark/90',
        ghost: 'bg-neutral text-text-white hover:bg-neutral/90'
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-12 px-6 text-base'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default'
    }
  }
)

export interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
}

function Button({
  className,
  variant = 'primary',
  size = 'default',
  asChild = false,
  icon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp data-slot='button' className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {icon}
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
