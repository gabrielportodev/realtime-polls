'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select } from '@/components/ui/select'

const STATUS_OPTIONS = [
  { value: '', label: 'Todas' },
  { value: 'not_started', label: 'Não Iniciadas' },
  { value: 'ongoing', label: 'Em Andamento' },
  { value: 'finished', label: 'Finalizadas' }
]

function PollsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status') ?? ''

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('status', value)
    } else {
      params.delete('status')
    }
    router.push(`/polls?${params.toString()}`)
  }

  return (
    <div className='w-full sm:w-48 shrink-0'>
      <Select label='Status' value={status} onChange={handleChange} options={STATUS_OPTIONS} />
    </div>
  )
}

export { PollsFilter }
