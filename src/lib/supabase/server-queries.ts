import { createClient } from '@/lib/supabase/server'
import { Poll, PollStatus } from '@/types'

const POLL_SELECT = `*, poll_options(*, votes(*))`

export async function getPolls(status?: PollStatus): Promise<{ polls: Poll[]; totalCount: number }> {
  const supabase = await createClient()
  const now = new Date().toISOString()

  let query = supabase.from('polls').select(POLL_SELECT).order('created_at', { ascending: false })

  if (status === 'not_started') query = query.gt('start_at', now)
  else if (status === 'finished') query = query.lt('end_at', now)
  else if (status === 'ongoing') query = query.lte('start_at', now).gte('end_at', now)

  const { data, error } = await query
  if (error) throw error
  const polls = data ?? []

  if (!status) return { polls, totalCount: polls.length }

  const { count, error: countError } = await supabase.from('polls').select('*', { count: 'exact', head: true })
  if (countError) throw countError

  return { polls, totalCount: count ?? 0 }
}

export async function getPollById(id: string): Promise<Poll | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from('polls').select(POLL_SELECT).eq('id', id).single()

  if (error) {
    if (error.code === 'PGRST116' || error.code === '22P02') return null
    throw error
  }

  return data
}
