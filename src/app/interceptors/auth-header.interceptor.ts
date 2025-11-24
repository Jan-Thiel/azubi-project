import { HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http'
import { HttpHandlerFn } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import { isPlatformBrowser, isPlatformServer } from '@angular/common'
import { inject, PLATFORM_ID } from '@angular/core'

export const cookieForwardingInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const platformId = inject(PLATFORM_ID)

  // Only run on server
  if (isPlatformServer(platformId)) {
    return next(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const cookies = event.headers.getAll('set-cookie')
          if (cookies && cookies.length > 0) {
            console.log('Cookies received from backend:', cookies)
          }
        }
      }),
    )
  }
  return next(req)
}
