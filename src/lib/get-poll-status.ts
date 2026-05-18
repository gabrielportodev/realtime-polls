import { PollStatus } from '@/types'

export const getPollStatus = (startAt: string, endAt: string): PollStatus => {
  const now = new Date()
  const start = new Date(startAt)
  const end = new Date(endAt)

  if (now < start) return 'not_started'
  if (now > end) return 'finished'
  return 'ongoing'
}

export const POLL_STATUS_LABELS: Record<PollStatus, string> = {
  not_started: 'Não Iniciada',
  ongoing: 'Em Andamento',
  finished: 'Finalizada'
}

export const POLL_STATUS_COLORS: Record<PollStatus, string> = {
  not_started: 'text-neutral-dark bg-neutral/20',
  ongoing: 'text-green-700 bg-green-100',
  finished: 'text-red-600 bg-red-100'
}
