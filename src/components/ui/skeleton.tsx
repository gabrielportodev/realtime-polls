import { cn } from '@/lib/utils'

type SkeletonProps = React.ComponentProps<'div'>

function Skeleton({ className, ...props }: SkeletonProps) {
  return <div aria-hidden='true' className={cn('animate-pulse rounded-xs bg-neutral/30', className)} {...props} />
}

export { Skeleton }
