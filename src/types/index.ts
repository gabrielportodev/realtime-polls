export type PollStatus = 'not_started' | 'ongoing' | 'finished'

export type PollOption = {
  id: string
  poll_id: string
  text: string
  votes?: Vote[]
}

export type Poll = {
  id: string
  title: string
  start_at: string
  end_at: string
  created_at: string
  poll_options?: PollOption[]
}

export type Vote = {
  id: string
  poll_option_id: string
  created_at: string
}
