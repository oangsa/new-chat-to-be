import {  Conversation, Message, Student } from "@prisma/client";

export type FullMessageType = Message & {
  sender: Student, 
  seen: Student[]
};

export type FullConversationType = Conversation & { 
  users: Student[]; 
  messages: FullMessageType[]
};