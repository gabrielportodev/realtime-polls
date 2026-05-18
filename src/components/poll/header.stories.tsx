import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Header } from '@/components/poll/header'

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/polls' }
    }
  }
}

export default meta
type Story = StoryObj<typeof Header>

export const PollsActive: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/polls' }
    }
  }
}

export const CreatePollActive: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/polls/new' }
    }
  }
}
