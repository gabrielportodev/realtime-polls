import { PollCardSkeleton, PollsListSkeleton } from '@/components/poll/poll-card-skeleton'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('PollCardSkeleton', () => {
  it('expõe role status com label de carregamento', () => {
    render(<PollCardSkeleton />)
    expect(screen.getByRole('status', { name: 'Carregando enquete' })).toBeInTheDocument()
  })
})

describe('PollsListSkeleton', () => {
  it('renderiza 6 skeletons por padrão', () => {
    render(<PollsListSkeleton />)
    expect(screen.getAllByRole('status', { name: 'Carregando enquete' })).toHaveLength(6)
  })

  it('aceita a quantidade via prop count', () => {
    render(<PollsListSkeleton count={3} />)
    expect(screen.getAllByRole('status', { name: 'Carregando enquete' })).toHaveLength(3)
  })
})
