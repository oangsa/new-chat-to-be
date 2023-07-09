import jwtDecode from "jwt-decode"
import { cookies } from 'next/headers'

export default async function checkServerCookie() {

    const cookie: any = cookies().get('user-token')?.value
    
    const token: any = cookie === undefined ? undefined : jwtDecode(cookie, {header: true})

    console.log(token)
    
    return token

 }