'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail } from 'lucide-react'
import { routes } from '@/lib/routes'

export default function Login() {
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(routes.home())
  }

  return (
    <div className='flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5 px-4 py-12'>
      <div className='card w-full max-w-md space-y-6 p-8'>
        <div>
          <h1 className='text-2xl font-semibold text-text'>Welcome back to LexLink</h1>
          <p className='text-sm text-text-muted'>Sign in to collaborate, share updates, and manage consultations.</p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <label className='block text-sm font-medium text-text' htmlFor='email'>Email</label>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted' aria-hidden />
            <input id='email' name='email' type='email' required className='input pl-10' placeholder='you@firm.com' />
          </div>

          <label className='block text-sm font-medium text-text' htmlFor='password'>Password</label>
          <div className='relative'>
            <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted' aria-hidden />
            <input id='password' name='password' type='password' required className='input pl-10' placeholder='********' />
          </div>

          <button type='submit' className='btn-primary w-full'>Continue</button>
        </form>

        <p className='text-sm text-text-muted'>
          New to LexLink?{' '}
          <Link href={routes.register()} className='text-primary hover:underline'>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

