import { CreatePollForm } from '@/components/poll/create-poll-form'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'

const meta: Meta<typeof CreatePollForm> = {
  title: 'Poll/CreatePollForm',
  component: CreatePollForm,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/polls/new' }
    }
  }
}

export default meta
type Story = StoryObj<typeof CreatePollForm>

export const Default: Story = {}

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /criar enquete/i }))
    await expect(canvas.getByText('Título é obrigatório')).toBeInTheDocument()
  }
}

export const PreFilled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText('Digite aqui a sua pergunta'), 'Qual a melhor linguagem de programação?')
    await userEvent.type(canvas.getByPlaceholderText('Opção 1'), 'TypeScript')
    await userEvent.type(canvas.getByPlaceholderText('Opção 2'), 'Python')
    await userEvent.type(canvas.getByPlaceholderText('Opção 3'), 'Go')
  }
}

export const WithFourOptions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /adicionar opção/i }))
    await expect(canvas.getByPlaceholderText('Opção 4')).toBeInTheDocument()
  }
}
