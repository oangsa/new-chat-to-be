
"use client"

import getConversations from "@/libs/actions/getConversations";
import getUsers from "@/libs/actions/getUsers";
import ConversationList from "./components/ConversationList";
import { useEffect, useState } from "react";

export default function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {

  const [users, setUsers] = useState<any>()
  const [conversations, setConversations] = useState<any>()

  const getData = async() => {
    const user = await fetch("/api/user/getUser")
    const conversation = await fetch("/api/user/getConversation")

    setUsers(user)
    setConversations(conversation)
  }

  useEffect(() => {
    getData()
    console.log(users)
    console.log(conversations)
  }, [getData])

  return (
      <div>
        <ConversationList  users={users}  title="Messages"  initialItems={conversations} />
        {children}
      </div>
  );
}
