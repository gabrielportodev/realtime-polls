import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PollsPage from '@/app/polls/page'
import { Poll } from '@/types'

const mockGetPolls = vi.fn()

vi.mock('@/lib/supabase/server-queries', () => ({
  getPolls: (...args: unknown[]) => mockGetPolls(...args)
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams()
}))

const samplePoll: Poll = {
  id: '1',
  title: 'Qual o melhor framework?',
  start_at: '2099-01-01T00:00:00',
  end_at: '2099-12-31T00:00:00',
  created_at: '2024-01-01T00:00:00',
  poll_options: []
}

describe('PollsPage', () => {
  it('renderiza título e descrição da página', async () => {
    mockGetPolls.mockResolvedValueOnce({ polls: [samplePoll], totalCount: 1 })
    const ui = await PollsPage({ searchParams: Promise.resolve({}) })
    render(ui)
    expect(screen.getByRole('heading', { name: 'Enquetes' })).toBeInTheDocument()
    expect(screen.getByText('Encontre aqui a sua enquete')).toBeInTheDocument()
  })

  it('renderiza o filtro de status', async () => {
    mockGetPolls.mockResolvedValueOnce({ polls: [], totalCount: 0 })
    const ui = await PollsPage({ searchParams: Promise.resolve({}) })
    render(ui)
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
  })

  it('encaminha o status do searchParams para getPolls', async () => {
    mockGetPolls.mockResolvedValueOnce({ polls: [], totalCount: 0 })
    const ui = await PollsPage({ searchParams: Promise.resolve({ status: 'ongoing' }) })
    render(ui)
    expect(mockGetPolls).toHaveBeenCalledWith('ongoing')
  })
})
