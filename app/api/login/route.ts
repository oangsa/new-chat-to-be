import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { getJwtSecretKey } from '@/libs/auth'
import prisma from '@/libs/prismadb'
import { NextResponse, NextRequest } from 'next/server'
export async function POST(request: NextRequest) {
    const re = await request.json()
    const username: string = re.username
    const password: string = re.password

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
        
        // cookies().set({
        //     name: 'user-token',
        //     value: token,
        //     httpOnly: false,
        // })
        
        console.log("done")
        return new NextResponse('Success', {
            status: 200,
            headers: {
             'Set-Cookie': `user-token=${token}; Path=/`,
            },
           })

    } catch (err) {
        console.log(err)
        return new NextResponse("Unknown Error")
    }
}