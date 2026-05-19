import { PollVotingSkeleton } from '@/components/poll/poll-voting-skeleton'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('PollVotingSkeleton', () => {
  it('expõe role status com label de carregamento', () => {
    render(<PollVotingSkeleton />)
    expect(screen.getByRole('status', { name: 'Carregando enquete' })).toBeInTheDocument()
  })

  it('renderiza 4 linhas de opção por padrão', () => {
    const { container } = render(<PollVotingSkeleton />)
    const rows = container.querySelectorAll('.size-5.rounded-full')
    expect(rows).toHaveLength(4)
  })

  it('respeita a prop optionsCount', () => {
    const { container } = render(<PollVotingSkeleton optionsCount={6} />)
    const rows = container.querySelectorAll('.size-5.rounded-full')
    expect(rows).toHaveLength(6)
  })

  it('renderiza variante "results" com barras de progresso', () => {
    const { container } = render(<PollVotingSkeleton variant='results' optionsCount={3} />)
    const bars = container.querySelectorAll('.h-2.rounded-full')
    expect(bars).toHaveLength(3)
  })
})
