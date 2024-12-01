import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/login', '/auth/callback']

export async function middleware(request: NextRequest) {
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
} 