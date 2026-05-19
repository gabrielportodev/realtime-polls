import { Skeleton } from '@/components/ui/skeleton'

interface PollVotingSkeletonProps {
  optionsCount?: number
  variant?: 'voting' | 'results'
}

function PollVotingSkeleton({ optionsCount = 4, variant = 'voting' }: PollVotingSkeletonProps) {
  return (
    <div
      role='status'
      aria-label='Carregando enquete'
      className='min-h-screen bg-background flex justify-center items-start px-4 pt-16'
    >
      <div className='bg-white rounded-sm shadow-sm p-10 w-full max-w-2xl flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-5 w-3/4' />
          <Skeleton className='h-4 w-40' />
        </div>

        <div className='flex flex-col gap-3'>
          {Array.from({ length: optionsCount }).map((_, i) =>
            variant === 'voting' ? (
              <div key={i} className='flex items-center gap-3'>
                <Skeleton className='size-5 rounded-full shrink-0' />
                <Skeleton className='h-4 flex-1 max-w-sm' />
              </div>
            ) : (
              <div key={i} className='flex flex-col gap-1'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-3 w-16' />
                </div>
                <Skeleton className='h-2 w-full rounded-full' />
              </div>
            )
          )}
        </div>

        <div className='flex gap-3'>
          <Skeleton className='h-10 w-24' />
          <Skeleton className='h-10 w-28' />
        </div>
      </div>
    </div>
  )
}

export { PollVotingSkeleton }
