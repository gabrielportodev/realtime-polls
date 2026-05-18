import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: 'Botão'
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Outline: Story = {
  args: { variant: 'outline' }
}

export const Destructive: Story = {
  args: { variant: 'destructive' }
}

export const Disabled: Story = {
  args: { disabled: true }
}
