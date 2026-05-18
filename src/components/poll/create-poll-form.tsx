'use client'

import { createPollSchema, CreatePollSchemaType } from '@/schemas/create-poll-schema'
import { useForm, useFieldArray } from 'react-hook-form'
import { DateInput } from '@/components/ui/date-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircleIcon, Trash2 } from 'lucide-react'
import { createPoll } from '@/lib/supabase/queries'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

function CreatePollForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<CreatePollSchemaType>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      title: '',
      start_at: '',
      end_at: '',
      options: [{ text: '' }, { text: '' }, { text: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'options' })

  async function onSubmit(data: CreatePollSchemaType) {
    try {
      await createPoll({
        title: data.title,
        start_at: new Date(data.start_at).toISOString(),
        end_at: new Date(data.end_at).toISOString(),
        options: data.options.map(opt => opt.text)
      })
      router.push('/polls')
    } catch (error) {
      console.error('Erro ao criar enquete:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <Input
        label='Título'
        placeholder='Ex: Qual a sua linguagem favorita?'
        error={errors.title?.message}
        {...register('title')}
      />

      <div className='flex flex-col gap-3'>
        <span className='text-base font-semibold text-text-dark'>Opções de resposta</span>

        {fields.map((field, index) => (
          <div key={field.id} className='flex items-start gap-2'>
            <Input
              placeholder={`Opção ${index + 1}`}
              error={errors.options?.[index]?.text?.message}
              {...register(`options.${index}.text`)}
            />
            {fields.length > 3 && (
              <Button
                type='button'
                variant='outline'
                onClick={() => remove(index)}
                className='h-11 w-11 shrink-0 border-red-300 text-red-500 hover:bg-red-50'
              >
                <Trash2 className='size-4' />
              </Button>
            )}
          </div>
        ))}

        {errors.options?.root?.message && <span className='text-xs text-red-500'>{errors.options.root.message}</span>}

        <Button
          type='button'
          variant='primary'
          className='self-start'
          icon={<PlusCircleIcon className='size-4' />}
          onClick={() => append({ text: '' })}
        >
          Adicionar opção
        </Button>
      </div>

      <div className='grid sm:grid-cols-2 gap-4'>
        <DateInput label='Data de início' error={errors.start_at?.message} {...register('start_at')} />
        <DateInput label='Data de término' error={errors.end_at?.message} {...register('end_at')} />
      </div>

      <div className='flex justify-center'>
        <Button
          type='submit'
          size='lg'
          disabled={isSubmitting}
          icon={isSubmitting ? <Spinner size='sm' className='border-white/30 border-t-white' /> : undefined}
          className='w-full md:w-[50%]'
        >
          {isSubmitting ? 'Criando...' : 'Criar enquete'}
        </Button>
      </div>
    </form>
  )
}

export { CreatePollForm }
