'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface VoteBarProps {
  label: string
  votes: number
  totalVotes: number
}

function VoteBar({ label, votes, totalVotes }: VoteBarProps) {
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimatedPercentage(percentage))
    return () => cancelAnimationFrame(frame)
  }, [percentage])

  return (
    <div className={cn('relative w-full h-10 rounded-sm overflow-hidden bg-primary-light/80')}>
      <div
        className='absolute inset-y-0 left-0 bg-primary transition-[width] duration-700 ease-out'
        style={{ width: `${animatedPercentage}%` }}
      />

      <div className='relative z-10 flex items-center justify-between h-full px-4'>
        <span className='text-sm font-semibold text-white truncate'>{label}</span>
        <span className='text-sm font-semibold text-white'>
          {votes} {votes === 1 ? 'voto' : 'votos'}
        </span>
      </div>
    </div>
  )
}

export { VoteBar }
