"use client"

import { useEffect, useState } from 'react'
import  UserPostDetail  from '@/components/user-post-detail'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

interface PostData {
  id: number
  content: string
  created_at: string
  user: {
    username: string
    avatar_url: string
    bio: string
  }
  media_urls?: string[]
  tags?: string[]
  likes_count: number
  comments_count: number
  reposts_count: number
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select(`
            *,
            user:users!user_id(
              username,
              avatar_url,
              bio
            )
          `)
          .eq('id', params.id)
          .single()

        if (postError) throw postError
        if (!postData) {
          setError('Post not found')
          return
        }

        setPost(postData)
      } catch (err) {
        console.error('Error fetching post:', err)
        setError('Failed to fetch post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id, supabase])

  if (loading) return <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>

  if (error || !post) return <div className="container mx-auto p-4">
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Error</h2>
      <p className="text-muted-foreground">{error || 'Post not found'}</p>
      <button onClick={() => router.back()} className="mt-4 text-primary hover:underline">
        Go Back
      </button>
    </div>
  </div>

  return (
    <div className="container mx-auto p-4">
      <UserPostDetail 
        id={post.id}
        content={post.content}
        username={post.user.username}
        userBio={post.user.bio}
        profileImage={post.user.avatar_url || '/placeholder.svg'}
        likes={post.likes_count}
        comments={post.comments_count}
        reposts={post.reposts_count}
        mediaUrls={post.media_urls}
        tags={post.tags}
        createdAt={post.created_at}
      />
    </div>
  )
}