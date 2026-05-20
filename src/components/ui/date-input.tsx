import { cn } from '@/lib/utils'
import * as React from 'react'

export interface DateInputProps extends React.ComponentProps<'input'> {
  label?: string
  error?: string
}

function DateInput({ className, label, error, id, ...props }: DateInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && (
        <label htmlFor={inputId} className='text-base font-semibold text-text-dark'>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type='datetime-local'
        className={cn(
          'w-full h-11 px-4 rounded-xs border border-neutral bg-white',
          'text-sm text-text-dark placeholder:text-neutral',
          'outline-none transition-all focus:ring-2 focus:ring-primary/30',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          '[&::-webkit-inner-spin-button]:hidden',
          error && 'border-red-500 focus:ring-red-500/30',
          className
        )}
        {...props}
      />
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  )
}

export { DateInput }
