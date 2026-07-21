'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

/**
 * מאזין לאירועי שמירה/autosave מה-Live Preview של Payload
 * ומרענן את העמוד — כך התצוגה באדמין מתעדכנת תוך כדי עריכה.
 */
export const LivePreviewRefresh: React.FC = () => {
  const router = useRouter()
  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
    />
  )
}
