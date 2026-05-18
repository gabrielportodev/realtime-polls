import { createClient } from '@/lib/supabase/client'

export async function createPoll(input: {
  title: string
  start_at: string
  end_at: string
  options: string[]
}): Promise<{ id: string }> {
  const supabase = createClient()

  const { data: poll, error: pollError } = await supabase
    .from('polls')
    .insert({ title: input.title, start_at: input.start_at, end_at: input.end_at })
    .select()
    .single()

  if (pollError) throw pollError

  const { error: optionsError } = await supabase
    .from('poll_options')
    .insert(input.options.map(text => ({ poll_id: poll.id, text })))

  if (optionsError) throw optionsError

  return poll
}

export async function vote(pollOptionId: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase.from('votes').insert({ poll_option_id: pollOptionId })

  if (error) throw error
}
