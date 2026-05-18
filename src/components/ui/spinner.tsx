import { cn } from '@/lib/utils'

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-10 border-[3px]'
}

function Spinner({ className, size = 'md' }: SpinnerProps) {
  return (
    <div
      role='status'
      aria-label='Carregando'
      className={cn('rounded-full border-neutral/30 border-t-primary animate-spin', sizeClasses[size], className)}
    />
  )
}

export { Spinner }
