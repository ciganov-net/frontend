import { NextRequest, NextResponse } from 'next/server'
import { api } from './api/instance'
import { UserInfoResponse } from './api/generated'

//user - 0
//admin - 1

const PROTECTED_ROUTES = [/^\/onboarding$/, /^\/account(\/.*)?$/]
const ADMIN_ROUTERS = [/^\/admin$/]
const AUTH_ROUTES = [/^\/auth\/login$/, /^\/auth$/]

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('x-session-token')?.value

  const isProtected = PROTECTED_ROUTES.some(r => r.test(pathname))
  const isAuth = AUTH_ROUTES.some(r => r.test(pathname))
  const isAdmin = ADMIN_ROUTERS.some(r => r.test(pathname))

  if (!sessionToken && isProtected) {
    const url = request.nextUrl.clone()

    url.pathname = '/auth/login'

    return NextResponse.redirect(url)
  }

  if (sessionToken && isAuth) {
    const url = request.nextUrl.clone()

    url.pathname = '/profile'

    return NextResponse.redirect(url)
  }

  if (sessionToken && isAdmin) {
    try {
      const response = await api.get<UserInfoResponse>('/accounts/info', {
        headers: {
          Cookie: `x-session-token=${sessionToken}`
        }
      })

      if (response.data.role !== 1) {
        const url = request.nextUrl.clone()

        url.pathname = '/dashboard'

        return NextResponse.redirect(url)
      }

      return NextResponse.next()
    } catch (e) {
      const url = request.nextUrl.clone()

      url.pathname = '/auth/login'

      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}
