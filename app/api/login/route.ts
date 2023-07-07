// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { getJwtSecretKey } from '../../libs/auth'
import cookie from 'cookie'
import prisma from '../../libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const username: string = req.body.username
    const password: string = req.body.password

    var isAdmin = false

    try {
        
        console.log(username, password)

        if (username === "admin" && password === "password") isAdmin = true

        const user = await prisma.student.findFirst({
            where: {
                username: username,
                password: password
            }
        })

        if (!user) return new NextResponse("User is not valid.")

        console.log(user)

        // const token = await new SignJWT({})
        //     .setProtectedHeader({ alg: 'HS256', studentId: result.studentData.studentId , username: result.loginData.username, password: result.loginData.password, isAdmin: isAdmin === true ? true : false })
        //     .setJti(nanoid())
        //     .setExpirationTime('30 days')
        //     .sign(new TextEncoder().encode(getJwtSecretKey()))
        
        // res.setHeader('Set-Cookie', cookie.serialize('user-token', token, {
        //     path: '/',
        //     httpOnly: false,
        //     sameSite: "strict"
        // }))

        // return res.status(200).send(result)

    } catch (err) {
        return new NextResponse("Unknown Error")
        // return res.status(404).send({message: "Unknown Error"})
    }
}