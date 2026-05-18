import { render, screen } from '@testing-library/react'
import { VoteBar } from '@/components/poll/vote-bar'
import { describe, expect, it } from 'vitest'

describe('VoteBar', () => {
  it('renderiza o label corretamente', () => {
    render(<VoteBar label='React' votes={15} totalVotes={31} />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renderiza a contagem de votos', () => {
    render(<VoteBar label='React' votes={15} totalVotes={31} />)
    expect(screen.getByText('15 votos')).toBeInTheDocument()
  })

  it('renderiza 0 votos quando não há votos', () => {
    render(<VoteBar label='React' votes={0} totalVotes={0} />)
    expect(screen.getByText('0 votos')).toBeInTheDocument()
  })

  it('aplica opacidade quando desabilitado', () => {
    const { container } = render(<VoteBar label='React' votes={15} totalVotes={31} disabled />)
    expect(container.firstChild).toHaveClass('opacity-50')
  })

  it('calcula a largura da barra corretamente', () => {
    const { container } = render(<VoteBar label='React' votes={15} totalVotes={30} />)
    const bar = container.querySelector('.bg-primary') as HTMLElement
    expect(bar.style.width).toBe('50%')
  })

  it('arredonda a porcentagem corretamente (15/31 = 48%)', () => {
    const { container } = render(<VoteBar label='React' votes={15} totalVotes={31} />)
    const bar = container.querySelector('.bg-primary') as HTMLElement
    expect(bar.style.width).toBe('48%')
  })
})
