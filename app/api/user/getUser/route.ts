import getDataByCookie from "@/libs/getDataByCookie";
import prisma from "@/libs/prismadb";

export async function GET() {
    const data = await getDataByCookie()

    if (!data?.username) {
        return [];
    }

    try {

        var user;
        var users: any[] = [];

        if (data.username === 'admin') {
            user = await prisma.student.findMany({
            orderBy: {
            timestamps: 'desc'
            },
            where: {
            NOT: {
                username: data.username
            }
            }
        });

        users = user
        } else {
        user = await prisma.student.findFirst({
            where: {
            username: "admin"
            }
        });
        users.push(user)
        }

        

        return users;
    } catch (error: any) {
        return [];
    }
};
