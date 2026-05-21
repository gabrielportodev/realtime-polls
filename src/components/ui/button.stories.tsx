import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type StoryArgs = React.ComponentProps<typeof Button> & { showIcon: boolean }

const meta: Meta<StoryArgs> = {
  title: 'UI/Button',
  component: Button,
  args: {
    children: 'Botão',
    showIcon: false
  },
  argTypes: {
    icon: { table: { disable: true } },
    showIcon: { control: 'boolean', name: 'Icon' }
  },
  render: ({ showIcon, ...args }) => <Button {...args} icon={showIcon ? <PlusCircle size={16} /> : undefined} />
}

export default meta
type Story = StoryObj<StoryArgs>

export const Primary: Story = {
  args: { variant: 'primary' }
}

export const Full: Story = {
  args: { variant: 'full', children: 'Criar pesquisa' }
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Adicionar opção' }
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Resultados' }
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Voltar' }
}

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true }
}
