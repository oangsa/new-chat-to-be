import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';
import prisma from '../../libs/prismadb'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    
    const jsonDirectory = path.join(process.cwd(), '');
    const data: string = fs.readFileSync(jsonDirectory + '/Data.json', 'utf8')
    const jsonData = JSON.parse(data)
    const mapData = jsonData.M6

    await mapData.map(async (element: any) => {
        const user = await prisma.student.create({
            data: {
                name: element.Name,
                surname: element.surname,
                studentId: parseInt(element.StudentId),
                yearClass: parseInt(element.Year_class),
                Class: parseInt(element.Class),
                username: element.email,
                password: element.StudentId.toString(),
                reason: "",
                total: 0,
                oldMonth: 0,
                image: "url"
            }
        })

        // console.log(data)
        console.log(await user)
    })

    return new NextResponse("Success")
    
}