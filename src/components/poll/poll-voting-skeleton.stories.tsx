import { PollVotingSkeleton } from '@/components/poll/poll-voting-skeleton'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof PollVotingSkeleton> = {
  title: 'Poll/PollVotingSkeleton',
  component: PollVotingSkeleton,
  argTypes: {
    optionsCount: { control: { type: 'number', min: 1, max: 10 } },
    variant: { control: 'radio', options: ['voting', 'results'] }
  }
}

export default meta
type Story = StoryObj<typeof PollVotingSkeleton>

export const Voting: Story = {
  args: { variant: 'voting', optionsCount: 4 }
}

export const Results: Story = {
  args: { variant: 'results', optionsCount: 4 }
}

export const FewOptions: Story = {
  args: { variant: 'voting', optionsCount: 2 }
}
