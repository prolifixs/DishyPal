import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          id: UUID
          content: string
          post_id: UUID
          user_id: UUID
          created_at: string
        }
        Insert: {
          content: string
          post_id: UUID
          user_id: UUID
        }
      }
    }
  }
}

type UUID = string

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ 
      cookies: () => cookieStore
    })
    
    const { data: comments, error } = await supabase
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles:users (
          id,
          username,
          avatar_url,
          email
        )
      `)
      .eq('post_id', params.id)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching comments:', error)
      throw error
    }

    console.log('Fetched comments:', comments)

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Full Error Object:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ 
      cookies: () => cookieStore
    })
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content } = await request.json()
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    // Check if the user has a profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (profileError || !profile) {
      console.error('Profile Error:', profileError)
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
    }

    // Create the comment
    const { data: comment, error: insertError } = await supabase
      .from('comments')
      .insert({
        content,
        post_id: params.id,
        user_id: user.id
      })
      .select(`
        *,
        profiles:users (
          id,
          username,
          avatar_url,
          email
        )
      `)
      .single()

    if (insertError) throw insertError

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Error posting comment:', error)
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 })
  }
} 