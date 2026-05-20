import { PollsListSkeleton } from '@/components/poll/poll-card-skeleton'
import { PollsFilter } from '@/components/poll/polls-filter'
import { getPolls } from '@/lib/supabase/server-queries'
import { PollCard } from '@/components/poll/poll-card'
import { Button } from '@/components/ui/button'
import { PollStatus } from '@/types'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface PollsPageProps {
  searchParams: Promise<{ status?: PollStatus }>
}

async function PollsList({ status }: { status?: PollStatus }) {
  const { polls, totalCount } = await getPolls(status)

  if (polls.length === 0) {
    const hasNoPollsAtAll = totalCount === 0
    return (
      <div className='flex flex-col items-center justify-center text-center py-16 gap-3'>
        <div className='flex flex-col gap-1 max-w-sm'>
          <h2 className='text-lg font-bold text-text-dark'>
            {hasNoPollsAtAll ? 'Nenhuma enquete cadastrada' : 'Nenhuma enquete encontrada'}
          </h2>
          <p className='text-sm text-neutral-dark'>
            {hasNoPollsAtAll
              ? 'Você ainda não criou nenhuma enquete. Que tal começar agora?'
              : 'Não encontramos enquetes com esse status. Tente outro filtro ou crie uma nova.'}
          </p>
        </div>
        <Link href='/polls/new'>
          <Button
            icon={<Image src='/PlusCircle.png' alt='' width={16} height={16} aria-hidden='true' className='size-4' />}
          >
            Criar enquete
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {polls.map(poll => (
        <Link key={poll.id} href={`/polls/${poll.id}`} className='h-full'>
          <PollCard title={poll.title} startAt={poll.start_at} endAt={poll.end_at} className='h-full' />
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
          <PollsFilter />
        </div>
      </div>

      <Suspense key={status} fallback={<PollsListSkeleton />}>
        <PollsList status={status} />
      </Suspense>
    </main>
  )
}
