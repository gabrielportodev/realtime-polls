import { fireEvent, render, screen } from '@testing-library/react'
import { DateInput } from '@/components/ui/date-input'
import { describe, expect, it, vi } from 'vitest'

describe('DateInput', () => {
  it('renderiza o input de data', () => {
    render(<DateInput />)
    expect(document.querySelector('input[type="datetime-local"]')).toBeInTheDocument()
  })

  it('renderiza o label quando passado', () => {
    render(<DateInput label='Data de início' />)
    expect(screen.getByLabelText('Data de início')).toBeInTheDocument()
  })

  it('exibe mensagem de erro quando passada', () => {
    render(<DateInput label='Data de início' error='Data obrigatória' />)
    expect(screen.getByText('Data obrigatória')).toBeInTheDocument()
  })

  it('fica desabilitado quando a prop disabled é passada', () => {
    render(<DateInput disabled />)
    expect(document.querySelector('input[type="datetime-local"]')).toBeDisabled()
  })

  it('renderiza o ícone de calendário', () => {
    render(<DateInput />)
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  it('aceita mudança de valor', () => {
    render(<DateInput />)
    const input = document.querySelector('input[type="datetime-local"]') as HTMLInputElement
    fireEvent.change(input, { target: { value: '2024-05-21T19:30' } })
    expect(input.value).toBe('2024-05-21T19:30')
  })

  it('chama onChange quando o valor muda', () => {
    const handleChange = vi.fn()
    render(<DateInput onChange={handleChange} />)
    const input = document.querySelector('input[type="datetime-local"]') as HTMLInputElement
    fireEvent.change(input, { target: { value: '2024-05-21T19:30' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('aplica border vermelha quando há erro', () => {
    render(<DateInput error='Data inválida' />)
    const input = document.querySelector('input[type="datetime-local"]')
    expect(input?.className).toContain('border-red-500')
  })
})
