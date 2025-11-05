import { memo } from 'react'

export const LawyerLogo = memo(() => (
  <div className='lawyer-logo' aria-hidden='true'>
    <span className='lawyer-logo__halo' />
    <div className='lawyer-logo__diamond'>
      <div className='lawyer-logo__diamond-inner'>
        <svg className='lawyer-logo__emblem' viewBox='0 0 48 48' role='img' aria-hidden='true'>
          <defs>
            <linearGradient id='lawyer-logo-gold' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor='#fff4d0' />
              <stop offset='45%' stopColor='#f3c86a' />
              <stop offset='100%' stopColor='#c7831a' />
            </linearGradient>
            <linearGradient id='lawyer-logo-gold-stroke' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor='#fbe5a6' />
              <stop offset='60%' stopColor='#d8a640' />
              <stop offset='100%' stopColor='#8c5b07' />
            </linearGradient>
          </defs>
          <g fill='url(#lawyer-logo-gold)' stroke='rgba(42, 24, 4, 0.35)' strokeWidth='0.6' strokeLinejoin='round'>
            <path d='M24 6a2 2 0 0 1 2 2v3h8a2 2 0 0 1 0 4h-.7l3.5 7.4c.16.35.24.74.24 1.13 0 2.2-1.78 3.98-3.98 3.98s-3.98-1.78-3.98-3.98c0-.37.07-.75.22-1.09L33.2 15H26v16.1c2.34.46 4.1 2.52 4.1 4.98V37h4a2 2 0 1 1 0 4H14a2 2 0 1 1 0-4h4.1v-1.92c0-2.46 1.76-4.52 4.1-4.98V15h-7.2l2.17 4.43c.15.34.22.72.22 1.09 0 2.2-1.78 3.98-3.98 3.98s-3.98-1.78-3.98-3.98c0-.39.08-.78.24-1.13L13.7 15H12a2 2 0 1 1 0-4h8V8a2 2 0 0 1 2-2Zm-8.85 9.63-2.44 5.23h4.88l-2.44-5.23Zm17.7 0-2.44 5.23h4.88l-2.44-5.23Z' />
          </g>
          <g fill='none' stroke='url(#lawyer-logo-gold-stroke)' strokeWidth='1.35' strokeLinecap='round'>
            <path
              d='M13.5 35.8c-3.4-4.2-5.2-9.1-5.2-14.7 0-4.9 1.3-9.5 4-13.9'
              strokeDasharray='0.4 2.5'
              strokeLinejoin='round'
            />
            <path
              d='M34.5 35.8c3.4-4.2 5.2-9.1 5.2-14.7 0-4.9-1.3-9.5-4-13.9'
              strokeDasharray='0.4 2.5'
              strokeLinejoin='round'
            />
          </g>
          <circle cx='24' cy='9.8' r='2.2' fill='url(#lawyer-logo-gold)' stroke='rgba(42, 24, 4, 0.35)' strokeWidth='0.5' />
        </svg>
      </div>
    </div>
    <span className='sr-only'>LexLink</span>
  </div>
))

LawyerLogo.displayName = 'LawyerLogo'
