import { getPollById } from '@/lib/supabase/server-queries'
import { PollVotingSkeleton } from '@/components/poll/poll-voting-skeleton'
import { PollVoting } from '@/components/poll/poll-voting'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

interface PollDetailPageProps {
  params: Promise<{ id: string }>
}

export async function PollDetail({ id }: { id: string }) {
  const poll = await getPollById(id)

  if (!poll) return notFound()

  return <PollVoting initialPoll={poll} />
}

export default async function PollDetailPage({ params }: PollDetailPageProps) {
  const { id } = await params

  return (
    <Suspense fallback={<PollVotingSkeleton />}>
      <PollDetail id={id} />
    </Suspense>
  )
}
