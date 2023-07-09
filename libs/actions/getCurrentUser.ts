import prisma from "@/libs/prismadb";
import checkCookie from "../checkCookie";
import getDataByCookie from "../getDataByCookie";

const getCurrentUser = async () => {
  try {
    
    const data = await getDataByCookie();

    if (!data?.username) {
      return null;
    }

    const currentUser = await prisma.student.findUnique({
      where: {
        username: data?.username as string
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
