import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof Card> = {
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
