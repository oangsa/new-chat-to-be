
import { useMemo, useEffect, useState } from "react";
import { FullConversationType } from "@/types";
import { Student } from "@prisma/client";
import getDataByCookie from "@/libs/getDataByCookie";
import checkCookie from "@/libs/checkCookie";

  function getData() {
    const data = checkCookie().then((cookie: string) => {
      getDataByCookie().then((data) => {
        return data
      })
    })
  return data
}


const useOtherUser = (conversation: FullConversationType | { students: Student[] }) => {
  

  const otherUser = useMemo(async () => {
    const data = await getDataByCookie()

    const otherUser = conversation.students.filter((user:any) => user.username !== data.username);

    return otherUser[0];
  }, [conversation.students]);

  return otherUser;
};

export default useOtherUser;
