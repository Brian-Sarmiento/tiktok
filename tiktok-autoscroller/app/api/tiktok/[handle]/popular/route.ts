'use client'

import { useEffect, useRef, useState } from 'react'

type VideoInfo = {
  id: string
  url: string
  stats?: { diggCount: number; playCount: number; shareCount: number; commentCount: number }
}

export default function Page() {
  const [videos, setVideos] = useState<VideoInfo[]>([])
  const [auto, setAuto] = useState(true)
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const user = params.get('user')?.replace(/^@/, '') || 'user415387491623'

    fetch(`/api/tiktok/${encodeURIComponent(user)}/popular`)
      .then(res => res.json())
      .then(data => setVideos(data.videos || []))
  }, [])

  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => {
      if (!feedRef.current) return
      feedRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }, 18000)
    return () => clearInterval(id)
  }, [auto])

  return (
    <main className="flex flex-col h-screen">
      <header className="p-3 flex gap-2 items-center border-b border-white/10">
        <h1 className="text-lg font-bold">TikTok Popular Auto-Scroller</h1>
        <button onClick={() => setAuto(a => !a)} className="ml-auto px-3 py-1 bg-white/10 rounded">
          {auto ? 'Autoscroll: ON' : 'Autoscroll: OFF'}
        </button>
      </header>

      <div ref={feedRef} className="feed flex-1 overflow-y-auto">
        {videos.map(v => (
          <section key={v.id} className="feed-item min-h-screen flex flex-col items-center justify-center">
            <a href={v.url} target="_blank" rel="noreferrer" className="mb-2 text-sm underline">Abrir en TikTok</a>
            <iframe
              src={`https://www.tiktok.com/embed/v2/${v.id}`}
              width="325"
              height="580"
              allowFullScreen
              className="rounded-xl"
            />
            {v.stats && (
              <div className="mt-2 text-xs text-gray-400">
                ❤ {v.stats.diggCount} | ▶ {v.stats.playCount}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  )
}
