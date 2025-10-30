import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-[var(--brand-sand)] px-4'>
      <form onSubmit={handleSubmit} className='card w-full max-w-md space-y-6 px-8 py-10'>
        <div>
          <h1 className='text-2xl font-semibold text-[var(--brand-ink)]'>Sign in to LexLink</h1>
          <p className='text-sm text-[var(--brand-muted)]'>Legal network purpose-built for deal teams and litigators.</p>
        </div>
        <label className='text-sm font-semibold text-[var(--brand-ink)]'>
          Email
          <input
            type='email'
            required
            className='mt-2 h-11 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
            placeholder='you@firm.com'
          />
        </label>
        <label className='text-sm font-semibold text-[var(--brand-ink)]'>
          Password
          <input
            type='password'
            required
            className='mt-2 h-11 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
            placeholder='••••••••'
          />
        </label>
        <button type='submit' className='btn-primary w-full'>Continue</button>
        <p className='text-xs text-[var(--brand-muted)]'>By continuing you agree to maintain confidentiality of client matter data shared within LexLink.</p>
      </form>
    </div>
  )
}

