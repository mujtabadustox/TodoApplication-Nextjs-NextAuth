import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Todo from "@/models/Todo";

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await Todo.findByIdAndDelete(id);

    return new NextResponse("Deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Db Error", { status: 500 });
  }
};
