import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RadioOption } from '@/components/ui/radio-option'

const meta: Meta<typeof RadioOption> = {
  component: RadioOption,
  args: {
    label: 'React',
    name: 'framework'
  }
}

export default meta
type Story = StoryObj<typeof RadioOption>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true }
}

export const Disabled: Story = {
  args: { disabled: true }
}

export const CheckedAndDisabled: Story = {
  args: { defaultChecked: true, disabled: true }
}

export const Group: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <RadioOption name='framework' label='React' defaultChecked />
      <RadioOption name='framework' label='Vue' />
      <RadioOption name='framework' label='Angular' />
    </div>
  )
}
