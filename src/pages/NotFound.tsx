import { Link } from 'react-router-dom'

export const NotFoundPage = () => (
  <div className='flex min-h-screen flex-col items-center justify-center bg-[var(--brand-sand)] text-center text-sm text-[var(--brand-muted)]'>
    <div className='card max-w-md space-y-4 px-10 py-12'>
      <h1 className='text-2xl font-semibold text-[var(--brand-ink)]'>We couldn’t find that page</h1>
      <p>The link might be outdated or the workspace requires access. Head back to the dashboard to continue working.</p>
      <Link to='/' className='btn-primary inline-flex w-full justify-center'>Return to home</Link>
    </div>
  </div>
)

