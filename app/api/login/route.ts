// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { getJwtSecretKey } from '../../../libs/auth'
import prisma from '../../../libs/prismadb'
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
export async function POST(request: NextRequest) {
    const req = await request.json()
    const username: string = req.data.username
    const password: string = req.data.password

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
        
        
        const token = await new SignJWT({})
            .setProtectedHeader({ alg: 'HS256', studentId: user.studentId , username: user.username, password: user.password, isAdmin: isAdmin === true ? true : false })
            .setJti(nanoid())
            .setExpirationTime('30 days')
            .sign(new TextEncoder().encode(getJwtSecretKey()))
        
        cookies().set({
            name: 'user-token',
            value: token,
            httpOnly: true,
        })

        return new NextResponse("Success")

    } catch (err) {
        console.log(err)
        return new NextResponse("Unknown Error")
        // return res.status(404).send({message: "Unknown Error"})
    }
}