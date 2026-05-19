import { formatDate } from '@/lib/format-date'
import { describe, expect, it } from 'vitest'

describe('formatDate', () => {
  it('formata uma string de data corretamente', () => {
    expect(formatDate('2024-03-15T14:05:00')).toBe('15/03/2024 - 14:05 hrs')
  })

  it('formata um objeto Date corretamente', () => {
    const date = new Date(2024, 0, 7, 9, 3)
    expect(formatDate(date)).toBe('07/01/2024 - 09:03 hrs')
  })

  it('preenche dia, mês, hora e minuto com zero à esquerda', () => {
    expect(formatDate('2024-01-05T08:03:00')).toBe('05/01/2024 - 08:03 hrs')
  })

  it('formata data no final do ano corretamente', () => {
    expect(formatDate('2023-12-31T23:59:00')).toBe('31/12/2023 - 23:59 hrs')
  })
})
