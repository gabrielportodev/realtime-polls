import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PollsFilter } from '@/components/poll/polls-filter'

const meta: Meta<typeof PollsFilter> = {
  title: 'Poll/PollsFilter',
  component: PollsFilter,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/polls' }
    }
  }
}

export default meta
type Story = StoryObj<typeof PollsFilter>

export const Default: Story = {}

export const FiltroNaoIniciadas: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/polls',
        query: { status: 'not_started' }
      }
    }
  }
}

export const FiltroEmAndamento: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/polls',
        query: { status: 'ongoing' }
      }
    }
  }
}

export const FiltroFinalizadas: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/polls',
        query: { status: 'finished' }
      }
    }
  }
}
