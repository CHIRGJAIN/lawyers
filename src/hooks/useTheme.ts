import { useCallback, useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'ac-theme'

const applyTheme = (value: ThemeMode) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.dataset.theme = value
  root.style.setProperty('color-scheme', value)
  root.classList.toggle('dark', value === 'dark')
}

const resolveInitialTheme = (): { theme: ThemeMode; hasExplicitPreference: boolean } => {
  if (typeof window === 'undefined') {
    return { theme: 'light', hasExplicitPreference: false }
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    if (stored === 'light' || stored === 'dark') {
      applyTheme(stored)
      return { theme: stored, hasExplicitPreference: true }
    }
  } catch {
    // ignore storage access issues and fall back to system preference
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  const fallback = prefersDark ? 'dark' : 'light'
  applyTheme(fallback)
  return { theme: fallback, hasExplicitPreference: false }
}

export const useTheme = () => {
  const [{ theme, hasExplicitPreference }, setState] = useState(resolveInitialTheme)

  const setTheme = useCallback((value: ThemeMode, persist = true) => {
    setState({ theme: value, hasExplicitPreference: persist })
  }, [])

  const toggleTheme = useCallback(() => {
    setState((prev) => ({
      theme: prev.theme === 'dark' ? 'light' : 'dark',
      hasExplicitPreference: true,
    }))
  }, [])

  useEffect(() => {
    applyTheme(theme)

    if (typeof window === 'undefined') return
    try {
      if (hasExplicitPreference) {
        window.localStorage.setItem(STORAGE_KEY, theme)
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // ignore storage failures
    }
  }, [theme, hasExplicitPreference])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (event: MediaQueryListEvent) => {
      setState((prev) =>
        prev.hasExplicitPreference
          ? prev
          : {
              theme: event.matches ? 'dark' : 'light',
              hasExplicitPreference: false,
            },
      )
    }

    try {
      mql.addEventListener('change', listener)
    } catch {
      // Safari <14 fallback
      // @ts-expect-error - older browsers support addListener
      mql.addListener(listener)
    }

    return () => {
      try {
        mql.removeEventListener('change', listener)
      } catch {
        // @ts-expect-error - older browsers support removeListener
        mql.removeListener(listener)
      }
    }
  }, [])

  return {
    theme,
    isDark: theme === 'dark',
    setTheme: (value: ThemeMode) => setTheme(value, true),
    toggleTheme,
  }
}
