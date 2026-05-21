import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { VoteBar } from '@/components/poll/vote-bar'

const meta: Meta<typeof VoteBar> = {
  title: 'Poll/VoteBar',
  component: VoteBar,
  args: {
    label: 'React',
    votes: 15,
    totalVotes: 31
  }
}

export default meta
type Story = StoryObj<typeof VoteBar>

export const Default: Story = {}

export const SemVotos: Story = {
  args: { votes: 0, totalVotes: 0 }
}

export const BarraCheia: Story = {
  args: { votes: 31, totalVotes: 31 }
}

export const Grupo: Story = {
  render: () => (
    <div className='flex flex-col gap-2 w-96'>
      <VoteBar label='React' votes={15} totalVotes={31} />
      <VoteBar label='Angular' votes={5} totalVotes={31} />
      <VoteBar label='Vue' votes={11} totalVotes={31} />
    </div>
  )
}
