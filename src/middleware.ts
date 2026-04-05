import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // If env vars are missing, just bypass middleware instead of crashing with 500
    return supabaseResponse
  }

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This will refresh session if expired - required for Server Components
  // and will also check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // --- MAINTENANCE MODE LOGIC ---
  const { data: settings } = await supabase
    .from('system_settings')
    .select('maintenance_mode')
    .eq('id', 1)
    .single()

  const isMaintenanceActive = settings?.maintenance_mode || false
  const isAdmin = user?.email === 'automatize05@gmail.com'
  const isMaintenancePath = request.nextUrl.pathname === '/maintenance'
  const isPublicAsset = request.nextUrl.pathname.match(/\.(svg|png|jpg|jpeg|gif|webp)$/)

  if (isMaintenanceActive && !isAdmin && !isMaintenancePath && !isPublicAsset && !request.nextUrl.pathname.startsWith('/_next')) {
    const maintenanceUrl = request.nextUrl.clone()
    maintenanceUrl.pathname = '/maintenance'
    return NextResponse.redirect(maintenanceUrl)
  }

  // If maintenance is OFF but user is on /maintenance page, redirect them home
  if (!isMaintenanceActive && isMaintenancePath) {
    const homeUrl = request.nextUrl.clone()
    homeUrl.pathname = '/'
    return NextResponse.redirect(homeUrl)
  }

  // --- ROUTE PROTECTION LOGIC ---
  const publicRoutes = ['/', '/login', '/register', '/maintenance', '/plans']
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname) || isPublicAsset
  const isNextInternal = request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.startsWith('/api')

  // 1. Strict Admin Protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user || user.email !== 'automatize05@gmail.com') {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/login'
      return NextResponse.redirect(loginUrl)
    }
    
    // Future: Check auth level for MFA if needed
    // const { data: { authenticatorAssuranceLevel } } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    // if (authenticatorAssuranceLevel !== 'aal2') { ... redirect to mfa enrollment ... }
  }

  // 2. Dashboard/Checkout Protection
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || 
                         request.nextUrl.pathname.startsWith('/checkout') ||
                         request.nextUrl.pathname.startsWith('/u/')

  if (!user && !isPublicRoute && !isNextInternal && isProtectedRoute) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
