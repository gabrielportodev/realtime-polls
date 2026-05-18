import { CreatePollForm } from '@/components/poll/create-poll-form'
import { Card, CardContent } from '@/components/ui/card'

export default function NewPollPage() {
  return (
    <main className='max-w-7xl mx-auto w-full px-6 py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-2xl font-bold text-text-dark'>Criar enquete</h1>
        <p className='text-sm text-neutral-dark'>Preecha os seguintes campos para criar a sua enquete</p>
      </div>
      <Card>
        <CardContent>
          <CreatePollForm />
        </CardContent>
      </Card>
    </main>
  )
}
