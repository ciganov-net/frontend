import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_ROUTES = ['']
const AUTH_ROUTES = [/^\/auth\/login$/, /^\/auth$/]

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionToken = request.cookies.get('x-session-token')?.value

  return NextResponse.next() 
}
