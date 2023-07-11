import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../libs/prismadb'
import checkServerCookie from "@/libs/checkServerCookie";
import checkCookie from "@/libs/checkCookie";
import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";

export async function POST(request: NextRequest) {
    const req = await request.json()

    const { name, surname, other, oldMonth } = req
    const cookie: any = cookies().get('user-token')?.value
    
    const token: any = cookie === undefined ? undefined : jwtDecode(cookie, {header: true})
    console.log(cookie)
    const msg = `message=\n<มีผู้เข้าใช้ศูนย์เพื่อนใจ>\nชื่อ: ${name} ${surname}\nเพราะ: ${other}\nเวลา: ${`${new Date().toLocaleString("th-TH", {timeZone: "Asia/Bangkok"}).split(" ")[1].split(":")[0]}:${new Date().toLocaleString("th-TH", {timeZone: "Asia/Bangkok"}).split(" ")[1].split(":")[1]}`} น.`;
    const oldData: any = await prisma.student.findFirst({
        where: {
            surname: surname,
            name: name
        }
    })

    const oldCount: any = await prisma.count.findFirst()

    const updateStudent = await prisma.student.update({
        where: {
            id: oldData.id
        },
        data: {
            reason: other,
            total: parseInt(oldData.total) + 1,
            oldMonth: parseInt(oldData.oldMonth) + 1,
            timestamps: new Date()
        }
    })
    const updateCount = await prisma.count.update({
        where: {
            id: oldCount.id
        },
        data: {
            curDay: oldCount.curDay + 1,
            curMonth: oldCount.curMonth + 1,
            curTotal: oldCount.curTotal + 1,
        }
    })

    const response = await fetch("https://notify-api.line.me/api/notify", {
        mode: "cors",
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.LINE_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: msg,
    });

    return new NextResponse("Success")
}