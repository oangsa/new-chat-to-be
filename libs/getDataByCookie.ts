"use server"
import { cookies } from "next/headers"
import jwtDecode from "jwt-decode"

export default async function getDataByCookie() {
    // const token: any = cookie === undefined ? undefined : jwtDecode(cookie, {header: true})

    const s: any = cookies().get("user-token")?.value  
    
    if (s === undefined) return undefined

    const token: any = s === undefined ? undefined : jwtDecode(s, {header: true})
    
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : "http://localhost:3000/"
    
    const a = fetch(`${baseUrl}api/user/getuserbysid?sid=${token.studentId.toString()}`)



    return a.then((res) => {return res.json()})
}