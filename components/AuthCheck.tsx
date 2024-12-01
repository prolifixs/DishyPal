'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.replace('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/login')
      }
    })

    checkAuth()
    return () => subscription.unsubscribe()
  }, [router, supabase])

  if (isLoading) {
    return <div className="flex items-center justify-center w-full h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  }

  return <>{children}</>
}