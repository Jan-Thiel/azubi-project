import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  public getCookie(name: string, document: Document) {
    let ca: Array<string> = document.cookie.split(';')
    let caLen: number = ca.length
    let cookieName = `${name}=`
    let c: string

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '')
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length)
      }
    }
    return ''
  }

  public deleteCookie(name: string, document: Document) {
    this.setCookie(name, '', -1, '', document)
  }

  public setCookie(
    name: string,
    value: string | number,
    expireDays: number,
    path: string = '',
    document: Document,
  ) {
    let d: Date = new Date()
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000)
    let expires: string = `expires=${d.toUTCString()}`
    let cpath: string = path ? `; path=${path}` : ''
    console.log(name + '|' + value)
    document.cookie = `${name}=${value}; ${expires}${cpath}`
  }
}
