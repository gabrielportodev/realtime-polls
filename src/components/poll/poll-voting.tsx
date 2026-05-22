'use client'

import { getPollStatus, POLL_STATUS_LABELS, POLL_STATUS_COLORS } from '@/lib/get-poll-status'
import { hasVotedOnPoll, markPollAsVoted, getVotedOptionId } from '@/lib/voted-polls'
import { PollVotingSkeleton } from '@/components/poll/poll-voting-skeleton'
import { RadioOption } from '@/components/ui/radio-option'
import { createClient } from '@/lib/supabase/client'
import { VoteBar } from '@/components/poll/vote-bar'
import { Button } from '@/components/ui/button'
import { vote } from '@/lib/supabase/queries'
import { Card } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import { Poll, Vote } from '@/types'

interface PollVotingProps {
  initialPoll: Poll
}

function PollVoting({ initialPoll }: PollVotingProps) {
  const [poll, setPoll] = useState(initialPoll)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(() => hasVotedOnPoll(poll.id))
  const [showResults, setShowResults] = useState(() => hasVotedOnPoll(poll.id))
  const [votedOptionId, setVotedOptionId] = useState<string | null>(() => getVotedOptionId(poll.id))
  const [isLoading, setIsLoading] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  function toggleResults(next: boolean) {
    setIsTransitioning(true)
    setTimeout(() => {
      setShowResults(next)
      if (!next) setSelectedOption(null)
      setIsTransitioning(false)
    }, 300)
  }

  const status = getPollStatus(poll.start_at, poll.end_at)
  const isActive = status === 'ongoing'

  const totalVotes = poll.poll_options?.reduce((sum, opt) => sum + (opt.votes?.length ?? 0), 0) ?? 0

  const optionIds = poll.poll_options?.map(opt => opt.id).join(',') ?? ''

  useEffect(() => {
    const supabase = createClient()
    const ids = optionIds.split(',').filter(Boolean)
    if (ids.length === 0) return

    const channel = supabase
      .channel(`poll-votes-${poll.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'votes',
          filter: `poll_option_id=in.(${ids.join(',')})`
        },
        payload => {
          setPoll(prev => ({
            ...prev,
            poll_options: prev.poll_options?.map(opt =>
              opt.id === payload.new.poll_option_id
                ? { ...opt, votes: [...(opt.votes ?? []), payload.new as unknown as Vote] }
                : opt
            )
          }))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [poll.id, optionIds])

  async function handleVote() {
    if (!selectedOption) return
    setIsLoading(true)
    setErrorMessage(null)
    try {
      await vote(selectedOption)
      markPollAsVoted(poll.id, selectedOption)
      setHasVoted(true)
      setVotedOptionId(selectedOption)
      toggleResults(true)
    } catch {
      setErrorMessage('Não foi possível registrar seu voto. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isTransitioning) {
    return (
      <PollVotingSkeleton optionsCount={poll.poll_options?.length ?? 4} variant={showResults ? 'voting' : 'results'} />
    )
  }

  if (showResults) {
    return (
      <div className='bg-background flex justify-center items-start px-4 pt-16 pb-10'>
        <Card className='p-10 w-full max-w-2xl gap-6'>
          <h1 className='text-base font-bold text-text-dark break-all'>{poll.title}</h1>

          <div className='flex flex-col gap-2'>
            {poll.poll_options?.map(option => (
              <VoteBar
                key={option.id}
                label={option.text}
                votes={option.votes?.length ?? 0}
                totalVotes={totalVotes}
                isVoted={option.id === votedOptionId}
              />
            ))}
          </div>

          <Button variant='secondary' className='self-start' onClick={() => toggleResults(false)}>
            Voltar
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className='bg-background flex justify-center items-start px-4 pt-16 pb-10'>
      <Card className='p-10 w-full max-w-2xl gap-6'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between gap-2'>
            <h1 className='text-base font-bold text-text-dark break-all'>{poll.title}</h1>
            {!isActive && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${POLL_STATUS_COLORS[status]}`}
              >
                {POLL_STATUS_LABELS[status]}
              </span>
            )}
          </div>
          {isActive && <p className='text-sm text-neutral-dark'>Escolha uma resposta</p>}
        </div>

        <div className='flex flex-col gap-3'>
          {poll.poll_options?.map(option => (
            <RadioOption
              key={option.id}
              name='poll-option'
              label={option.text}
              value={option.id}
              disabled={!isActive || hasVoted}
              checked={selectedOption === option.id}
              onChange={() => setSelectedOption(option.id)}
            />
          ))}
        </div>

        <div className='flex gap-3 w-fit'>
          {status === 'ongoing' && !hasVoted && (
            <Button variant='primary' disabled={!selectedOption || isLoading} onClick={handleVote}>
              {isLoading ? 'Votando...' : 'Votar'}
            </Button>
          )}

          {(!isActive || hasVoted) && (
            <Link href='/polls'>
              <Button variant='secondary'>Voltar</Button>
            </Link>
          )}

          {status !== 'not_started' && (
            <Button variant='secondary' onClick={() => toggleResults(true)}>
              Resultados
            </Button>
          )}
        </div>

        {errorMessage && (
          <p role='alert' className='text-sm text-red-600'>
            {errorMessage}
          </p>
        )}
      </Card>
    </div>
  )
}

export { PollVoting }
