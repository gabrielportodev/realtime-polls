import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('renderiza o placeholder corretamente', () => {
    render(<Input placeholder='Digite aqui' />)
    expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument()
  })

  it('renderiza o label quando passado', () => {
    render(<Input label='Titulo' />)
    expect(screen.getByLabelText('Titulo')).toBeInTheDocument()
  })

  it('exibe mensagem de erro quando passada', () => {
    render(<Input label='Titulo' error='Campo obrigatório' />)
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  })

  it('fica desabilitado quando a prop disabled é passada', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('aceita digitação do usuário', async () => {
    render(<Input placeholder='Digite' />)
    const input = screen.getByPlaceholderText('Digite')
    await userEvent.type(input, 'React')
    expect(input).toHaveValue('React')
  })
})
