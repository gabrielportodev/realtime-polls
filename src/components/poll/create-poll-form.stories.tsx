import { CreatePollForm } from '@/components/poll/create-poll-form'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof CreatePollForm> = {
  component: CreatePollForm,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/polls/new' }
    }
  }
}

export default meta
type Story = StoryObj<typeof CreatePollForm>

export const Default: Story = {}
