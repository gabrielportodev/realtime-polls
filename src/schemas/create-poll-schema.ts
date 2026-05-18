import { z } from 'zod'

export const createPollSchema = z
  .object({
    title: z.string().min(1, 'Título é obrigatório'),
    start_at: z.string().min(1, 'Data de início é obrigatória'),
    end_at: z.string().min(1, 'Data de término é obrigatória'),
    options: z
      .array(z.object({ text: z.string().min(1, 'Opção não pode ser vazia') }))
      .min(3, 'Mínimo 3 opções necessárias')
  })
  .refine(data => !data.start_at || !data.end_at || new Date(data.end_at) > new Date(data.start_at), {
    message: 'Data de término deve ser após a data de início',
    path: ['end_at']
  })

export type CreatePollSchemaType = z.infer<typeof createPollSchema>
