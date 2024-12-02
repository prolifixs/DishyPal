import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { CreatePostPayload } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const json: CreatePostPayload = await request.json()
    const supabase = createRouteHandlerClient({ cookies })
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Call the create_post function
    const { data, error } = await supabase
      .rpc('create_post', {
        p_user_id: user.id,
        p_content: json.content,
        p_tags: json.tags || null,
        p_mentions: json.mentions || null,
        p_media_urls: json.media_urls || null
      })

    if (error) throw error

    // Fetch the created post with its relations
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select(`
        *,
        media:post_media(*),
        tags:post_tags(tag:tags(*)),
        mentions:post_mentions(mentioned_user:users(id, email))
      `)
      .eq('id', data)
      .single()

    if (postError) throw postError

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Error creating post' }),
      { status: 500 }
    )
  }
} 