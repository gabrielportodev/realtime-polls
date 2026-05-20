import { cn } from '@/lib/utils'
import * as React from 'react'

export interface RadioOptionProps extends React.ComponentProps<'input'> {
  label: string
  error?: string
}

function RadioOption({ className, label, error, id, ...props }: RadioOptionProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={inputId} className='flex items-start gap-2 cursor-pointer group'>
        <input
          id={inputId}
          type='radio'
          className={cn(
            'size-4 shrink-0 mt-0.5 cursor-pointer appearance-none rounded-full border-2 border-neutral',
            'transition-all',
            'checked:border-primary checked:bg-primary checked:[box-shadow:inset_0_0_0_3px_white]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        <span className='text-sm text-text-dark group-has-disabled:opacity-50'>{label}</span>
      </label>
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  )
}

export { RadioOption }
