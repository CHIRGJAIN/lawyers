import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-[var(--brand-sand)] px-4'>
      <form onSubmit={handleSubmit} className='card w-full max-w-3xl px-10 py-12'>
        <div className='grid gap-8 md:grid-cols-2'>
          <div className='space-y-4 text-sm text-[var(--brand-muted)]'>
            <h1 className='text-2xl font-semibold text-[var(--brand-ink)]'>Join LexLink</h1>
            <p>Showcase expertise, collaborate securely and surface new mandates curated for your practice.</p>
            <ul className='space-y-2'>
              <li>• Verified lawyer badges with bar council checks</li>
              <li>• Matter rooms with structured diligence playbooks</li>
              <li>• Shared research library across practice groups</li>
            </ul>
          </div>
          <div className='space-y-4'>
            <label className='text-sm font-semibold text-[var(--brand-ink)]'>
              Full name
              <input
                required
                className='mt-2 h-11 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
                placeholder='Adv. Priya Menon'
              />
            </label>
            <label className='text-sm font-semibold text-[var(--brand-ink)]'>
              Bar council registration
              <input
                required
                className='mt-2 h-11 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
                placeholder='KA/2032/2010'
              />
            </label>
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
                placeholder='Create a strong password'
              />
            </label>
            <button type='submit' className='btn-primary w-full'>Create workspace</button>
          </div>
        </div>
      </form>
    </div>
  )
}

