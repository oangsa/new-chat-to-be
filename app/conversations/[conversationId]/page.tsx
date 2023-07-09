'use server'

import getConversationById from "@/libs/actions/getConversationById";
import getMessages from "@/libs/actions/getMessages";

import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import EmptyState from "@/components/EmptyState";

interface IParams {
  conversationId: string;
}

function getCon(conversationId: string) {
  const data = getConversationById(conversationId).then((data) => {return data})

  return data
}
function getMsg(conversationId: string) {
  const data = getMessages(conversationId).then((data) => {return data})

  return data
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getCon(params.conversationId);
  const messages = await  getMsg(params.conversationId)

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return ( 
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
}

export default ChatId;