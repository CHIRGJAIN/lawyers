type ShellProps = {
  left?: React.ReactNode
  right?: React.ReactNode
  children: React.ReactNode
}

export const Shell = ({ left, right, children }: ShellProps) => (
  <div className='mx-auto flex max-w-6xl gap-6 px-6 py-6 lg:py-8'>
    <aside className='hidden w-[260px] flex-shrink-0 lg:block'>
      <div className='sticky top-24'>{left}</div>
    </aside>
    <main className='min-w-0 flex-1'>{children}</main>
    <aside className='hidden w-[300px] flex-shrink-0 xl:block'>
      <div className='sticky top-24'>{right}</div>
    </aside>
  </div>
)
