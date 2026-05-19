import { Skeleton } from '@/components/ui/skeleton'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

describe('Skeleton', () => {
  it('aplica a animação de pulse por padrão', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })

  it('é escondido de leitores de tela', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('aceita classes customizadas', () => {
    const { container } = render(<Skeleton className='h-10 w-20' />)
    expect(container.firstChild).toHaveClass('h-10', 'w-20')
  })
})
