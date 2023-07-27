import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Todo from "@/models/Todo";

export const GET = async (request) => {
  const url = new URL(request.url);

  const username = url.searchParams.get("username");

  try {
    await connect();

    const todos = await Todo.find();

    return new NextResponse(JSON.stringify(todos), { status: 200 });
  } catch (err) {
    return new NextResponse("Db Error", { status: 500 });
  }
};
