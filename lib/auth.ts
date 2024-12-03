import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'

interface User {
  id: string
  username: string
  email: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('users')  // or 'profiles' depending on your table name
          .select('username')
          .eq('id', session.user.id)
          .single()

        const userData: User = {
          id: session.user.id,
          username: profile?.username || session.user.user_metadata?.username || session.user.email?.split('@')[0] || '',
          email: session.user.email || ''
        }
        setUser(userData)
      } else {
        setUser(null)
      }
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('users')  // or 'profiles' depending on your table name
          .select('username')
          .eq('id', session.user.id)
          .single()

        const userData: User = {
          id: session.user.id,
          username: profile?.username || session.user.user_metadata?.username || session.user.email?.split('@')[0] || '',
          email: session.user.email || ''
        }
        setUser(userData)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  return { user, loading }
} 