"use server"

import prisma from "@/libs/prismadb";
import getDataByCookie from "../getDataByCookie";
import checkCookie from "../checkCookie";

const getUsers = async () => {
  console.log(checkCookie())
  const data = await getDataByCookie();

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

export default getUsers;
