import { NextResponse } from "next/server"
import prisma from "../../../libs/prismadb"

export async function GET() {
    var data: any = {
        month: [],
        total: []
    }
    for (let i: number = 1; i <= 6; i++) {
        const result: any = await prisma.student.findMany({
            where: {
                yearClass: i
            }
        })
        var month: any = 0
        var total: any = 0
        result.map((item:any) => {
            month = month + item.oldMonth,
            total = total + item.total
        })
        data.month.push(month)
        data.total.push(total)
    }
    // console.log(data)
    return NextResponse.json(data)
}