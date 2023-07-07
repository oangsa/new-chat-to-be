import { NextResponse } from "next/server"
import prisma from "../../../libs/prismadb"

export async function GET() {
    
    const data = await prisma.student.findMany({
        orderBy: [
            {
                timestamps: "desc"
            }
        ],
        take: 12
    })

    return NextResponse.json(data)
}