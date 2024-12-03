import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient<any>({ 
      cookies: () => {
        const cookieStore = cookies()
        return Promise.resolve(cookieStore)
      }
    })
    
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        media:post_media(*),
        tags:post_tags(tag:tags(*)),
        mentions:post_mentions(mentioned_user:users(id, email))
      `)
      .eq('id', params.id)
      .single()

    if (error) throw error
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content } = await request.json()
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    // Insert comment
    const { data: comment, error: insertError } = await supabase
      .from('comments')
      .insert({
        content,
        post_id: params.id,
        user_id: user.id
      })
      .select('*')
      .single()

    if (insertError) {
      console.error('Supabase error:', insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Get user data
    const { data: userData } = await supabase
      .from('users')
      .select('email')
      .eq('id', user.id)
      .single()

    return NextResponse.json({
      ...comment,
      user: userData
    })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}