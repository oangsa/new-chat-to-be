import { NextResponse } from "next/server"
import prisma from "../../../libs/prismadb"

export async function GET() {
    const data = await prisma.count.findFirst()
    return NextResponse.json(data)
}