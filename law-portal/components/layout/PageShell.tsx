import type { ReactNode } from 'react'

type PageShellProps = {
  left?: ReactNode
  right?: ReactNode
  children: ReactNode
}

export function PageShell({ left, right, children }: PageShellProps) {
  return (
    <div className='mx-auto mt-4 flex w-full max-w-6xl gap-4 px-3 pb-16 sm:px-6 lg:mt-6 lg:pb-20'>
      {/* LEFT SIDEBAR */}
      <aside className='hidden w-[260px] flex-shrink-0 lg:block'>{left}</aside>

      {/* MAIN FEED */}
      <section id='main-content' className='min-w-0 flex-1'>
        {children}
      </section>

      {/* RIGHT SIDEBAR */}
      <aside className='hidden w-[320px] flex-shrink-0 xl:block'>{right}</aside>
    </div>
  )
}
