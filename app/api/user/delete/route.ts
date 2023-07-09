import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../libs/prismadb'

export async function DELETE(req: NextRequest, res: NextResponse) {
    const sid: any = new URL(req.url).searchParams.get("sid")

    const user = await prisma.student.delete({
        where: {
            studentId: sid
        },
    })

    console.log(await user)

    return new NextResponse("success!")
}