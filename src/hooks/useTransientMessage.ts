import { useCallback, useEffect, useRef, useState } from 'react'

export const useTransientMessage = (duration = 2500) => {
  const [message, setMessage] = useState<string | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const showMessage = useCallback(
    (text: string) => {
      window.clearTimeout(timeoutRef.current ?? undefined)
      setMessage(text)
      timeoutRef.current = window.setTimeout(() => {
        setMessage(null)
        timeoutRef.current = null
      }, duration)
    },
    [duration],
  )

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current ?? undefined)
    },
    [],
  )

  return { message, showMessage }
}
