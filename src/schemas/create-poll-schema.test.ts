import { createPollSchema } from '@/schemas/create-poll-schema'
import { describe, expect, it } from 'vitest'

const validData = {
  title: 'Melhor linguagem?',
  start_at: '2024-01-01T10:00:00',
  end_at: '2024-12-31T23:59:00',
  options: [{ text: 'TypeScript' }, { text: 'Go' }, { text: 'Rust' }]
}

describe('createPollSchema', () => {
  it('valida dados corretos com sucesso', () => {
    expect(createPollSchema.safeParse(validData).success).toBe(true)
  })

  it('rejeita título vazio', () => {
    const result = createPollSchema.safeParse({ ...validData, title: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title).toBeDefined()
    }
  })

  it('rejeita start_at vazio', () => {
    const result = createPollSchema.safeParse({ ...validData, start_at: '' })
    expect(result.success).toBe(false)
  })

  it('rejeita end_at vazio', () => {
    const result = createPollSchema.safeParse({ ...validData, end_at: '' })
    expect(result.success).toBe(false)
  })

  it('rejeita menos de 3 opções', () => {
    const result = createPollSchema.safeParse({ ...validData, options: [{ text: 'A' }, { text: 'B' }] })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.options).toBeDefined()
    }
  })

  it('rejeita opção com texto vazio', () => {
    const result = createPollSchema.safeParse({
      ...validData,
      options: [{ text: '' }, { text: 'B' }, { text: 'C' }]
    })
    expect(result.success).toBe(false)
  })

  it('rejeita end_at anterior ao start_at', () => {
    const result = createPollSchema.safeParse({
      ...validData,
      start_at: '2024-12-31T00:00:00',
      end_at: '2024-01-01T00:00:00'
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const formErrors = result.error.flatten().fieldErrors
      expect(formErrors.end_at).toBeDefined()
    }
  })
})
