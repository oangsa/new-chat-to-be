import { CookieValueTypes, getCookie } from "cookies-next"
import jwtDecode from "jwt-decode"
import { cookies } from 'next/headers'

export default function checkCookie() {

    const cookie: any = getCookie("user-token")  
    
    const token: any = cookie === undefined ? undefined : jwtDecode(cookie, {header: true})

    console.log(token)
    
    return token

 }