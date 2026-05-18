import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('Card', () => {
  it('renderiza o conteúdo corretamente', () => {
    render(
      <Card>
        <CardTitle>Título</CardTitle>
        <CardContent>Corpo do card</CardContent>
      </Card>
    )
    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(screen.getByText('Corpo do card')).toBeInTheDocument()
  })

  it('aplica className customizado', () => {
    const { container } = render(<Card className='custom-class' />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('aplica data-size sm quando prop size=sm é passada', () => {
    const { container } = render(<Card size='sm' />)
    expect(container.firstChild).toHaveAttribute('data-size', 'sm')
  })

  it('aplica data-size default por padrão', () => {
    const { container } = render(<Card />)
    expect(container.firstChild).toHaveAttribute('data-size', 'default')
  })
})

describe('CardHeader', () => {
  it('renderiza o conteúdo corretamente', () => {
    render(<CardHeader>Cabeçalho</CardHeader>)
    expect(screen.getByText('Cabeçalho')).toBeInTheDocument()
  })

  it('aplica className customizado', () => {
    const { container } = render(<CardHeader className='custom-header' />)
    expect(container.firstChild).toHaveClass('custom-header')
  })
})

describe('CardTitle', () => {
  it('renderiza o título corretamente', () => {
    render(<CardTitle>Meu Título</CardTitle>)
    expect(screen.getByText('Meu Título')).toBeInTheDocument()
  })

  it('aplica className customizado', () => {
    const { container } = render(<CardTitle className='custom-title' />)
    expect(container.firstChild).toHaveClass('custom-title')
  })
})

describe('CardDescription', () => {
  it('renderiza a descrição corretamente', () => {
    render(<CardDescription>Descrição do card</CardDescription>)
    expect(screen.getByText('Descrição do card')).toBeInTheDocument()
  })

  it('aplica className customizado', () => {
    const { container } = render(<CardDescription className='custom-desc' />)
    expect(container.firstChild).toHaveClass('custom-desc')
  })
})

describe('CardAction', () => {
  it('renderiza a ação corretamente', () => {
    render(<CardAction>Ação</CardAction>)
    expect(screen.getByText('Ação')).toBeInTheDocument()
  })

  it('aplica className customizado', () => {
    const { container } = render(<CardAction className='custom-action' />)
    expect(container.firstChild).toHaveClass('custom-action')
  })
})

describe('CardContent', () => {
  it('renderiza o conteúdo corretamente', () => {
    render(<CardContent>Conteúdo</CardContent>)
    expect(screen.getByText('Conteúdo')).toBeInTheDocument()
  })

  it('aplica className customizado', () => {
    const { container } = render(<CardContent className='custom-content' />)
    expect(container.firstChild).toHaveClass('custom-content')
  })
})

describe('CardFooter', () => {
  it('renderiza o rodapé corretamente', () => {
    render(<CardFooter>Rodapé</CardFooter>)
    expect(screen.getByText('Rodapé')).toBeInTheDocument()
  })

  it('aplica className customizado', () => {
    const { container } = render(<CardFooter className='custom-footer' />)
    expect(container.firstChild).toHaveClass('custom-footer')
  })
})

describe('Card composição completa', () => {
  it('renderiza todos os sub-componentes juntos', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
          <CardDescription>Descrição</CardDescription>
          <CardAction>Botão</CardAction>
        </CardHeader>
        <CardContent>Conteúdo principal</CardContent>
        <CardFooter>Rodapé</CardFooter>
      </Card>
    )
    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(screen.getByText('Descrição')).toBeInTheDocument()
    expect(screen.getByText('Botão')).toBeInTheDocument()
    expect(screen.getByText('Conteúdo principal')).toBeInTheDocument()
    expect(screen.getByText('Rodapé')).toBeInTheDocument()
  })
})
