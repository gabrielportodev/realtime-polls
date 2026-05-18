import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Spinner } from '@/components/ui/spinner'

describe('Spinner', () => {
  it('renderiza com role status e aria-label', () => {
    render(<Spinner />)
    expect(screen.getByRole('status', { name: 'Carregando' })).toBeInTheDocument()
  })

  it('aplica a classe de tamanho sm', () => {
    render(<Spinner size='sm' />)
    expect(screen.getByRole('status').className).toContain('size-4')
  })

  it('aplica a classe de tamanho md por padrão', () => {
    render(<Spinner />)
    expect(screen.getByRole('status').className).toContain('size-6')
  })

  it('aplica a classe de tamanho lg', () => {
    render(<Spinner size='lg' />)
    expect(screen.getByRole('status').className).toContain('size-10')
  })

  it('aceita className customizado', () => {
    render(<Spinner className='border-t-white' />)
    expect(screen.getByRole('status').className).toContain('border-t-white')
  })

  it('sempre possui a classe animate-spin', () => {
    render(<Spinner />)
    expect(screen.getByRole('status').className).toContain('animate-spin')
  })
})
