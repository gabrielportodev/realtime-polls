const STORAGE_KEY = 'voted_polls'

export function hasVotedOnPoll(pollId: string): boolean {
  if (typeof window === 'undefined') return false

  const voted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]
  return voted.includes(pollId)
}

export function markPollAsVoted(pollId: string): void {
  if (typeof window === 'undefined') return

  const voted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]
  if (!voted.includes(pollId)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...voted, pollId]))
  }
}
