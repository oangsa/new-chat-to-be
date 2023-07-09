import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export async function GET( req: NextApiRequest, res: NextApiResponse ) {
    try {

        const res = await prisma.count.findFirst({})

        await prisma.count.updateMany({
            data: {
                curMonth: 0,
                oldMonth: res?.curMonth
            }
        })

        await prisma.student.updateMany({
            data: {
                oldMonth: 0
            }
        })
        
        return new NextResponse("Success")
    }
    catch (err) {
        return new NextResponse("Error")
    }
}