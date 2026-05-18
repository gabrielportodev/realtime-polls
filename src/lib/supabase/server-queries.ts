import { getPollStatus } from '@/lib/get-poll-status'
import { createClient } from '@/lib/supabase/server'
import { Poll, PollStatus } from '@/types'

const POLL_SELECT = `*, poll_options(*, votes(*))`

export async function getPolls(status?: PollStatus): Promise<Poll[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from('polls').select(POLL_SELECT).order('created_at', { ascending: false })

  if (error) throw error
  if (!data) return []

  if (!status) return data
  return data.filter(poll => getPollStatus(poll.start_at, poll.end_at) === status)
}

export async function getPollById(id: string): Promise<Poll | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from('polls').select(POLL_SELECT).eq('id', id).single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return data
}
