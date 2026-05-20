'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

function Header() {
  const pathname = usePathname()

  const links = [
    { href: '/polls/new', label: 'Criar enquete' },
    { href: '/polls', label: 'Enquetes' }
  ]

  return (
    <header className='w-full bg-white border-b border-neutral/30 shadow-md'>
      <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
        <Link href='/polls'>
          <Image src='/MyPoll.svg' alt='My Poll' width={120} height={40} />
        </Link>

        <nav className='self-stretch flex items-stretch gap-6'>
          {links.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center text-sm text-neutral-dark font-semibold transition-colors',
                  isActive ? 'border-b-2 border-primary' : 'hover:text-primary'
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export { Header }
