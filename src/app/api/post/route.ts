import { NextRequest } from "next/server";
import axios from "axios";

import { API_URL } from "@/app/config";

export async function GET(
  request: NextRequest,
  ctx: { params?: unknown }
): Promise<void | Response> {
  try {
    const posts = [
      {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      },
      {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
      },
      {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
      },
    ];

    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (err) {
    return new Response("error", {
      status: 400,
    });
  }
}

export async function OPTIONS(request: NextRequest, ctx: { params?: unknown }) {
  return new Response("", {
    status: 200,
  });
}
