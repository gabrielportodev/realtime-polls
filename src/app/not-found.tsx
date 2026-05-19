import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6'>
      <p className='text-6xl font-bold text-text-dark'>404</p>
      <div className='flex flex-col gap-1'>
        <h1 className='text-xl font-semibold text-text-dark'>Página não encontrada</h1>
        <p className='text-sm text-neutral-dark'>A página que você está procurando não existe.</p>
      </div>
      <div className='flex gap-3 mt-2'>
        <Link href='/polls'>
          <Button>Enquetes</Button>
        </Link>
      </div>
    </main>
  )
}
