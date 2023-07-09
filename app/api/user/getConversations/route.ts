import getCurrentUser from "@/libs/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function GET(){
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        students: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          }
        },
      }
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};
