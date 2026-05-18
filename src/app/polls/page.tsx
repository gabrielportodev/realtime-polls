import { PollsFilter } from '@/components/poll/polls-filter'
import { getPolls } from '@/lib/supabase/server-queries'
import { PollCard } from '@/components/poll/poll-card'
import { Spinner } from '@/components/ui/spinner'
import { PollStatus } from '@/types'
import { Suspense } from 'react'
import Link from 'next/link'

interface PollsPageProps {
  searchParams: Promise<{ status?: PollStatus }>
}

async function PollsList({ status }: { status?: PollStatus }) {
  const polls = await getPolls(status)

  if (polls.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 gap-3'>
        <p className='text-neutral-dark text-sm'>Nenhuma enquete encontrada.</p>
        <Link href='/polls/new' className='text-sm text-primary font-semibold hover:underline'>
          Criar a primeira enquete
        </Link>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {polls.map(poll => (
        <Link key={poll.id} href={`/polls/${poll.id}`}>
          <PollCard title={poll.title} startAt={poll.start_at} endAt={poll.end_at} />
        </Link>
      ))}
    </div>
  )
}

export default async function PollsPage({ searchParams }: PollsPageProps) {
  const { status } = await searchParams

  return (
    <main className='max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8'>
      <div className='relative flex flex-col gap-4 sm:flex-row sm:items-end'>
        <div className='flex flex-col gap-1 text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:w-fit pointer-events-none'>
          <h1 className='text-2xl font-bold text-text-dark'>Enquetes</h1>
          <p className='text-sm text-neutral-dark'>Encontre aqui a sua enquete</p>
        </div>
        <div className='w-full sm:w-auto sm:ml-auto'>
          <Suspense
            fallback={
              <div className='flex flex-col gap-1'>
                <span className='text-base font-semibold text-text-dark'>Status</span>
                <div className='w-full sm:w-48 h-11 flex items-center justify-center rounded-xs border border-neutral bg-white'>
                  <Spinner size='sm' />
                </div>
              </div>
            }
          >
            <PollsFilter />
          </Suspense>
        </div>
      </div>

      <Suspense
        key={status}
        fallback={
          <div className='flex justify-center py-16'>
            <Spinner size='lg' />
          </div>
        }
      >
        <PollsList status={status} />
      </Suspense>
    </main>
  )
}
