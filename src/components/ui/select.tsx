import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import * as React from 'react'

export interface SelectProps extends React.ComponentProps<'select'> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

function Select({ className, label, error, id, options, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && (
        <label htmlFor={selectId} className='text-base font-semibold text-text-dark'>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        <select
          id={selectId}
          className={cn(
            'w-full h-11 px-4 pr-10 rounded-xs border border-neutral bg-white',
            'text-sm text-text-dark appearance-none',
            'outline-none transition-all cursor-pointer',
            'focus:border-primary focus:ring-2 focus:ring-primary/30',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:ring-red-500/30',
            className
          )}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 size-4 text-neutral-dark pointer-events-none' />
      </div>
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  )
}

export { Select }
