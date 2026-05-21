import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DateInput } from '@/components/ui/date-input'

const meta: Meta<typeof DateInput> = {
  title: 'UI/DateInput',
  component: DateInput
}

export default meta
type Story = StoryObj<typeof DateInput>

export const Default: Story = {}

export const WithLabel: Story = {
  args: { label: 'Data de início' }
}

export const WithError: Story = {
  args: {
    label: 'Data de início',
    error: 'Data obrigatória'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Data de início',
    disabled: true
  }
}
