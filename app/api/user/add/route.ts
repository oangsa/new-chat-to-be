import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb'

export async function POST(req: NextApiRequest, res: NextApiResponse) {

    const { name, surname, studentId,  yearClass,  Class } = req.body

    console.log(name, surname, studentId,  yearClass,  Class)

    const auth1 = (name === undefined || surname === undefined || studentId === undefined || yearClass === undefined || Class === undefined)

    const auth2 = (name === "" || surname === "" || studentId === 11111 || yearClass === 0 || Class === 0)

    if ( auth1 || auth2 ) return res.status(401).send({ message: "Please send all of data in request!" })

    const user = await prisma.student.create({
        data: {
            name: name,
            surname: surname,
            studentId: parseInt(studentId),
            yearClass: parseInt(yearClass),
            Class: parseInt(Class),
            username: `rs${studentId.toString()}@rajsima.ac.th`,
            password: studentId.toString(),
            reason: "",
            total: 0,
            oldMonth: 0,
            image: "url"
        }
    })

    // console.log(data)
    console.log(await user)

    return new NextResponse("Success")
    
}