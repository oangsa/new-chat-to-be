import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../libs/prismadb'

export async function GET(req: NextRequest, res: NextResponse) {
    const sid: any = new URL(req.url).searchParams.get("sid")

    const user = await prisma.student.findFirst({
        where: {
            studentId: parseInt(sid)
        },
    })

    return NextResponse.json(user)
}