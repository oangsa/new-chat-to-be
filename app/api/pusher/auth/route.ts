import { NextApiRequest, NextApiResponse } from "next"

import { pusherServer } from "@/libs/pusher";
import getDataByCookie from "@/libs/getDataByCookie";
import checkCookie from "@/libs/checkCookie";
import { getCookie } from "cookies-next";

export default async function GET( request: NextApiRequest,  response: NextApiResponse
) {

  const cookie = checkCookie()

  const d = await getDataByCookie()

  if (d.username) {
    return response.status(401);
  }

  const socketId = request.body.socket_id;
  const channel = request.body.channel_name;
  const data = {
    user_id: d.username,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
  return response.send(authResponse);
};
