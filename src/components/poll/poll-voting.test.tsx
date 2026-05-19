import { render, screen, waitFor } from '@testing-library/react'
import { PollVoting } from '@/components/poll/poll-voting'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Poll } from '@/types'

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
  vote: vi.fn().mockResolvedValue({})
}))

const ongoingPoll: Poll = {
  id: '1',
  title: 'Qual o melhor framework frontend?',
  start_at: '2022-05-21T19:30:00',
  end_at: '2099-12-31T23:59:00',
  created_at: '2022-05-20T10:00:00',
  poll_options: [
    { id: 'opt-1', poll_id: '1', text: 'React', votes: [{ id: 'v1', poll_option_id: 'opt-1', created_at: '' }] },
    { id: 'opt-2', poll_id: '1', text: 'Vue', votes: [] },
    { id: 'opt-3', poll_id: '1', text: 'Angular', votes: [] }
  ]
}

const finishedPoll: Poll = {
  ...ongoingPoll,
  start_at: '2022-01-01T00:00:00',
  end_at: '2022-06-01T00:00:00'
}

const notStartedPoll: Poll = {
  ...ongoingPoll,
  start_at: '2099-01-01T00:00:00',
  end_at: '2099-12-31T23:59:00'
}

describe('PollVoting', () => {
  it('renderiza o título da enquete', () => {
    render(<PollVoting initialPoll={ongoingPoll} />)
    expect(screen.getByText('Qual o melhor framework frontend?')).toBeInTheDocument()
  })

  it('renderiza as opções da enquete', () => {
    render(<PollVoting initialPoll={ongoingPoll} />)
    expect(screen.getByLabelText('React')).toBeInTheDocument()
    expect(screen.getByLabelText('Vue')).toBeInTheDocument()
    expect(screen.getByLabelText('Angular')).toBeInTheDocument()
  })

  it('renderiza os botões de votar e resultados', () => {
    render(<PollVoting initialPoll={ongoingPoll} />)
    expect(screen.getByRole('button', { name: /votar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /resultados/i })).toBeInTheDocument()
  })

  it('botão votar fica desabilitado sem opção selecionada', () => {
    render(<PollVoting initialPoll={ongoingPoll} />)
    expect(screen.getByRole('button', { name: /votar/i })).toBeDisabled()
  })

  it('botão votar fica habilitado ao selecionar uma opção', async () => {
    render(<PollVoting initialPoll={ongoingPoll} />)
    await userEvent.click(screen.getByLabelText('React'))
    expect(screen.getByRole('button', { name: /votar/i })).not.toBeDisabled()
  })

  it('exibe badge de status em enquete não iniciada', () => {
    render(<PollVoting initialPoll={notStartedPoll} />)
    expect(screen.getByText('Não Iniciada')).toBeInTheDocument()
  })

  it('exibe badge de status em enquete finalizada', () => {
    render(<PollVoting initialPoll={finishedPoll} />)
    expect(screen.getByText('Finalizada')).toBeInTheDocument()
  })

  it('desabilita as opções em enquete não ativa', () => {
    render(<PollVoting initialPoll={finishedPoll} />)
    const options = screen.getAllByRole('radio')
    options.forEach(opt => expect(opt).toBeDisabled())
  })

  it('exibe resultados ao clicar no botão resultados', async () => {
    render(<PollVoting initialPoll={ongoingPoll} />)
    await userEvent.click(screen.getByRole('button', { name: /resultados/i }))
    await waitFor(() => {
      expect(screen.getByText('1 votos')).toBeInTheDocument()
    })
  })

  it('permite voltar à tela de votação a partir dos resultados', async () => {
    render(<PollVoting initialPoll={ongoingPoll} />)
    await userEvent.click(screen.getByRole('button', { name: /resultados/i }))
    const voltarBtn = await screen.findByRole('button', { name: /voltar/i })
    await userEvent.click(voltarBtn)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /votar/i })).toBeInTheDocument()
    })
  })

  it('exibe resultados após votar com sucesso', async () => {
    render(<PollVoting initialPoll={ongoingPoll} />)
    await userEvent.click(screen.getByLabelText('Vue'))
    await userEvent.click(screen.getByRole('button', { name: /votar/i }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument()
    })
  })
})
