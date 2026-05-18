import { cn } from '@/lib/utils'

export interface VoteBarProps {
  label: string
  votes: number
  totalVotes: number
  disabled?: boolean
}

function VoteBar({ label, votes, totalVotes, disabled = false }: VoteBarProps) {
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0

  return (
    <div
      className={cn(
        'relative w-full h-10 rounded-xs overflow-hidden bg-primary-light',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div
        className='absolute inset-y-0 left-0 bg-primary transition-all duration-500'
        style={{ width: `${percentage}%` }}
      />

      <div className='relative z-10 flex items-center justify-between h-full px-4'>
        <span className='text-sm font-semibold text-white'>{label}</span>
        <span className='text-sm font-semibold text-white'>{votes} votos</span>
      </div>
    </div>
  )
}

export { VoteBar }
