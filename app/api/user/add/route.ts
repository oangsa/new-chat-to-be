import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb'

export async function POST(req: Request) {

    const res = await req.json()

    const { name, surname, studentId,  yearClass,  Class, url } = res.data

    const user = await prisma.student.create({
        data: {
            name: name,
            surname: surname,
            studentId: parseInt(studentId),
            yearClass: parseInt(yearClass),
            Class: parseInt(Class),
            username: `rs${parseInt(studentId).toString()}@rajsima.ac.th`,
            password: parseInt(studentId).toString(),
            reason: "",
            total: 0,
            oldMonth: 0,
            image: url
        }
    })

    return new NextResponse("Success")
    
}