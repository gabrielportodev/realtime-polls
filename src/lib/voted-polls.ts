const STORAGE_KEY = 'voted_polls'
const VOTED_OPTIONS_KEY = 'voted_poll_options'

export function hasVotedOnPoll(pollId: string): boolean {
  if (typeof window === 'undefined') return false

  const voted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]
  return voted.includes(pollId)
}

export function markPollAsVoted(pollId: string, optionId: string): void {
  if (typeof window === 'undefined') return

  const voted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]
  if (!voted.includes(pollId)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...voted, pollId]))
  }

  const options = JSON.parse(localStorage.getItem(VOTED_OPTIONS_KEY) ?? '{}') as Record<string, string>
  options[pollId] = optionId
  localStorage.setItem(VOTED_OPTIONS_KEY, JSON.stringify(options))
}

export function getVotedOptionId(pollId: string): string | null {
  if (typeof window === 'undefined') return null

  const options = JSON.parse(localStorage.getItem(VOTED_OPTIONS_KEY) ?? '{}') as Record<string, string>
  return options[pollId] ?? null
}
