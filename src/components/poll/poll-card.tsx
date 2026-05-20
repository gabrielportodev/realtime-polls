import { formatDate } from '@/lib/format-date'
import { Card, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface PollCardProps {
  title: string
  startAt: string | Date
  endAt: string | Date
  onClick?: VoidFunction
  className?: string
}

export function PollCard({ title, startAt, endAt, onClick, className }: PollCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'p-6 gap-4 transition-all duration-300 ease-out',
        'hover:-translate-y-0.5 hover:border-primary/40 cursor-pointer',
        className
      )}
    >
      <CardTitle className='text-base font-bold text-text-dark text-center leading-snug line-clamp-2'>
        {title}
      </CardTitle>
      <div className='flex flex-wrap gap-x-4 gap-y-1 mt-auto'>
        <span className='flex-1 min-w-max text-center text-xs text-neutral-dark'>Inicio: {formatDate(startAt)}</span>
        <span className='flex-1 min-w-max text-center text-xs text-neutral-dark'>Término: {formatDate(endAt)}</span>
      </div>
    </Card>
  )
}
