"use server"

import { getCookie } from "cookies-next"
import jwtDecode from "jwt-decode"
import { cookies } from 'next/headers'

export default async function checkCookie() {

    const cookie: string | undefined = cookies().get("user-token")?.value

    const token: any = cookie === undefined ? undefined : jwtDecode(cookie, {header: true})

    return token

 }