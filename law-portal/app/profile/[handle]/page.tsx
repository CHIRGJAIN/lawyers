import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BriefcaseBusiness, Globe, Languages, MapPin, ShieldCheck, UsersRound } from 'lucide-react'
import { FeedPost } from '@/components/FeedPost'
import RightSidebar from '@/components/RightSidebar'
import { PageShell } from '@/components/layout/PageShell'
import { consultationLink, feed, lawyers, type Lawyer } from '@/lib/data'
import { routeParams, routes } from '@/lib/routes'

type ProfilePageProps = {
  params: { handle: string }
}

const experienceTimeline = [
  {
    id: 'exp-1',
    title: 'Managing Partner, Menon & Associates',
    period: '2019 - Present',
    description: 'Leading cross-border corporate transactions, privacy compliance audits, and venture capital negotiations across APAC.',
  },
  {
    id: 'exp-2',
    title: 'Senior Associate, JurisTech Law',
    period: '2014 - 2019',
    description: 'Advised on technology transfer, cybersecurity due diligence, and regulatory investigations.',
  },
]

const educationTimeline = [
  {
    id: 'edu-1',
    title: 'LL.M. Technology & Innovation Law',
    period: 'University of Cambridge',
  },
  {
    id: 'edu-2',
    title: 'B.A. LL.B (Hons)',
    period: 'National Law University, Delhi',
  },
]

