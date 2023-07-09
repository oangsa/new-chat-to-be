import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (
  conversationId: string
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.username) {
      return null;
    }
  
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        students: true,
      },
    });

    return conversation;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return null;
  }
};

export default getConversationById;
