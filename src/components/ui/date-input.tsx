import { cn } from '@/lib/utils'
import Image from 'next/image'
import * as React from 'react'

export interface DateInputProps extends React.ComponentProps<'input'> {
  label?: string
  error?: string
}

function DateInput({ className, label, error, id, ref: externalRef, ...props }: DateInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const internalRef = React.useRef<HTMLInputElement | null>(null)

  function mergedRef(node: HTMLInputElement | null) {
    internalRef.current = node
    if (typeof externalRef === 'function') externalRef(node)
    else if (externalRef) (externalRef as React.RefObject<HTMLInputElement | null>).current = node
  }

  function handleIconClick() {
    internalRef.current?.focus()
    internalRef.current?.showPicker()
  }

  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && (
        <label htmlFor={inputId} className='text-base font-semibold text-text-dark'>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        <input
          ref={mergedRef}
          id={inputId}
          type='datetime-local'
          className={cn(
            'w-full h-11 px-4 pr-10 rounded-xs border border-neutral bg-white',
            'text-sm text-text-dark placeholder:text-neutral',
            'outline-none transition-all focus:ring-2 focus:ring-primary/30',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            '[&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden',
            error && 'border-red-500 focus:ring-red-500/30',
            className
          )}
          {...props}
        />
        <button
          type='button'
          onClick={handleIconClick}
          className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
          tabIndex={-1}
          aria-label='Abrir calendário'
        >
          <Image src='/Calendar.png' alt='Calendário' width={20} height={20} />
        </button>
      </div>
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  )
}

export { DateInput }
