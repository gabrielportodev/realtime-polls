import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Select } from '@/components/ui/select'

const statusOptions = [
  { value: 'not_started', label: 'Não iniciado' },
  { value: 'ongoing', label: 'Em andamento' },
  { value: 'finished', label: 'Finalizado' }
]

const meta: Meta<typeof Select> = {
  component: Select,
  args: {
    options: statusOptions
  }
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {}

export const WithLabel: Story = {
  args: { label: 'Status' }
}

export const WithError: Story = {
  args: {
    label: 'Status',
    error: 'Selecione um status'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Status',
    disabled: true
  }
}
