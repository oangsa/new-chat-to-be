'use client';

import { Student } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md';
import clsx from "clsx";
import { find, uniq } from 'lodash';

import useConversation from "@/components/hooks/useConversation";
import { pusherClient } from "@/libs/pusher";
import GroupChatModal from "@/components/modals/GroupChatModal";
import ConversationBox from "./ConversationBox";
import { FullConversationType } from "@/types";
import getDataByCookie from "@/libs/getDataByCookie";
import checkCookie from "@/libs/checkCookie";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: Student[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  initialItems, 
  users
}) => {

  const [items, setItems] = useState(initialItems);
  const [session, setSession] = useState<any>(async () => await getDataByCookie());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const pusherKey = useMemo(() => {
    return session.username
  }, [session.username])

  const { conversationId, isOpen } = useConversation();



  useEffect(() => {

    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          };
        }

        return currentConversation;
      }));
    }

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current]
      });
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      });
    }

    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:remove', removeHandler)

    console.log(items)

  }, [pusherKey, router]);

  return (
    <>
      <GroupChatModal 
        users={users} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
      <aside className={clsx(`
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `, isOpen ? 'hidden' : 'block w-full left-0')}>
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">
              Messages
            </div>
            <div 
              onClick={() => setIsModalOpen(true)} 
              className="
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
   );
}
 
export default ConversationList;