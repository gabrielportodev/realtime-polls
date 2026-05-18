import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Header } from '@/components/poll/header'

const mockPathname = vi.fn(() => '/polls')

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname()
}))

describe('Header', () => {
  it('renderiza o svg do MyPoll', () => {
    render(<Header />)
    expect(screen.getByAltText('My Poll')).toBeInTheDocument()
  })

  it('renderiza os links de navegação', () => {
    render(<Header />)
    expect(screen.getByText('Criar enquete')).toBeInTheDocument()
    expect(screen.getByText('Enquetes')).toBeInTheDocument()
  })

  it('aplica estilo ativo no link da rota atual', () => {
    render(<Header />)
    const enquetesLink = screen.getByText('Enquetes')
    expect(enquetesLink).toHaveClass('border-b-2')
    expect(enquetesLink).toHaveClass('text-primary')
  })

  it('aplica estilo inativo no link fora da rota atual', () => {
    render(<Header />)
    const criarLink = screen.getByText('Criar enquete')
    expect(criarLink).not.toHaveClass('border-b-2')
    expect(criarLink).toHaveClass('text-neutral-dark')
  })

  it('aplica estilo ativo em "Criar enquete" quando pathname é /polls/new', () => {
    mockPathname.mockReturnValueOnce('/polls/new')
    render(<Header />)
    const criarLink = screen.getByText('Criar enquete')
    expect(criarLink).toHaveClass('border-b-2')
    expect(criarLink).toHaveClass('text-primary')
    const enquetesLink = screen.getByText('Enquetes')
    expect(enquetesLink).not.toHaveClass('border-b-2')
  })
})
