import { getPollStatus, POLL_STATUS_LABELS, POLL_STATUS_COLORS } from '@/lib/get-poll-status'
import { describe, expect, it } from 'vitest'

describe('getPollStatus', () => {
  it('retorna "not_started" quando a enquete ainda não começou', () => {
    expect(getPollStatus('2099-01-01T00:00:00', '2099-12-31T23:59:00')).toBe('not_started')
  })

  it('retorna "finished" quando a enquete já terminou', () => {
    expect(getPollStatus('2020-01-01T00:00:00', '2020-12-31T23:59:00')).toBe('finished')
  })

  it('retorna "ongoing" quando a enquete está em andamento', () => {
    const past = new Date(Date.now() - 1000 * 60 * 60).toISOString()
    const future = new Date(Date.now() + 1000 * 60 * 60).toISOString()
    expect(getPollStatus(past, future)).toBe('ongoing')
  })
})

describe('POLL_STATUS_LABELS', () => {
  it('contém label para cada status', () => {
    expect(POLL_STATUS_LABELS.not_started).toBe('Não Iniciada')
    expect(POLL_STATUS_LABELS.ongoing).toBe('Em Andamento')
    expect(POLL_STATUS_LABELS.finished).toBe('Finalizada')
  })
})

describe('POLL_STATUS_COLORS', () => {
  it('contém classes de cor para cada status', () => {
    expect(POLL_STATUS_COLORS.not_started).toBeTruthy()
    expect(POLL_STATUS_COLORS.ongoing).toBeTruthy()
    expect(POLL_STATUS_COLORS.finished).toBeTruthy()
  })
})
