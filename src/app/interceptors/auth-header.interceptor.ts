import { HttpRequest } from '@angular/common/http'
import { HttpHandlerFn } from '@angular/common/http'
import { inject, PLATFORM_ID } from '@angular/core'
import { CustomerService } from '../service/customer.service'
import { isPlatformBrowser } from '@angular/common'
import { Observable, of, take } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { selectCollectionState } from '../store/selectors/userId.selectors'

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  let customerService = inject(CustomerService)
  if (
    req.url.includes('/user') ||
    req.url.includes('/cartItems') ||
    req.url.includes('/orders') ||
    (req.url.includes('/addresses') && !req.url.includes('/registerAnon'))
  ) {
    // If there is a jwt token in storage, append it as a header to any request. If not, grab a new one with the refreshToken
    if (isPlatformBrowser(PLATFORM_ID)) {
      if (sessionStorage.getItem('jwtToken')) {
        const cloned = req.clone({
          setHeaders: { Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken') },
        })
        console.log('Token Appended')
        return next(cloned)
      } else {
        return next(req)
      }
    }
  }
  return next(req)
}

export const userNameInsertInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const store = inject(Store)

  if (!req.url.includes('/registerAnon') && !req.url.includes('/authorize')) {
    console.log(req.url)
    const customerService = inject(CustomerService)

    return store.select(selectCollectionState).pipe(
      switchMap(userId => {
        console.log('userNameInsertInterceptor: ', userId)
        if (userId === undefined || userId === null || userId === 0) {
          console.log('No uId')
          // If no userId, authorize first then retry

          return customerService.authorize().pipe(
            switchMap(() => store.select(selectCollectionState).pipe(take(1))), // Get updated userId
            switchMap(updatedUserId => replaceUserIdPlaceholders(req, of(updatedUserId))),
            switchMap(modifiedReq => next(modifiedReq))
          )
        }
        console.log('userNameInsertInterceptor_: ', userId)

        return replaceUserIdPlaceholders(req, of(userId)).pipe(
          switchMap(modifiedReq => {
            return next(modifiedReq)
          }),
        )
      }),
    )
  }

  return next(req)
}

function replaceUserIdPlaceholders(
  req: HttpRequest<any>,
  userId: Observable<number>,
): Observable<HttpRequest<any>> {
  return userId.pipe(
    map(userIds => {
      const id = userIds.toString()
      let modifiedReq = req

      // Replace in body
      if (req.body) {
        const newBody = { ...req.body }
        if (newBody.id === 'userIdInsertPlaceholder') {
          newBody.id = id
          console.log(newBody)
        }
        if (newBody.userId === 'userIdInsertPlaceholder') {
          newBody.userId = id
          console.log(newBody)
        }
        modifiedReq = modifiedReq.clone({ body: newBody })
      }

      // Replace in params
      if (req.params.has('id') && req.params.get('id') == 'userIdInsertPlaceholder') {
        console.log('params contain uid placeholder')
        modifiedReq = modifiedReq.clone({
          params: modifiedReq.params.set('id', id),
        })
      }
      if (req.params.has('userId') && req.params.get('userId') == 'userIdInsertPlaceholder') {
        console.log('params contain uid placeholder')
        modifiedReq = modifiedReq.clone({
          params: modifiedReq.params.set('userId', id),
        })
      }

      return modifiedReq
    }),
  )
}

export const debugShowRequestInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  console.log(req.url)
  console.log(req.body)
  // console.log(req.params)
  // console.log(isPlatformBrowser(PLATFORM_ID))
  return next(req)
}
