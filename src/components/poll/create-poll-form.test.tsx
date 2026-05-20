import { CreatePollForm } from '@/components/poll/create-poll-form'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush })
}))

vi.mock('@/lib/supabase/queries', () => ({
  createPoll: vi.fn().mockResolvedValue({})
}))

describe('CreatePollForm', () => {
  it('renderiza o campo de título', () => {
    render(<CreatePollForm />)
    expect(screen.getByPlaceholderText('Ex: Qual a sua linguagem favorita?')).toBeInTheDocument()
  })

  it('renderiza 3 opções de resposta por padrão', () => {
    render(<CreatePollForm />)
    expect(screen.getByPlaceholderText('Opção 1')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Opção 2')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Opção 3')).toBeInTheDocument()
  })

  it('renderiza os campos de data de início e término', () => {
    render(<CreatePollForm />)
    expect(screen.getByLabelText('Data de início')).toBeInTheDocument()
    expect(screen.getByLabelText('Data de término')).toBeInTheDocument()
  })

  it('renderiza o botão de criar enquete', () => {
    render(<CreatePollForm />)
    expect(screen.getByRole('button', { name: /criar enquete/i })).toBeInTheDocument()
  })

  it('renderiza o botão de adicionar opção', () => {
    render(<CreatePollForm />)
    expect(screen.getByRole('button', { name: /adicionar opção/i })).toBeInTheDocument()
  })

  it('adiciona uma nova opção ao clicar em adicionar opção', async () => {
    render(<CreatePollForm />)
    await userEvent.click(screen.getByRole('button', { name: /adicionar opção/i }))
    expect(screen.getByPlaceholderText('Opção 4')).toBeInTheDocument()
  })

  it('não mostra botão de remover com 3 opções', () => {
    render(<CreatePollForm />)
    expect(screen.queryByRole('button', { name: '' })).not.toBeInTheDocument()
  })

  it('mostra botão de remover ao ter mais de 3 opções', async () => {
    render(<CreatePollForm />)
    await userEvent.click(screen.getByRole('button', { name: /adicionar opção/i }))
    const trashButtons = screen.getAllByRole('button', { name: /remover opção/i })
    expect(trashButtons.length).toBeGreaterThan(0)
  })

  it('remove uma opção ao clicar no botão de remoção', async () => {
    render(<CreatePollForm />)
    await userEvent.click(screen.getByRole('button', { name: /adicionar opção/i }))
    expect(screen.getByPlaceholderText('Opção 4')).toBeInTheDocument()
    const trashButtons = screen.getAllByRole('button', { name: /remover opção/i })
    await userEvent.click(trashButtons[trashButtons.length - 1])
    expect(screen.queryByPlaceholderText('Opção 4')).not.toBeInTheDocument()
  })

  it('exibe erros de validação ao submeter formulário vazio', async () => {
    render(<CreatePollForm />)
    await userEvent.click(screen.getByRole('button', { name: /criar enquete/i }))
    await waitFor(() => {
      expect(screen.getByText('Título é obrigatório')).toBeInTheDocument()
    })
  })

  it('submete o formulário e redireciona para /polls', async () => {
    const { createPoll } = await import('@/lib/supabase/queries')
    render(<CreatePollForm />)

    await userEvent.type(screen.getByPlaceholderText('Ex: Qual a sua linguagem favorita?'), 'Melhor linguagem?')
    await userEvent.type(screen.getByPlaceholderText('Opção 1'), 'TypeScript')
    await userEvent.type(screen.getByPlaceholderText('Opção 2'), 'Python')
    await userEvent.type(screen.getByPlaceholderText('Opção 3'), 'Go')
    await userEvent.type(screen.getByLabelText('Data de início'), '2025-06-01T10:00')
    await userEvent.type(screen.getByLabelText('Data de término'), '2025-06-30T10:00')

    await userEvent.click(screen.getByRole('button', { name: /criar enquete/i }))

    await waitFor(() => {
      expect(createPoll).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalledWith('/polls')
    })
  })
})
