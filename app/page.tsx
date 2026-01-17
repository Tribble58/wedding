'use client'

import { useState } from 'react'
import TitleScreen from '@/components/TitleScreen'
import PhotoScreen from '@/components/PhotoScreen'
import InvitationScreen from '@/components/InvitationScreen'

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <TitleScreen />
      <PhotoScreen />
      <InvitationScreen />
    </main>
  )
}
