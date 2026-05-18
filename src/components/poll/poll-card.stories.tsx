import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PollCard } from '@/components/poll/poll-card'

const meta: Meta<typeof PollCard> = {
  component: PollCard,
  args: {
    title: 'Qual o melhor framework frontend?',
    startAt: '2022-05-21T19:30:00',
    endAt: '2022-05-22T19:30:00'
  }
}

export default meta
type Story = StoryObj<typeof PollCard>

export const Default: Story = {}

export const Clickable: Story = {
  args: { onClick: () => {} }
}

export const Grid: Story = {
  render: () => (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl p-4 bg-background'>
      <PollCard
        title='Qual o melhor framework frontend?'
        startAt='2022-05-21T19:30:00'
        endAt='2022-05-22T19:30:00'
        onClick={() => {}}
      />
      <PollCard
        title='Qual a melhor linguagem do momento?'
        startAt='2022-05-21T19:30:00'
        endAt='2022-05-22T19:30:00'
        onClick={() => {}}
      />
      <PollCard
        title='Qual o melhor framework frontend?'
        startAt='2022-05-21T19:30:00'
        endAt='2022-05-22T19:30:00'
        onClick={() => {}}
      />
      <PollCard
        title='Qual a melhor linguagem do momento?'
        startAt='2022-05-21T19:30:00'
        endAt='2022-05-22T19:30:00'
        onClick={() => {}}
      />
    </div>
  )
}
