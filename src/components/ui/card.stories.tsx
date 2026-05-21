import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Título do card</CardTitle>
      </CardHeader>
      <CardContent>Conteúdo do card.</CardContent>
    </Card>
  )
}

export const Small: Story = {
  render: () => (
    <Card size='sm'>
      <CardHeader>
        <CardTitle>Card compacto</CardTitle>
      </CardHeader>
      <CardContent>Variante menor para espaços reduzidos.</CardContent>
    </Card>
  )
}

export const WithDescription: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Qual o melhor framework frontend?</CardTitle>
        <CardDescription>Enquete em andamento · 3 opções</CardDescription>
      </CardHeader>
      <CardContent>Conteúdo do card.</CardContent>
    </Card>
  )
}

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Título do card</CardTitle>
      </CardHeader>
      <CardContent>Conteúdo principal.</CardContent>
      <CardFooter>Rodapé com ações ou metadados.</CardFooter>
    </Card>
  )
}
