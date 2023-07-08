import { CookieValueTypes } from "cookies-next";
import axios from 'axios'

export default async function loginHandler(username: string, password: string) {
    const res = await axios.post("/api/login", {
        data: {username, password}
    })
    return await res.status
}