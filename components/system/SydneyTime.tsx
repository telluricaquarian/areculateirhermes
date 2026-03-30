'use client'

import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-AU', {
  timeZone: 'Australia/Sydney',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export default function SydneyTime() {
  const [time, setTime] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => setTime(formatter.format(new Date()))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) return null

  return (
    <div className="pointer-events-none select-none text-xs tracking-wide text-white/50">
      Sydney Time AEST: {time}
    </div>
  )
}
