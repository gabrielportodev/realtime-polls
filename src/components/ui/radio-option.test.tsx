import { RadioOption } from '@/components/ui/radio-option'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

describe('RadioOption', () => {
  it('renderiza o label corretamente', () => {
    render(<RadioOption label='React' name='framework' />)
    expect(screen.getByLabelText('React')).toBeInTheDocument()
  })

  it('renderiza marcado quando defaultChecked é passado', () => {
    render(<RadioOption label='React' name='framework' defaultChecked />)
    expect(screen.getByLabelText('React')).toBeChecked()
  })

  it('fica desabilitado quando disabled é passado', () => {
    render(<RadioOption label='React' name='framework' disabled />)
    expect(screen.getByLabelText('React')).toBeDisabled()
  })

  it('seleciona ao clicar', async () => {
    render(<RadioOption label='React' name='framework' />)
    const radio = screen.getByLabelText('React')
    await userEvent.click(radio)
    expect(radio).toBeChecked()
  })

  it('exibe mensagem de erro quando passada', () => {
    render(<RadioOption label='React' name='framework' error='Selecione uma opção' />)
    expect(screen.getByText('Selecione uma opção')).toBeInTheDocument()
  })

  it('apenas um do grupo pode ser selecionado por vez', async () => {
    render(
      <div>
        <RadioOption label='React' name='framework' />
        <RadioOption label='Vue' name='framework' />
      </div>
    )
    const react = screen.getByLabelText('React')
    const vue = screen.getByLabelText('Vue')

    await userEvent.click(react)
    expect(react).toBeChecked()
    expect(vue).not.toBeChecked()

    await userEvent.click(vue)
    expect(vue).toBeChecked()
    expect(react).not.toBeChecked()
  })
})
