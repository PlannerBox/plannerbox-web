import { apiCall } from 'api-client/utils/api';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const redirectToSignInPage = () => {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  };

  const response = NextResponse.next();

  try {
    const accessToken = request.cookies.get('session')?.value;
    if (accessToken !== undefined) {
      // Check for session validity
      await apiCall(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/is-authenticated`,
        {
          method: 'GET',
          headers: new Headers({
            Cookie: `session=${accessToken}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`,
          }),
        }
      );

      // Refresh token
      const refreshToken = request.cookies.get('session_refresher')?.value;
      if (refreshToken !== undefined) {
        const refeshedToken = await apiCall(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
          {
            method: 'GET',
            headers: new Headers({
              Cookie: `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`,
            }),
          }
        );
        response.cookies.set({
          name: 'session',
          value: refeshedToken.access_token,
          path: '/',
          maxAge: process.env.JWT_EXPIRATION_TIME,
        });
      } else {
        // If user isn't authenticated
        return redirectToSignInPage();
      }
    } else {
      // If user isn't authenticated
      return redirectToSignInPage();
    }
  } catch (error) {
    // If user seems to not being authenticated
    return redirectToSignInPage();
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|favicon.ico|sign-in|sign-out|forgot-password|change-password).*)',
  ],
};
