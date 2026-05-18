import { formatDate } from '@/lib/format-date'
import { cn } from '@/lib/utils'

export interface PollCardProps {
  title: string
  startAt: string | Date
  endAt: string | Date
  onClick?: VoidFunction
  className?: string
}

function PollCard({ title, startAt, endAt, onClick, className }: PollCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl border border-neutral/20 shadow-sm p-6',
        'flex flex-col gap-4',
        onClick && 'cursor-pointer hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      <h3 className='text-base font-bold text-text-dark text-center leading-snug'>{title}</h3>
      <div className='flex flex-wrap gap-x-4 gap-y-1'>
        <span className='flex-1 min-w-max text-center text-xs text-neutral-dark'>Inicio: {formatDate(startAt)}</span>
        <span className='flex-1 min-w-max text-center text-xs text-neutral-dark'>Término: {formatDate(endAt)}</span>
      </div>
    </div>
  )
}

export { PollCard }
