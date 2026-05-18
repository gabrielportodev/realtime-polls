import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from '@/components/ui/input'

const meta: Meta<typeof Input> = {
  component: Input,
  args: {
    placeholder: 'Digite algo...'
  }
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true }
}
