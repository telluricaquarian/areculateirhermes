'use client'

import { useRef, useState } from 'react'
import AreculateirVideoModal from '@/components/portfolio/AreculateirVideoModal'

const HREF = 'https://www.areculateir.com'

export default function AreculateirLink() {
  const [modalOpen, setModalOpen]   = useState(false)
  // Once the modal has been shown this session, go straight to site on next click
  const hasShownModal = useRef(false)

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (hasShownModal.current) return // let the default navigation happen
    e.preventDefault()
    hasShownModal.current = true
    setModalOpen(true)
  }

  function handleClose() {
    setModalOpen(false)
  }

  return (
    <>
      <a
        href={HREF}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="text-[#e86c2c] hover:text-[#FF7900] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7900]/60 rounded-sm"
      >
        Areculateir.com
      </a>

      <AreculateirVideoModal open={modalOpen} onClose={handleClose} />
    </>
  )
}
