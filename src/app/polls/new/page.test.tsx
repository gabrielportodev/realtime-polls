import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import NewPollPage from '@/app/polls/new/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() })
}))

vi.mock('@/lib/supabase/queries', () => ({
  createPoll: vi.fn()
}))

describe('NewPollPage', () => {
  it('renderiza título e descrição da página', () => {
    render(<NewPollPage />)
    expect(screen.getByRole('heading', { name: 'Criar enquete' })).toBeInTheDocument()
    expect(screen.getByText(/Preecha os seguintes campos/i)).toBeInTheDocument()
  })

  it('renderiza o formulário de criação de enquete', () => {
    render(<NewPollPage />)
    expect(screen.getByPlaceholderText('Ex: Qual a sua linguagem favorita?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /criar enquete/i })).toBeInTheDocument()
  })
})
