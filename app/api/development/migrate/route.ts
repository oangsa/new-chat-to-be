import connectMongo from "../../../../libs/connectMongo"

export async function GET() {
    var sum = 0
    await connectMongo()
    
    // const all: any = await Usetage.findOne()

    // console.log(all)

    // await prisma.count.create({
    //     data: 
    //     {
    //         curTotal: 170,
    //         curDay:  0,
    //         curMonth: 9,
        
    //         oldDay: 2,
    //         oldMonth: 104,
    //     }
    // })

    // const old: any[] = await prisma.student.findMany({})

    // old.map(async (item: any) => {
    //     sum = sum + parseInt(item.total)
    //     console.log(item.total)
    // })
    // console.log(sum)
    // const old: object[] = await Note.find()

    // old.map(async (item: any) => {
    //     // console.log(item.studentData.total)
    //     // console.log(item.studentData.oldMonth)
    //     if (parseInt(item.studentData.total) < 1) return
    //     if (parseInt(item.studentData.studentId) === 0) return;
        
    //     const ss = await prisma.student.findFirst({
    //         where: {
    //             studentId: parseInt(item.studentData.studentId)
    //         }
    //     })

    //     if (!ss) return console.log(item.studentData.studentId, "Not Found")
        
    //     const data = await prisma.student.update({
    //         where: {
    //             studentId: parseInt(item.studentData.studentId)
    //         },
    //         data: {
    //             total: parseInt(item.studentData.total),
    //             oldMonth: parseInt(item.studentData.oldMonth)
    //         }
    //     })
        
    //     console.log(data)
    // })

    console.log("Done")
}