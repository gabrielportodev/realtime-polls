import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Skeleton } from '@/components/ui/skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: { className: 'h-6 w-48' }
}

export const Block: Story = {
  args: { className: 'h-32 w-64 rounded-2xl' }
}

export const Stacked: Story = {
  render: () => (
    <div className='flex flex-col gap-2 w-64'>
      <Skeleton className='h-5 w-3/4' />
      <Skeleton className='h-3 w-full' />
      <Skeleton className='h-3 w-5/6' />
    </div>
  )
}
