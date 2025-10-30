const news = [
  {
    id: 'news-1',
    headline: 'SEBI notifies ESG assurance framework for listed entities',
    time: '3 hours ago',
    source: 'Capital Markets Watch',
  },
  {
    id: 'news-2',
    headline: 'Supreme Court reserves verdict in landmark privacy PIL',
    time: '7 hours ago',
    source: 'The Legal Sentinel',
  },
  {
    id: 'news-3',
    headline: 'FinMin seeks comments on cross-border data sandbox policy',
    time: 'Yesterday',
    source: 'IndiaTech Policy',
  },
]

const upcoming = [
  {
    id: 'event-1',
    title: 'VC portfolio compliance roundtable',
    date: '26 Oct · 6:00 PM IST',
  },
  {
    id: 'event-2',
    title: 'Masterclass: Investigations under Companies Act',
    date: '31 Oct · 8:30 PM IST',
  },
]

export const RightPanel = () => (
  <div className='space-y-4'>
    <section className='card p-5 text-sm'>
      <header className='flex items-center justify-between'>
        <div>
          <h3 className='text-sm font-semibold text-[var(--brand-ink)]'>Legal news pulse</h3>
          <p className='text-xs text-[var(--brand-muted)]'>Tracking regulations across India + APAC</p>
        </div>
        <a className='text-xs font-semibold text-[var(--brand-blue)] hover:text-[var(--brand-blue-dark)]' href='/alerts'>
          View all
        </a>
      </header>
      <ul className='mt-4 space-y-3'>
        {news.map((item) => (
          <li key={item.id} className='rounded-xl px-3 py-2 transition hover:bg-[var(--brand-sand)]'>
            <p className='text-sm font-medium text-[var(--brand-ink)]'>{item.headline}</p>
            <p className='text-xs text-[var(--brand-muted)]'>{item.source} · {item.time}</p>
          </li>
        ))}
      </ul>
    </section>

    <section className='card p-5'>
      <h3 className='text-sm font-semibold text-[var(--brand-ink)]'>Upcoming rooms</h3>
      <ul className='mt-4 space-y-3 text-sm text-[var(--brand-muted)]'>
        {upcoming.map((item) => (
          <li key={item.id} className='rounded-xl border border-[var(--brand-border)] px-3 py-3'>
            <p className='font-semibold text-[var(--brand-ink)]'>{item.title}</p>
            <p className='text-xs uppercase tracking-wide'>{item.date}</p>
          </li>
        ))}
      </ul>
    </section>
  </div>
)

