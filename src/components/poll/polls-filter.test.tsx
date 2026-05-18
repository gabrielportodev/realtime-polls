import { PollsFilter } from '@/components/poll/polls-filter'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

const mockPush = vi.fn()
const mockSearchParams = new URLSearchParams()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => mockSearchParams
}))

describe('PollsFilter', () => {
  it('renderiza o select de status', () => {
    render(<PollsFilter />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renderiza o label de status', () => {
    render(<PollsFilter />)
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
  })

  it('renderiza todas as opções de filtro', () => {
    render(<PollsFilter />)
    expect(screen.getByText('Todas')).toBeInTheDocument()
    expect(screen.getByText('Não Iniciadas')).toBeInTheDocument()
    expect(screen.getByText('Em Andamento')).toBeInTheDocument()
    expect(screen.getByText('Finalizadas')).toBeInTheDocument()
  })

  it('navega com o status na query string ao selecionar um filtro', async () => {
    render(<PollsFilter />)
    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, 'ongoing')
    expect(mockPush).toHaveBeenCalledWith('/polls?status=ongoing')
  })

  it('navega sem query string ao selecionar "Todas"', async () => {
    render(<PollsFilter />)
    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, '')
    expect(mockPush).toHaveBeenCalledWith('/polls?')
  })
})
