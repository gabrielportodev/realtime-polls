import { render, screen } from '@testing-library/react'
import { PollCard } from '@/components/poll/poll-card'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

const defaultProps = {
  title: 'Qual o melhor framework frontend?',
  startAt: '2022-05-21T19:30:00',
  endAt: '2022-05-22T19:30:00'
}

describe('PollCard', () => {
  it('renderiza o título corretamente', () => {
    render(<PollCard {...defaultProps} />)
    expect(screen.getByText('Qual o melhor framework frontend?')).toBeInTheDocument()
  })

  it('renderiza a data de início formatada', () => {
    render(<PollCard {...defaultProps} />)
    expect(screen.getByText(/Inicio: 21\/05\/2022 - 19:30 hrs/)).toBeInTheDocument()
  })

  it('renderiza a data de término formatada', () => {
    render(<PollCard {...defaultProps} />)
    expect(screen.getByText(/Término: 22\/05\/2022 - 19:30 hrs/)).toBeInTheDocument()
  })

  it('chama onClick ao clicar no card', async () => {
    const handleClick = vi.fn()
    render(<PollCard {...defaultProps} onClick={handleClick} />)
    await userEvent.click(screen.getByText('Qual o melhor framework frontend?'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('não aplica cursor-pointer sem onClick', () => {
    const { container } = render(<PollCard {...defaultProps} />)
    expect(container.firstChild).not.toHaveClass('cursor-pointer')
  })
})