export default function ProfilePage({ params }: ProfilePageProps) {
  const searchParams = useSearchParams()
  const profile: Lawyer | undefined = lawyers.find((lawyer) => lawyer.id === params.handle)

  if (!profile) {
    notFound()
  }

  const authorPosts = feed.filter((post) => post.authorId === profile.id)

  return (
    <PageShell left={null} right={<RightSidebar />}>
      <article className='space-y-6'>
        {/* PROFILE HERO */}
        <section className='card card-hoverable overflow-hidden'>
          <div className='h-28 w-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/30 sm:h-36' aria-hidden />
          <div className='p-6 sm:p-8'>
            <div className='flex flex-col items-start gap-6 sm:flex-row sm:items-end'>
              <div className='-mt-16 flex items-center gap-4 sm:-mt-20'>
                <div className='h-32 w-32 overflow-hidden rounded-full border-4 border-surface-base shadow-card'>
                  <Image src={profile.avatar} alt={`${profile.name} avatar`} width={128} height={128} />
                </div>
                <div>
                  <h1 className='text-2xl font-semibold text-text'>{profile.name}</h1>
                  <p className='text-sm text-text-muted'>{profile.headline}</p>
                  <div className='mt-2 flex flex-wrap items-center gap-2 text-xs text-text-muted'>
                    <span className='inline-flex items-center gap-1'>
                      <MapPin className='h-3.5 w-3.5 text-primary' aria-hidden />
                      {profile.jurisdiction}
                    </span>
                    <span aria-hidden>•</span>
                    <span>{profile.yearsExperience}+ years PQE</span>
                    <span aria-hidden>•</span>
                    <span>Bar ID: {profile.barId}</span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-2 sm:ml-auto sm:flex-row'>
                <Link href={consultationLink(profile.id)} className='btn-primary'>
                  Book consultation
                </Link>
                <Link
                  href={routes.messages(routeParams.thread(profile.id))}
                  className='btn-outline'
                >
                  Message
                </Link>
                <Link href={routes.network()} className='btn-ghost'>Refer client</Link>
              </div>
            </div>

            <div className='mt-6 grid gap-4 text-sm text-text-muted sm:grid-cols-3'>
              <div className='flex items-center gap-2 rounded-xl bg-background/70 p-3'>
                <BriefcaseBusiness className='h-4 w-4 text-primary' aria-hidden />
                <span>{profile.practiceAreas.slice(0, 2).join(', ')} and more</span>
              </div>
              <div className='flex items-center gap-2 rounded-xl bg-background/70 p-3'>
                <UsersRound className='h-4 w-4 text-primary' aria-hidden />
                <span>{profile.availability}</span>
              </div>
              <div className='flex items-center gap-2 rounded-xl bg-background/70 p-3'>
                <ShieldCheck className='h-4 w-4 text-primary' aria-hidden />
                <span>Fee range {profile.feeRange}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT + PRACTICE ZONES */}
        <section className='grid gap-4 lg:grid-cols-[2fr_1fr]'>
          <article className='card card-hoverable space-y-4 p-6'>
            <header>
              <h2 className='text-lg font-semibold text-text'>About the practice</h2>
            </header>
            <p className='text-sm leading-relaxed text-text-muted'>
              {profile.name} advises {profile.firm} and global in-house teams on {profile.practiceAreas.join(', ')}. The practice
              focuses on strategic risk advisory, cross-border regulatory compliance, and advocacy before {profile.jurisdiction}.
              Clients range from venture-funded startups to multinational conglomerates scaling operations across India and
              APAC.
            </p>
            <div className='flex flex-wrap gap-2'>
              {profile.practiceAreas.map((area) => (
                <span key={area} className='pill'>
                  {area}
                </span>
              ))}
            </div>
          </article>

          <aside className='space-y-4'>
            <div className='card card-hoverable space-y-3 p-6 text-sm text-text-muted'>
              <h3 className='text-sm font-semibold text-text'>Jurisdictions & languages</h3>
              <p className='inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary'>
                <MapPin className='h-3.5 w-3.5' aria-hidden />
                Primary jurisdiction
              </p>
              <span>{profile.jurisdiction}</span>
              <p className='inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary'>
                <Languages className='h-3.5 w-3.5' aria-hidden />
                Languages
              </p>
              <span>{profile.languages.join(', ')}</span>
              <p className='inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary'>
                <Globe className='h-3.5 w-3.5' aria-hidden />
                Availability
              </p>
              <span>{profile.availability}</span>
            </div>
          </aside>
        </section>

        {/* FEATURED CASES */}
        <section className='card card-hoverable space-y-4 p-6'>
          <header className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-text'>Featured cases</h2>
            <Link href={routes.opportunities()} className='text-sm text-primary hover:underline'>Request case review</Link>
          </header>
          <div className='grid gap-3 sm:grid-cols-2'>
            {[
              'Cross-border SaaS acquisition — competition clearance across EU and India',
              'High Court writ defending data localisation mandate for fintech consortium',
            ].map((caseItem) => (
              <article key={caseItem} className='rounded-xl border border-border bg-white p-4 text-sm text-text-muted'>
                {caseItem}
              </article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION */}
        <section className='card card-hoverable p-6'>
          <h2 className='text-lg font-semibold text-text'>Experience & education</h2>
          <div className='mt-4 grid gap-6 lg:grid-cols-2'>
            <div className='space-y-4'>
              {experienceTimeline.map((item) => (
                <div key={item.id} className='rounded-xl border border-border bg-white/60 p-4 text-sm text-text-muted'>
                  <p className='font-semibold text-text'>{item.title}</p>
                  <p className='text-xs uppercase tracking-wide text-primary'>{item.period}</p>
                  <p className='mt-2 leading-relaxed'>{item.description}</p>
                </div>
              ))}
            </div>
            <div className='space-y-4'>
              {educationTimeline.map((item) => (
                <div key={item.id} className='rounded-xl border border-border bg-white/60 p-4 text-sm text-text-muted'>
                  <p className='font-semibold text-text'>{item.title}</p>
                  <p className='text-xs uppercase tracking-wide text-primary'>{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARTICLES / UPDATES */}
        <section className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-text'>Case updates & legal articles</h2>
            <Link href={routes.compose()} className='text-sm text-primary hover:underline'>Share an update</Link>
          </div>
          <div className='space-y-4'>
            {authorPosts.length === 0 ? (
              <div className='card p-6 text-sm text-text-muted'>No legal updates published yet.</div>
            ) : (
              authorPosts.map((post) => <FeedPost key={post.id} post={post} author={profile} />)
            )}
          </div>
        </section>
      </article>
    </PageShell>
  )
}
