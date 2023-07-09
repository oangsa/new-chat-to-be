import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export default async function GET( req: NextApiRequest, res: NextApiResponse ) {
    try {

        const res = await prisma.count.findFirst({})

        await prisma.count.updateMany({
            data: {
                curDay: 0,
                oldDay: res?.curDay
            }
        })
        
        return new NextResponse("Success")
    }
    catch (err) {
        return new NextResponse("Error")
    }
}