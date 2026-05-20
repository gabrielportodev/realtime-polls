import { hasVotedOnPoll, markPollAsVoted } from '@/lib/voted-polls'
import { beforeEach, describe, expect, it } from 'vitest'

describe('hasVotedOnPoll', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('retorna false quando o usuário não votou na enquete', () => {
    expect(hasVotedOnPoll('poll-1')).toBe(false)
  })

  it('retorna true após marcar a enquete como votada', () => {
    markPollAsVoted('poll-1')
    expect(hasVotedOnPoll('poll-1')).toBe(true)
  })

  it('não afeta outras enquetes ao marcar uma enquete como votada', () => {
    markPollAsVoted('poll-1')
    expect(hasVotedOnPoll('poll-2')).toBe(false)
  })
})

describe('markPollAsVoted', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('persiste o voto no localStorage', () => {
    markPollAsVoted('poll-1')
    const stored = JSON.parse(localStorage.getItem('voted_polls') ?? '[]') as string[]
    expect(stored).toContain('poll-1')
  })

  it('não duplica entradas ao votar mais de uma vez na mesma enquete', () => {
    markPollAsVoted('poll-1')
    markPollAsVoted('poll-1')
    const stored = JSON.parse(localStorage.getItem('voted_polls') ?? '[]') as string[]
    expect(stored.filter(id => id === 'poll-1')).toHaveLength(1)
  })

  it('acumula múltiplas enquetes votadas', () => {
    markPollAsVoted('poll-1')
    markPollAsVoted('poll-2')
    const stored = JSON.parse(localStorage.getItem('voted_polls') ?? '[]') as string[]
    expect(stored).toContain('poll-1')
    expect(stored).toContain('poll-2')
  })
})
