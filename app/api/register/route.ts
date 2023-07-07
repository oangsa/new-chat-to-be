import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prismadb'

export async function POST(req: NextApiRequest, res: NextApiResponse) {

    const { name, surname, studentId,  yearClass,  Class } = req.body

    const username = name
    const password = surname

    console.log(name, surname, studentId,  yearClass,  Class)

    const auth1 = (name === undefined || surname === undefined || studentId === undefined || yearClass === undefined || Class === undefined)

    const auth2 = (name === "" || surname === "" || studentId === 11111 || yearClass === 0 || Class === 0)

    if ( auth1 || auth2 ) return res.status(401).send({ message: "Please send all of data in request!" })

    try {
        const user = prisma.student.create({
            data: {
                name, 
                surname, 
                studentId,  
                yearClass,  
                Class,
                username,
                password,
                reason: "",
                total: 0,
                oldMonth: 0,

            }
        })
        return res.status(200).send({ message: "Success" })
    } 
    catch (err) {
        return res.status(404).send({ message: "Unexpected Error" })
    }
}