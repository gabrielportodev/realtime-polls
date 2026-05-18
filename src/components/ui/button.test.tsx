import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

describe('Button', () => {
  it('renderiza o texto corretamente', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.getByRole('button', { name: 'Clique aqui' })).toBeInTheDocument()
  })

  it('fica desabilitado quando a prop disabled é passada', () => {
    render(<Button disabled>Enviar</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renderiza a variante full com largura total', () => {
    render(<Button variant='full'>Criar pesquisa</Button>)
    const btn = screen.getByRole('button', { name: 'Criar pesquisa' })
    expect(btn.className).toContain('w-full')
  })

  it('renderiza ícone quando a prop icon é passada', () => {
    render(<Button icon={<PlusCircle data-testid='icon' size={16} />}>Adicionar opção</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it.each(['primary', 'full', 'outline', 'secondary', 'ghost'] as const)('renderiza a variante %s', variant => {
    render(<Button variant={variant}>Texto</Button>)
    expect(screen.getByRole('button', { name: 'Texto' })).toBeInTheDocument()
  })

  it('chama onClick ao ser clicado', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clique aqui</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('não chama onClick quando desabilitado', async () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Enviar
      </Button>
    )
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
