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
        user:users!posts_user_id_fkey(
          id,
          username,
          avatar_url,
          bio
        )
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
