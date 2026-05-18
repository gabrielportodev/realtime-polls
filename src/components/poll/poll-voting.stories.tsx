import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PollVoting } from '@/components/poll/poll-voting'
import { Poll } from '@/types'

const basePoll: Poll = {
  id: '1',
  title: 'Qual o melhor framework frontend?',
  start_at: '2022-05-21T19:30:00',
  end_at: '2099-12-31T23:59:00',
  created_at: '2022-05-20T10:00:00',
  poll_options: [
    { id: 'opt-1', poll_id: '1', text: 'React', votes: [{ id: 'v1', poll_option_id: 'opt-1', created_at: '' }] },
    { id: 'opt-2', poll_id: '1', text: 'Vue', votes: [] },
    { id: 'opt-3', poll_id: '1', text: 'Angular', votes: [] }
  ]
}

const meta: Meta<typeof PollVoting> = {
  component: PollVoting,
  args: { initialPoll: basePoll }
}

export default meta
type Story = StoryObj<typeof PollVoting>

export const Default: Story = {}

export const NaoIniciada: Story = {
  args: {
    initialPoll: {
      ...basePoll,
      start_at: '2099-01-01T00:00:00',
      end_at: '2099-12-31T23:59:00'
    }
  }
}

export const Finalizada: Story = {
  args: {
    initialPoll: {
      ...basePoll,
      start_at: '2022-01-01T00:00:00',
      end_at: '2022-06-01T00:00:00'
    }
  }
}

export const SemVotos: Story = {
  args: {
    initialPoll: {
      ...basePoll,
      poll_options: basePoll.poll_options?.map(opt => ({ ...opt, votes: [] }))
    }
  }
}
