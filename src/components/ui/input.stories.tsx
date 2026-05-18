import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from '@/components/ui/input'

const meta: Meta<typeof Input> = {
  component: Input,
  args: {
    placeholder: 'Digite aqui a sua pergunta'
  }
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const WithLabel: Story = {
  args: { label: 'Titulo' }
}

export const WithError: Story = {
  args: {
    label: 'Titulo',
    error: 'Campo obrigatório'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Titulo',
    disabled: true
  }
}
