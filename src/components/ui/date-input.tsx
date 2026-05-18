import { Calendar } from 'lucide-react'
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
      <div className='relative w-full'>
        <input
          id={inputId}
          type='datetime-local'
          className={cn(
            'w-full h-11 px-4 pr-10 rounded-xs border border-neutral bg-white',
            'text-sm text-text-dark',
            'outline-none transition-all',
            'focus:border-primary focus:ring-2 focus:ring-primary/30',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            '[&::-webkit-calendar-picker-indicator]:opacity-0',
            '[&::-webkit-calendar-picker-indicator]:absolute',
            '[&::-webkit-calendar-picker-indicator]:inset-0',
            '[&::-webkit-calendar-picker-indicator]:w-full',
            '[&::-webkit-calendar-picker-indicator]:cursor-pointer',
            error && 'border-red-500 focus:ring-red-500/30',
            className
          )}
          {...props}
        />
        <Calendar className='absolute right-3 top-1/2 -translate-y-1/2 size-4 text-neutral-dark pointer-events-none' />
      </div>
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  )
}

export { DateInput }
