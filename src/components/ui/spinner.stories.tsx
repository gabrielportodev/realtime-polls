import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Spinner } from '@/components/ui/spinner'

const meta: Meta<typeof Spinner> = {
  title: 'UI/Spinner',
  component: Spinner,
  args: {
    size: 'md'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Small: Story = {
  args: { size: 'sm' }
}

export const Medium: Story = {
  args: { size: 'md' }
}

export const Large: Story = {
  args: { size: 'lg' }
}

export const InButton: Story = {
  render: () => (
    <button
      disabled
      className='inline-flex items-center gap-2 h-10 px-5 rounded-xs bg-primary text-white text-sm font-semibold opacity-80 cursor-not-allowed'
    >
      <Spinner size='sm' className='border-white/30 border-t-white' />
      Criando...
    </button>
  )
}
