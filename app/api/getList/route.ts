import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../libs/prismadb'
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const user = await prisma.student.findMany()
    var a: any = []
    user.map((item: object) => {
        a.push(item)
    })

    return NextResponse.json(user)
}