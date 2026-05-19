import { PollCardSkeleton, PollsListSkeleton } from '@/components/poll/poll-card-skeleton'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof PollCardSkeleton> = {
  title: 'Poll/PollCardSkeleton',
  component: PollCardSkeleton
}

export default meta
type Story = StoryObj<typeof PollCardSkeleton>

export const Single: Story = {
  render: () => (
    <div className='w-80'>
      <PollCardSkeleton />
    </div>
  )
}

export const List: Story = {
  render: () => (
    <div className='max-w-3xl'>
      <PollsListSkeleton />
    </div>
  )
}

export const ListCustomCount: Story = {
  render: () => (
    <div className='max-w-3xl'>
      <PollsListSkeleton count={3} />
    </div>
  )
}
