import { Skeleton } from '@/components/ui/skeleton'

function PollCardSkeleton() {
  return (
    <div
      role='status'
      aria-label='Carregando enquete'
      className='bg-white rounded-2xl border border-neutral/20 shadow-sm p-6 flex flex-col gap-4'
    >
      <Skeleton className='h-5 w-3/4 mx-auto' />
      <div className='flex flex-wrap gap-x-4 gap-y-1'>
        <Skeleton className='h-3 flex-1 min-w-[120px]' />
        <Skeleton className='h-3 flex-1 min-w-[120px]' />
      </div>
    </div>
  )
}

interface PollsListSkeletonProps {
  count?: number
}

function PollsListSkeleton({ count = 6 }: PollsListSkeletonProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {Array.from({ length: count }).map((_, i) => (
        <PollCardSkeleton key={i} />
      ))}
    </div>
  )
}

export { PollCardSkeleton, PollsListSkeleton }
