import { render, screen } from '@testing-library/react'
import PollDetailPage, { PollDetail } from '@/app/polls/[id]/page'
import { describe, expect, it, vi } from 'vitest'
import { Poll } from '@/types'

const mockGetPollById = vi.fn()
const mockNotFound = vi.fn(() => {
  throw new Error('NEXT_NOT_FOUND')
})

vi.mock('@/lib/supabase/server-queries', () => ({
  getPollById: (...args: unknown[]) => mockGetPollById(...args)
}))

vi.mock('next/navigation', () => ({
  notFound: () => mockNotFound()
}))

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    channel: () => ({
      on: function () {
        return this
      },
      subscribe: vi.fn()
    }),
    removeChannel: vi.fn()
  })
}))

vi.mock('@/lib/supabase/queries', () => ({
  vote: vi.fn()
}))

const samplePoll: Poll = {
  id: 'abc',
  title: 'Qual o melhor framework?',
  start_at: '2099-01-01T00:00:00',
  end_at: '2099-12-31T23:59:00',
  created_at: '2024-01-01T00:00:00',
  poll_options: [
    { id: 'o1', poll_id: 'abc', text: 'React', votes: [] },
    { id: 'o2', poll_id: 'abc', text: 'Vue', votes: [] },
    { id: 'o3', poll_id: 'abc', text: 'Angular', votes: [] }
  ]
}

describe('PollDetailPage', () => {
  it('renderiza o skeleton enquanto carrega', async () => {
    const ui = await PollDetailPage({ params: Promise.resolve({ id: 'abc' }) })
    render(ui)
    expect(screen.getByRole('status', { name: 'Carregando enquete' })).toBeInTheDocument()
  })
})

describe('PollDetail', () => {
  it('busca a enquete pelo id', async () => {
    mockGetPollById.mockResolvedValueOnce(samplePoll)
    await PollDetail({ id: 'abc' })
    expect(mockGetPollById).toHaveBeenCalledWith('abc')
  })

  it('renderiza a tela de votação quando a enquete existe', async () => {
    mockGetPollById.mockResolvedValueOnce(samplePoll)
    const ui = await PollDetail({ id: 'abc' })
    render(ui)
    expect(screen.getByText('Qual o melhor framework?')).toBeInTheDocument()
    expect(screen.getByLabelText('React')).toBeInTheDocument()
  })

  it('chama notFound quando a enquete não existe', async () => {
    mockGetPollById.mockResolvedValueOnce(null)
    await expect(PollDetail({ id: 'missing' })).rejects.toThrow('NEXT_NOT_FOUND')
    expect(mockNotFound).toHaveBeenCalled()
  })
})
