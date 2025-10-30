'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BadgeCheck, Globe, User } from 'lucide-react'
import { routes } from '@/lib/routes'

export default function Register() {
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(routes.profile('me'))
  }

  return (
    <div className='flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 py-12'>
      <div className='card w-full max-w-2xl p-8'>
        <div className='grid gap-6 md:grid-cols-[1.1fr_0.9fr]'>
          <div>
            <h1 className='text-2xl font-semibold text-text'>Create your LexLink profile</h1>
            <p className='mt-1 text-sm text-text-muted'>Showcase your practice, publish case updates, and secure referrals from trusted peers.</p>
            <ul className='mt-6 space-y-3 text-sm text-text-muted'>
              <li className='flex items-center gap-2'>
                <BadgeCheck className='h-4 w-4 text-primary' aria-hidden />
                Verified lawyer badges based on bar ID
              </li>
              <li className='flex items-center gap-2'>
                <User className='h-4 w-4 text-primary' aria-hidden />
                Highlight practice areas, fee range, and availability
              </li>
              <li className='flex items-center gap-2'>
                <Globe className='h-4 w-4 text-primary' aria-hidden />
                Collaborate securely across jurisdictions
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='text-sm font-medium text-text' htmlFor='name'>Full name</label>
              <input id='name' name='name' required className='input mt-1' placeholder='Adv. Priya Menon' />
            </div>
            <div>
              <label className='text-sm font-medium text-text' htmlFor='email'>Email</label>
              <input id='email' name='email' type='email' required className='input mt-1' placeholder='you@firm.com' />
            </div>
            <div>
              <label className='text-sm font-medium text-text' htmlFor='barId'>Bar council ID</label>
              <input id='barId' name='barId' required className='input mt-1' placeholder='A/1234/2010' />
            </div>
            <div>
              <label className='text-sm font-medium text-text' htmlFor='password'>Password</label>
              <input id='password' name='password' type='password' required className='input mt-1' placeholder='Create a strong password' />
            </div>
            <button type='submit' className='btn-primary w-full'>Create account</button>
            <p className='text-xs text-text-muted'>By continuing you agree to abide by client confidentiality and LexLink’s professional conduct guidelines.</p>
          </form>
        </div>
        <p className='mt-6 text-center text-sm text-text-muted'>
          Already on LexLink?{' '}
          <Link href={routes.login()} className='text-primary hover:underline'>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

