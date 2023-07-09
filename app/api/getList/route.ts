import prisma from '../../../libs/prismadb'
import { NextResponse } from "next/server";

export async function GET() {
    const user = await prisma.student.findMany()
    var a: any = []
    user.map((item: object) => {
        a.push(item)
    })

    return NextResponse.json(user)
}