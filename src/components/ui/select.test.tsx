import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from '@/components/ui/select'
import { describe, expect, it } from 'vitest'

const options = [
  { value: 'not_started', label: 'Não iniciado' },
  { value: 'ongoing', label: 'Em andamento' },
  { value: 'finished', label: 'Finalizado' }
]

describe('Select', () => {
  it('renderiza as opções corretamente', () => {
    render(<Select options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('Não iniciado')).toBeInTheDocument()
    expect(screen.getByText('Em andamento')).toBeInTheDocument()
    expect(screen.getByText('Finalizado')).toBeInTheDocument()
  })

  it('renderiza o label quando passado', () => {
    render(<Select label='Status' options={options} />)
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
  })

  it('exibe mensagem de erro quando passada', () => {
    render(<Select label='Status' options={options} error='Selecione um status' />)
    expect(screen.getByText('Selecione um status')).toBeInTheDocument()
  })

  it('fica desabilitado quando a prop disabled é passada', () => {
    render(<Select options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('muda o valor selecionado', async () => {
    render(<Select options={options} />)
    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, 'ongoing')
    expect(select).toHaveValue('ongoing')
  })
})
