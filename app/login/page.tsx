"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaGoogle, FaFacebook } from "react-icons/fa"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        console.error('Signup error:', error)
        throw error
      }

      if (data.user) {
        alert('Check your email for the confirmation link!')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setError(error instanceof Error ? error.message : 'An error occurred during signup')
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      window.location.href = '/'
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to DishyPal</h1>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Loading...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Loading...' : 'Sign Up'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="mt-4">
          <Button variant="outline" className="w-full mb-2">
            <FaGoogle className="mr-2" />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full">
            <FaFacebook className="mr-2" />
            Continue with Facebook
          </Button>
        </div>
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  )
}

