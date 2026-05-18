import { getPollById } from '@/lib/supabase/server-queries'
import { PollVoting } from '@/components/poll/poll-voting'
import { notFound } from 'next/navigation'

interface PollDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function PollDetailPage({ params }: PollDetailPageProps) {
  const { id } = await params
  const poll = await getPollById(id)

  if (!poll) notFound()

  return <PollVoting initialPoll={poll} />
}
